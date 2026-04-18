import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import "./config/clerk.config"; // Initialize Clerk

import mongoose from "mongoose";
import projectRoutes from "./routes/project.routes";
import authRoutes from "./routes/auth.routes";
import siteSettingsRoutes from "./routes/siteSettings.routes";
import uploadRoutes from "./routes/upload.routes";
import adminRoutes from "./routes/adminCheck.routes";

console.log("🔧 Environment check:");
console.log("CLERK_SECRET_KEY:", process. env.CLERK_SECRET_KEY ?  "✅ Set" : "❌ Missing");
console.log("ADMIN_EMAIL:", process.env. ADMIN_EMAIL || "❌ Missing");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/settings", siteSettingsRoutes);
app.use("/api/uploads", uploadRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });

// Default route
app.get("/", (req, res) => {
  res.send("Aayush Portfolio Backend Running…");
});
