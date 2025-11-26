import express from "express";
import multer from "multer";
import { uploadToCloudinary } from "../controllers/upload.controller";
import authMiddleware from "../middleware/auth.middleware"; // adjust path if needed

const router = express.Router();

// memory storage so multer exposes req.file.buffer (no temporary files)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit (adjust as needed)
});

router.post("/", authMiddleware, upload.single("file"), uploadToCloudinary);

export default router;