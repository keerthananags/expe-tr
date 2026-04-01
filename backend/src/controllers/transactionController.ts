import { Request, Response } from "express";
import Transaction from "../models/Transaction";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    const userId = (req as any).user._id;
    const filter: any = { userId };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate as string);
      if (endDate) filter.date.$lte = new Date(endDate as string);
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { type, category, amount, description, date } = req.body;

    if (!type || !category || !amount || !description)
      return res.status(400).json({ message: "All fields required" });

    const tx = await Transaction.create({ userId, type, category, amount, description, date });
    res.status(201).json(tx);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const tx = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: (req as any).user._id },
      req.body,
      { new: true }
    );
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    res.json(tx);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const tx = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: (req as any).user._id,
    });
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getSummary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const transactions = await Transaction.find({ userId });

    const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
    const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);

    const byCategory = transactions.reduce((acc: any, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += t.amount;
      return acc;
    }, {});

    res.json({ income, expense, balance: income - expense, byCategory });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};