import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
const streamifier = require("streamifier"); // require() is TS-friendly for untyped libs

// Extend Request with optional multer file
type MulterRequest = Request & {
  file?: Express.Multer.File;
};

export const uploadToCloudinary = async (req: MulterRequest, res: Response) => {
  try {
    // Copy to local const and guard — TS will narrow the type after this check
    const file = req.file;
    if (!file || !file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Now use `file.buffer` safely inside the Promise
    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portfolio_hero" },
        (error: any, uploadResult: any) => {
          if (error) return reject(error);
          resolve(uploadResult);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    return res.status(200).json({ url: result.secure_url, raw: result });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Upload failed", error: err });
  }
};