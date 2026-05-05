import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });

  try {
    const decoded: any = jwt.verify(auth.split(" ")[1], JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    (req as any).user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};