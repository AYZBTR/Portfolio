import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * Admin access check
 * If authMiddleware passes, user is admin.
 * Otherwise it returns 401/403.
 */
router.get("/check", authMiddleware, async (req, res) => {
  return res.status(200).json({ ok: true });
});

export default router;