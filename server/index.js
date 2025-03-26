const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const ttsRoutes = require("./routes/textRoutes");
require("dotenv").config();



const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve static files from "public" directory
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api", ttsRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
