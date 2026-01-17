import { Router } from "express";
import {
  getProjects,
  getProjectById,    // ← ADD THIS IMPORT
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

// PUBLIC ROUTES
router.get("/", getProjects);
router.get("/:id", getProjectById);  

// PROTECTED ROUTES
router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;