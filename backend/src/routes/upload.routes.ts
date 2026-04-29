import express from "express";
import multer from "multer";
import { uploadToCloudinary } from "../controllers/upload.controller";
import { uploadResumeToCloudinary } from "../controllers/resumeUpload.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // ✅ 10MB
});

// existing image upload
router.post("/", authMiddleware, upload.single("file"), uploadToCloudinary);

// ✅ resume pdf upload
router.post("/resume", authMiddleware, upload.single("file"), uploadResumeToCloudinary);

export default router;