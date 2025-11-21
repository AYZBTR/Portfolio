import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  live?: string;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: true },
    github: { type: String },
    live: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
