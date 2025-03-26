const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const TextAudio = require("../models/TextModel"); // Import model
require("dotenv").config();

const router = express.Router();



// Ensure the public directory exists for storing audio files
const audioDirectory = path.join(__dirname, "../public");
if (!fs.existsSync(audioDirectory)) {
  fs.mkdirSync(audioDirectory, { recursive: true });
}

// Convert text to speech using ElevenLabs API
router.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required for conversion" });
    }

    console.log("🔹 Received text for TTS:", text);

    // ElevenLabs API Key (from .env)
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing ElevenLabs API Key" });
    }
    console.log("🟢 API Key Loaded:", process.env.ELEVENLABS_API_KEY ? "Yes" : "No");

    // ElevenLabs API Request
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",  // Adam (Male, English)
      {
        text: text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey
        },
        responseType: "arraybuffer" // Receive audio as binary data
      }
    );

    console.log("✅ ElevenLabs TTS responded successfully!");

    // Generate a unique filename for the audio file
    const audioFilename = `tts-audio-${Date.now()}.mp3`;
    const audioPath = path.join(audioDirectory, audioFilename);

    // Save audio file
    fs.writeFileSync(audioPath, response.data);

    // Construct the accessible URL for the audio file
    const audioUrl = `http://localhost:5000/public/${audioFilename}`;

    console.log("🎵 Audio saved at:", audioUrl);

    // Save to MongoDB
    const newTextAudio = new TextAudio({ text, audioUrl });
    await newTextAudio.save();
    console.log("✅ Data saved to MongoDB");

    res.status(200).json({ audioUrl });
  } catch (error) {
    console.error("❌ TTS Error:", error.message);
    res.status(500).json({ error: "Failed to convert text to speech" });
  }
});


// ✅ Fetch all saved audio data
router.get("/tts-history", async (req, res) => {
  try {
    const history = await TextAudio.find().sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});
module.exports = router;
