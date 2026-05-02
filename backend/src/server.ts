import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import "./config/clerk.config"; // Initialize Clerk

import mongoose from "mongoose";
import projectRoutes from "./routes/project.routes";
import siteSettingsRoutes from "./routes/siteSettings.routes";
import uploadRoutes from "./routes/upload.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();

// Security headers
app.use(helmet());

// CORS — restrict to the deployed frontend origin
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin, methods: ["GET", "POST", "PUT", "DELETE"] }));

app.use(express.json());

// Global rate limiter: 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
app.use(globalLimiter);

// Stricter rate limit for upload endpoints: 20 per 15 minutes
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many upload requests, please try again later." },
});

app.use("/api/projects", projectRoutes);
app.use("/api/settings", siteSettingsRoutes);
app.use("/api/uploads", uploadLimiter, uploadRoutes);
app.use("/api/admin", adminRoutes);

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
