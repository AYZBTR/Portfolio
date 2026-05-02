import { Request, Response } from "express";
import Project from "../models/project.model";

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
    console.error("getProjectById error:", error);
    res.status(500).json({ message: "Server error" });
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
    console.error("createProject error:", err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

// UPDATE PROJECT
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { title, description, tags, imageUrl, images, githubUrl, liveDemoUrl } = req.body;
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
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
export const deleteProject = async (req:  Request, res: Response) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("deleteProject error:", error);
    res.status(400).json({ message: "Delete failed" });
  }
};