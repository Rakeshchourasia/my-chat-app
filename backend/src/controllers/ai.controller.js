const axios = require("axios");

exports.aiReply = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY)
      return res.status(500).json({ error: "Gemini API key missing" });

    // ✅ Correct Gemini model and API endpoint
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const aiText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    res.json({ reply: aiText });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res
      .status(500)
      .json({
        error: "AI service failed",
        details: error.response?.data || error.message,
      });
  }
};
