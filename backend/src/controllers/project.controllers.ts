import { Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../models/project.model";

// Helper: validate MongoDB ObjectId and reject early if malformed
function isValidId(id: string | string[]): boolean {
  if (Array.isArray(id)) return false;
  return mongoose.isValidObjectId(id);
}

// GET ALL PROJECTS
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("getProjects error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE PROJECT BY ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error: any) {
    console.error("getProjectById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE PROJECT
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, tags, imageUrl, images, githubUrl, liveDemoUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newProject = new Project({
      title,
      description,
      tags: tags || [],
      imageUrl: imageUrl || "",
      images: images || [],
      githubUrl: githubUrl || "",
      liveDemoUrl: liveDemoUrl || "",
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err: any) {
    console.error("createProject error:", err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

// UPDATE PROJECT
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const { title, description, tags, imageUrl, images, githubUrl, liveDemoUrl } = req.body;
    const updated = await Project.findByIdAndUpdate(
      id,
      { title, description, tags, imageUrl, images, githubUrl, liveDemoUrl },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("updateProject error:", error);
    res.status(400).json({ message: "Update failed" });
  }
};

// DELETE PROJECT
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("deleteProject error:", error);
    res.status(400).json({ message: "Delete failed" });
  }
};