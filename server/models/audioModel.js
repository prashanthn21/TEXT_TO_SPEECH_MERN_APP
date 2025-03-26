const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    audioUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audio", audioSchema);
