import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title:  string;
  description: string;
  tags: string[];
  imageUrl:  string;          // Main/featured image (backward compatible)
  images?:  string[];         // NEW: Additional images for gallery
  githubUrl:  string;
  liveDemoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true, maxlength: 5000 },
    tags: { type: [String], default: [] },
    imageUrl:  { type: String, default: "", maxlength: 2048 },        // Main featured image
    images: { type: [String], default: [] },        // NEW: Gallery images
    githubUrl: { type: String, default: "", maxlength: 2048 },
    liveDemoUrl: { type: String, default: "", maxlength: 2048 },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);