import { Request, Response } from "express";
import Project from "../models/project.model";

// GET ALL PROJECTS
export const getProjects = async (req: Request, res:  Response) => {
  try {
    const projects = await Project. find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET SINGLE PROJECT BY ID
export const getProjectById = async (req:  Request, res: Response) => {
  try {
    const { id } = req.params;
    
    console.log("🔍 Fetching project with ID:", id);
    
    const project = await Project.findById(id);
    
    if (!project) {
      console.log("❌ Project not found");
      return res.status(404).json({ message: "Project not found" });
    }
    
    console.log("✅ Project found:", project);
    res.json(project);
  } catch (error: any) {
    console.error("❌ Error fetching project:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// CREATE PROJECT
export const createProject = async (req: Request, res: Response) => {
  try {
    console.log("📝 Creating project with data:", req.body);
    
    const { title, description, tags, imageUrl, githubUrl, liveDemoUrl } = req.body;

    // Validation
    if (!title || !description) {
      console.log("❌ Validation failed:  Missing title or description");
      return res.status(400).json({ 
        message: "Title and description are required",
        received:  { title, description }
      });
    }

    const newProject = new Project({
      title,
      description,
      tags:  tags || [],
      imageUrl:  imageUrl || "",
      githubUrl: githubUrl || "",
      liveDemoUrl: liveDemoUrl || "",
    });

    console.log("💾 Saving project:", newProject);
    await newProject.save();
    console.log("✅ Project saved successfully");
    
    res.status(201).json(newProject);
  } catch (err: any) {
    console.error("❌ Create project error:", err);
    res.status(500).json({ 
      message: "Failed to create project",
      error: err.message,
      details: err 
    });
  }
};

// UPDATE PROJECT
export const updateProject = async (req: Request, res: Response) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
};

// DELETE PROJECT
export const deleteProject = async (req:  Request, res: Response) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed", error });
  }
};