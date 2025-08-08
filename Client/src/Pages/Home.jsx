import React, { useState } from "react";
import {
  FaUtensils,
  FaRobot,
  FaPaperPlane,
  FaClock,
  FaUserFriends,
  FaLightbulb,
} from "react-icons/fa";
import logo from "../assets/Byte-2-Bite.png";
import axios from "axios";

const palette = {
  bg: "bg-gradient-to-br from-[#fffbe9] via-[#ffe5b4] to-[#ffd6e0]",
  header: "text-[#ff7043]",
  promptBg: "bg-white/80",
  promptBorder: "border-[#ff7043]",
  button: "bg-[#ff7043] hover:bg-[#ff5722]",
  responseBg: "bg-[#fff3e0]",
  responseText: "text-[#4e342e]",
  icon: "text-[#ff7043]",
  sectionTitle:
    "text-[#ff7043] font-semibold text-lg mb-2 flex items-center gap-2",
  card: "bg-white/90 rounded-2xl shadow-lg p-6 mb-6",
  chip: "inline-block bg-[#ffe0b2] text-[#ff7043] px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2",
  divider: "border-t border-[#ffd6e0] my-4",
};

const initialRecipe = null;

function Home() {
  const [prompt, setPrompt] = useState("");
  const [recipe, setRecipe] = useState(initialRecipe);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    setRecipe(null);
    setError("");
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("https://byte-2-bite-mayurksetty-s68-genai.onrender.com/api/ask", { prompt });
      const data = res.data;
      console.log("Response from server:", data);
      // The reply is a JSON string, so we need to parse it
      let parsed;
      try {
        parsed =
          typeof data.reply === "string" ? JSON.parse(data.reply) : data.reply;
        console.log("Parsed recipe:", parsed);
      } catch {
        setError("Sorry, the server returned an unexpected response.");
        setLoading(false);
        return;
      }
      setRecipe(parsed);
      setLoading(false);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Placeholder for image generation (replace with real image logic if available)
  const getImageUrl = (imagePrompt) =>
    `https://source.unsplash.com/800x400/?${encodeURIComponent(imagePrompt || "food,recipe")}`;

  return (
    <div className={`min-h-screen flex flex-col ${palette.bg}`}>
      {/* Spacer for Navbar */}
      <div className="h-48" />
      {/* Header */}
      <header className="flex flex-col items-center py-8">
        <h1
          className={`text-4xl font-extrabold ${palette.header} drop-shadow flex items-center gap-2`}
        >
          <FaUtensils className={palette.icon} /> Byte-2-Bite AI Chef
        </h1>
        <p className="text-lg text-[#6d4c41] font-medium text-center max-w-xl mt-2">
          Ask anything about recipes, ingredients, or cooking tips. Let our AI
          chef inspire your next meal!
        </p>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {/* Recipe Card */}
          {recipe && (
            <div className={palette.card}>
              {/* Recipe Image */}
              <div className="w-full flex justify-center mb-4">
                <img
                  src={getImageUrl(recipe.imagePrompt)}
                  alt={recipe.recipeName}
                  className="rounded-xl shadow-md object-cover w-full max-h-64"
                  style={{ aspectRatio: "16/9", background: "#ffe5b4" }}
                />
              </div>
              {/* Recipe Name & Description */}
              <h2 className="text-3xl font-bold text-[#ff7043] mb-2 flex items-center gap-2">
                <FaUtensils className="text-2xl" /> {recipe.recipeName}
              </h2>
              <p className="text-[#6d4c41] mb-4">{recipe.description}</p>
              {/* Chips for Cooking Time & Servings */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={palette.chip}>
                  <FaClock className="inline mr-1" /> {recipe.cookingTime}
                </span>
                <span className={palette.chip}>
                  <FaUserFriends className="inline mr-1" /> {recipe.servings}{" "}
                  servings
                </span>
              </div>
              <div className={palette.divider}></div>
              {/* Ingredients */}
              <div className="mb-4">
                <div className={palette.sectionTitle}>
                  <FaUtensils /> Ingredients
                </div>
                <ul className="list-disc list-inside ml-2 text-[#4e342e]">
                  {recipe.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* Instructions */}
              <div className="mb-4">
                <div className={palette.sectionTitle}>
                  <FaRobot /> Instructions
                </div>
                <ol className="list-decimal list-inside ml-2 text-[#4e342e] space-y-1">
                  {recipe.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
              {/* Tips */}
              {recipe.tips && recipe.tips.length > 0 && (
                <div className="mb-2">
                  <div className={palette.sectionTitle}>
                    <FaLightbulb /> Tips
                  </div>
                  <ul className="list-disc list-inside ml-2 text-[#6d4c41]">
                    {recipe.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-xl p-4 bg-red-100 text-red-700 shadow flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Prompt Box */}
          <form
            onSubmit={handlePromptSubmit}
            className={`flex items-center gap-3 rounded-xl shadow-lg px-4 py-3 ${palette.promptBg} border ${palette.promptBorder}`}
          >
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-lg text-[#4e342e] placeholder-[#bdbdbd]"
              placeholder="Type your culinary question or recipe idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className={`p-3 rounded-full ${palette.button} text-white transition flex items-center`}
              disabled={loading}
              aria-label="Send"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#fff"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="#fff"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                <FaPaperPlane className="text-xl" />
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 mb-4 text-center">
        <p className="text-sm text-[#a1887f]">
          © {new Date().getFullYear()} Byte-2-Bite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
