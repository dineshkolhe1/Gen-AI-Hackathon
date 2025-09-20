// Placeholder GCP client functions
// Replace with actual Vertex AI / Vision / Translation API code when ready

async function callVisionAPI(localImagePath) {
  return {
    url: "/uploads/sample-enhanced.jpg",
    analysis: { detectedObjects: ["saree", "fabric"] },
  };
}

async function callVertexAI(prompt) {
  return {
    title: "Handwoven Saree – Cultural Heritage",
    description:
      "A handwoven saree crafted with precision and love, rooted in traditional artistry and perfect for festive occasions.",
    story: "Made by artisans preserving their heritage for generations.",
    price: "₹8,000 – ₹12,000",
    socialPost: {
      caption: "Support local artisans. Wear heritage with pride.",
      hashtags: ["#LocalArtisans", "#Handwoven", "#CulturalHeritage"],
    },
  };
}

async function callTranslateAPI(text, lang = "hi") {
  return "यह पारंपरिक हस्तनिर्मित साड़ी है।";
}

module.exports = { callVisionAPI, callVertexAI, callTranslateAPI };
