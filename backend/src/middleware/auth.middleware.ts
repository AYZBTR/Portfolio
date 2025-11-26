import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  console.log("Auth header received:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid auth format" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;

    next();
  } catch (err) {
    console.log("JWT verify error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
}
