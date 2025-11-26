import { Request, Response } from "express";
import Admin from "../models/admin.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;


export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashed });
    await admin.save();

    res.status(201).json({ message: "Admin created" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
