// Import placeholder GCP client functions
const { callVertexAI, callVisionAPI, callTranslateAPI } = require("../utils/gcpClients");

async function handleGenerate(req, res) {
  try {
    const photo = req.file;
    const text = req.body.text || "";

    // If GCP not configured → use MOCK outputs
    if (!process.env.GOOGLE_PROJECT_ID) {
      const mockOutput = {
        title: "Handwoven Kanchipuram Silk Saree – Temple Motif",
        description:
          "This authentic Kanchipuram silk saree is handwoven by artisans in Tamil Nadu. Each piece takes 15 days to weave, featuring intricate temple-inspired designs. Perfect for weddings and festivals.",
        story:
          "Our family has been weaving silk sarees for three generations. Each thread carries a blessing for those who wear it.",
        priceSuggestion: "₹12,000 – ₹18,000",
        imageVariants: [
          { type: "original", url: `/uploads/${photo?.filename}` },
          { type: "enhanced", url: "/uploads/sample-enhanced.jpg" },
        ],
        socialPost: {
          caption:
            "✨ Heritage you can wear ✨ Handwoven Kanchipuram silk, crafted with love. #Handmade #Kanchipuram #VocalForLocal",
          hashtags: ["#Handmade", "#Kanchipuram", "#SupportLocal"],
        },
      };
      return res.json({ ok: true, mode: "mock", output: mockOutput });
    }

    // --- Real GCP mode (replace mocks with real APIs) ---
    const vision = await callVisionAPI(photo.path);
    const vertex = await callVertexAI(
      `Generate product listing + story for: ${text}`
    );
    const translation = await callTranslateAPI(vertex.description, "hi");

    const result = {
      title: vertex.title,
      description: vertex.description,
      description_hi: translation,
      story: vertex.story,
      priceSuggestion: vertex.price,
      imageVariants: [{ type: "enhanced", url: vision.url }],
      socialPost: vertex.socialPost,
    };

    res.json({ ok: true, mode: "live", output: result });
  } catch (err) {
    console.error("❌ Error generating:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
}

module.exports = { handleGenerate };
