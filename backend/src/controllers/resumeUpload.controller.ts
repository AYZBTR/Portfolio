import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
const streamifier = require("streamifier");

type MulterRequest = Request & { file?: Express.Multer.File };

export const uploadResumeToCloudinary = async (req: MulterRequest, res: Response) => {
  try {
    const file = req.file;

    if (!file?.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio_resume",
          resource_type: "raw",
          public_id: "resume",
          overwrite: true,
        },
        (error: any, uploadResult: any) => {
          if (error) return reject(error);
          resolve(uploadResult);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Resume upload error:", err);
    return res.status(500).json({ message: "Resume upload failed" });
  }
};