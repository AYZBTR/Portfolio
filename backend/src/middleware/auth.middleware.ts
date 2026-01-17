import { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    console.log("🔐 Auth header received:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No valid auth header");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({ message: "Missing token" });
    }

    // Verify the token with Clerk
    const decoded = await clerkClient.verifyToken(token);
    
    if (!decoded || !decoded.sub) {
      console.log("❌ Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("✅ Token verified, user ID:", decoded.sub);

    // Get user details from Clerk
    const user = await clerkClient.users.getUser(decoded.sub);
    const userEmail = user.emailAddresses[0]?.emailAddress;
    const adminEmail = process.env.ADMIN_EMAIL;

    console.log(`👤 User email: ${userEmail}`);
    console.log(`🔑 Admin email: ${adminEmail}`);

    if (userEmail !== adminEmail) {
      console.log(`❌ Access denied for:  ${userEmail}`);
      return res.status(403).json({ 
        message: "Forbidden:  Admin access only",
        userEmail,
        adminEmail 
      });
    }

    console.log(`✅ Admin verified:  ${userEmail}`);
    
    // Attach user to request
    (req as any).user = user;
    (req as any).auth = decoded;
    
    next();
  } catch (error:  any) {
    console.error("❌ Auth middleware error:", error. message);
    return res.status(401).json({ 
      message: "Authentication failed",
      error: error. message 
    });
  }
}