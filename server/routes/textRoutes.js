const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const router = express.Router();

// MongoDB Model for storing history
const TTSHistory = mongoose.model("TTSHistory", new mongoose.Schema({
  text: String,
  audioUrl: String,
  createdAt: { type: Date, default: Date.now }
}));

// Ensure public directory exists
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

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing ElevenLabs API Key" });
    }

    // ElevenLabs API Request
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
      {
        text: text,
        voice_settings: { stability: 0.5, similarity_boost: 0.5 },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        responseType: "arraybuffer",
      }
    );

    // Generate a unique filename for the audio file
    const audioFilename = `tts-audio-${Date.now()}.mp3`;
    const audioPath = path.join(audioDirectory, audioFilename);
    fs.writeFileSync(audioPath, response.data);

    // Construct accessible URL
    const audioUrl = `http://localhost:5000/public/${audioFilename}`;

    // Store in MongoDB
    const newHistory = new TTSHistory({ text, audioUrl });
    await newHistory.save();

    res.status(200).json({ audioUrl });
  } catch (error) {
    console.error("❌ TTS Error:", error);
    res.status(500).json({ error: "Failed to convert text to speech" });
  }
});

// Fetch all previous audio files
router.get("/tts-history", async (req, res) => {
  try {
    const history = await TTSHistory.find().sort({ createdAt: -1 }).limit(10); // Get latest 10 records
    res.status(200).json(history);
  } catch (error) {
    console.error("❌ History Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
