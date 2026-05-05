import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import logger from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";

const signToken = (id: string) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });
    const token = signToken(user._id.toString());

    logger.info({
      msg: "User registered successfully",
      userId: user._id,
      email: user.email,
      ip: req.ip
    });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err: any) {
    logger.error({
      msg: "Registration error",
      error: err.message,
      stack: err.stack
    });
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || !(await (user as any).comparePassword(password))) {
      logger.warn({
        msg: "Failed login attempt",
        email,
        ip: req.ip
      });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user._id.toString());

    logger.info({
      msg: "User logged in successfully",
      userId: user._id,
      email: user.email,
      ip: req.ip
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err: any) {
    logger.error({
      msg: "Login error",
      error: err.message,
      stack: err.stack
    });
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  res.json({ user: (req as any).user });
};