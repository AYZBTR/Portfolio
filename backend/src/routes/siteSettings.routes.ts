import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { SiteSettings } from "../models/siteSettings.model";

const router = Router();

// GET SETTINGS
router.get("/", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({});
    }

    res.json(settings);
  } catch (err) {
    console.error("Settings GET error:", err);
    res.status(500).json({ message: "Failed to load settings" });
  }
});

// UPDATE SETTINGS (ADMIN)
router.put("/", authMiddleware, async (req, res) => {
  try {
    const data = req.body;

    let settings = await SiteSettings.findOne();
    if (!settings) settings = new SiteSettings();

    settings.hero = { ...settings.hero, ...data.hero };
    settings.about = { ...settings.about, ...data.about };
    settings.contact = { ...settings.contact, ...data.contact };

    await settings.save();
    res.json(settings);
  } catch (err) {
    console.error("Settings UPDATE error:", err);
    res.status(500).json({ message: "Failed to update settings" });
  }
});

export default router;
