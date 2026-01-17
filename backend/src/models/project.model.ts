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
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    imageUrl:  { type: String, default: "" },        // Main featured image
    images: { type: [String], default: [] },        // NEW: Gallery images
    githubUrl: { type: String, default: "" },
    liveDemoUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);