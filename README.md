# 🍽️ Byte-2-Bite — AI-Powered Recipe Generator

[![Build Status](https://img.shields.io/github/actions/workflow/status/kalviumcommunity/Byte-2-Bite_MayurKSetty_S68_GenAI/ci.yml?branch=main)](https://github.com/kalviumcommunity/Byte-2-Bite_MayurKSetty_S68_GenAI/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Pages Status](https://img.shields.io/github/actions/workflow/status/kalviumcommunity/Byte-2-Bite_MayurKSetty_S68_GenAI/pages.yml?branch=gh-pages)](https://your-username.github.io/byte-2-bite/)

**Byte-2-Bite** is a smart, intuitive AI recipe generator designed to help users decide what to cook based on the ingredients they already have and the cuisine they crave. Built using **Gemini Studio**, this project seamlessly combines Prompt Engineering, Retrieval-Augmented Generation (RAG), Structured Outputs, and Function Calling to deliver accurate, creative, and delicious recipe suggestions.

---

## 🚀 Features

* 🧠 **Prompting**: Custom-designed prompts ensure clear understanding of user intent — whether listing ingredients or specifying a cuisine.
* 📚 **RAG (Retrieval-Augmented Generation)**: Integrates dynamic retrieval from a curated recipe database and external culinary sources.
* 📦 **Structured Output**: Consistent JSON schema for each recipe with fields like:

  * `title`
  * `ingredients`
  * `instructions`
  * `prep_time`
  * `cook_time`
  * `cuisine`
  * `difficulty`
* 🔧 **Function Calling**: Modular operations for fetching, filtering, and regenerating recipe options.
* 🌐 **GitHub Pages**: Live demo hosted at [Byte-2-Bite](https://byte-2-bite-mayur-k-setty-s68-gen-a.vercel.app/).

---

## 🧑‍🍳 How It Works

1. **Input Ingredients**: User enters available ingredients.
2. **Select Cuisine** *(optional)*: Choose from various cuisines (e.g., Italian, Indian, Korean).
3. **AI Generation**: Gemini processes inputs with structured prompts and retrieves recipes via RAG.
4. **Structured Display**: Recipes rendered in a clear JSON format on the UI.
5. **Optional Actions**:

   * 🔄 Regenerate new recipes
   * 💾 Save/share favorites
   * ⚖️ Filter by dietary preferences (vegan, gluten-free, etc.)

---

## 🛠️ Technologies Used

* **Gemini Studio** — Core AI orchestration platform
* **Prompt Engineering** — Tailored prompts for high-fidelity responses
* **Retrieval-Augmented Generation** — Integrating external recipe data
* **Function Calling** — Controlled, modular API-like operations
* **Structured Output APIs** — Consistent recipe JSON schema
* **React & Tailwind CSS** — Frontend UI
* **GitHub Actions** — CI/CD for build & Pages deployment

---

## 📁 Example Structured Output

```json
{
  "title": "Creamy Tomato Basil Pasta",
  "ingredients": [
    "Pasta",
    "Tomatoes",
    "Garlic",
    "Basil",
    "Cream",
    "Salt",
    "Olive Oil"
  ],
  "instructions": "Boil pasta. Sauté garlic and tomatoes in olive oil. Add cream and basil. Mix with pasta. Serve hot.",
  "cuisine": "Italian",
  "prep_time": "10 minutes",
  "cook_time": "20 minutes",
  "difficulty": "Easy"
}
```

---

## ⚙️ Project Setup & Deployment

1. **Clone the repo**:

   ```bash
   git clone https://github.com/kalviumcommunity/Byte-2-Bite_MayurKSetty_S68_GenAI.git
   cd byte-2-bite
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```
3. **Configure Gemini Studio**:

   * Set your API credentials in `./config/gemini.json`.
4. **Run locally**:

   ```bash
   npm start
   ```
5. **Deploy to GitHub Pages**:

   ```bash
   npm run build
   npm run deploy
   ```

View live demo at: [Byte-2-Bite](https://byte-2-bite-mayur-k-setty-s68-gen-a.vercel.app/)

---

## 📸 UI Mockups

Home Screen Mockup: 
<img width="1470" height="880" alt="Screenshot 2025-08-08 at 4 05 48 PM" src="https://github.com/user-attachments/assets/c93513a5-d513-4867-9a71-5e3ce3c07bf7" />

Recipe Results Mockup:
<img width="1470" height="879" alt="Screenshot 2025-08-08 at 4 06 13 PM" src="https://github.com/user-attachments/assets/230737df-2293-4799-9e8e-38144d73bd33" />

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

We appreciate ideas for new features (meal planning, calorie tracking, grocery integration).

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📣 Future Improvements

* 🎤 Voice-based input
* 🌎 Multi-language support
* 🔖 User accounts & bookmarks
* 🛒 Integration with grocery APIs
