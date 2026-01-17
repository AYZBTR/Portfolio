import { Clerk } from "@clerk/clerk-sdk-node";

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("Missing CLERK_SECRET_KEY environment variable");
}

export const clerk = Clerk({ 
  secretKey: process.env.CLERK_SECRET_KEY 
});

console.log("✅ Clerk initialized");