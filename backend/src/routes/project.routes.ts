import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// PUBLIC ROUTE
router.get("/", getProjects);

// PROTECTED ROUTES
router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
