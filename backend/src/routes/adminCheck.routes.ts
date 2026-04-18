import { Router, Request, Response } from "express";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

// GET /api/admin/check — returns { ok: true } for authorized admin, 403 otherwise (via authMiddleware)
router.get("/check", authMiddleware, (_req: Request, res: Response) => {
  res.json({ ok: true });
});

export default router;
