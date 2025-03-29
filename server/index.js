const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const ttsRoutes = require("./routes/textRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve static files correctly for Vercel
app.use("/public", express.static(path.resolve(__dirname, "public")));
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

// ✅ Ensure correct API routes
app.use("/api", ttsRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Root route check
app.get("/", (req, res) => {
  res.send("✅ Backend is running on Vercel!");
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Ensure Vercel handles dynamic routing
module.exports = app;
