const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
});

const TextModel = mongoose.model("Text", TextSchema);

module.exports = TextModel;
