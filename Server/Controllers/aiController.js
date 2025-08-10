const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

dotenv.config();

// Load system prompt from file
const SYSTEM_PROMPT = fs.readFileSync(
    path.join(__dirname, './SystemPrompt.txt'),
    'utf-8'
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const handleRecipePrompt = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        // Initialize Gemini model
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-pro',
            generationConfig: {
                responseMimeType: 'application/json', // Force JSON output
                temperature: 0.7, // Creativity level kept to a reasonable level
                topP: 0.9, // Use nucleus sampling for diversity
                topK: 40, // Limit to top 40 tokens for efficiency
                maxOutputTokens: 1024 // Ensure enough space for recipes
            }
        });

        // Combine system prompt + user request into one-shot message
        const finalPrompt = `${SYSTEM_PROMPT}\n\nUser Request: ${prompt}`;

        // Send request
        const result = await model.generateContent(finalPrompt);

        // Get AI response text
        let reply = result.response.text();

        // Attempt to parse JSON safely
        try {
            reply = JSON.parse(reply);
        } catch (parseErr) {
            console.warn('AI returned invalid JSON, sending raw text instead.');
        }

        res.json({ reply });

    } catch (err) {
        console.error('Gemini API Error:', err);
        res.status(500).json({ error: 'Failed to generate recipe. Please try again.' });
    }
};

module.exports = { handleRecipePrompt };
