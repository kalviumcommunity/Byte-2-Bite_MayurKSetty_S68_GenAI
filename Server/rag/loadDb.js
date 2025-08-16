const { DataAPIClient } = require("@datastax/astra-db-ts");
const { PuppeteerWebBaseLoader } = require("@langchain/community/document_loaders/web/puppeteer");
const { GoogleGenAI } = require("@google/genai");
// import OpenAI from "openai";

const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

require("dotenv").config();

const {
  ASTRA_DB_KEYSPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  // OPENAI_API_KEY,
  GEMINI_API_KEY
} = process.env;

// const openAi = new OpenAI({ apiKey: OPENAI_API_KEY });
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const foodData = [
  "https://en.wikipedia.org/wiki/Cuisine",
  "https://en.wikipedia.org/wiki/Recipe",
  "https://en.wikipedia.org/wiki/List_of_cuisines",
  "https://en.wikipedia.org/wiki/List_of_desserts",
  "https://en.wikipedia.org/wiki/List_of_soups",
  "https://en.wikipedia.org/wiki/List_of_salads",
  "https://en.wikipedia.org/wiki/List_of_sandwiches",
  "https://en.wikipedia.org/wiki/List_of_pasta_dishes",
  "https://en.wikipedia.org/wiki/List_of_rice_dishes",
  "https://en.wikipedia.org/wiki/List_of_breads",
  "https://en.wikipedia.org/wiki/List_of_cheeses",
  "https://en.wikipedia.org/wiki/List_of_appetizers",
  "https://en.wikipedia.org/wiki/List_of_breakfast_foods",
  "https://en.wikipedia.org/wiki/List_of_beverages",
  "https://en.wikipedia.org/wiki/List_of_fast_food_restaurants"
];

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { keyspace: ASTRA_DB_KEYSPACE });

console.log(`* Connected to DB ${db.id}`);

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

const createCollection = async (similarityMetrics = "dot_product") => {
  const collection = await db.createCollection(ASTRA_DB_COLLECTION, {
    vector: {
      dimension: 768, // Gemini embedding dimension
      metric: similarityMetrics,
    },
  });
  console.log(`* Collection ${collection.id} created`);
  console.log(`Collection Data :- ${JSON.stringify(collection)}`);
};

const loadSampleData = async () => {
  const collection = await db.collection(ASTRA_DB_COLLECTION);

  for await (const url of foodData) {
    const content = await scrapePage(url);
    const chunks = await splitter.splitText(content);

    for await (const chunk of chunks) {
      // ----- OpenAI (Commented Out) -----
      // const embedding = await openAi.embeddings.create({
      //   model: "text-embedding-3-small",
      //   input: chunk,
      //   encoding_format: "float",
      // });
      // const vector = embedding.data[0].embedding;

      // ----- Gemini (using @google/genai) -----
      const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: [{ role: "user", parts: [{ text: chunk }] }],
      });

      const vector = response.embeddings.values;

      await collection.insertOne({
        $vector: vector,
        text: chunk,
      });

      console.log(`Inserted chunk from ${url}`);
    }
  }
};

const scrapePage = async (url) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: { headless: true },
    gotoOptions: { waitUntil: "domcontentloaded" },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return result;
    },
  });

  return (await loader.scrape())?.replace(/<[^>]*>?/gm, "");
};

createCollection().then(() => loadSampleData());