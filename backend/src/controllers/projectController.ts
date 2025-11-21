import { Request, Response } from "express";
import Project from "../models/Project";

// 📌 Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Create new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, tags, image, github, live } = req.body;

    const newProject = new Project({
      title,
      description,
      tags,
      image,
      github,
      live,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Update existing project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
