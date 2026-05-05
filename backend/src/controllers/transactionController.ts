import { Request, Response } from "express";
import Transaction from "../models/Transaction";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    const userId = (req as any).user._id;
    const filter: any = { userId };

    if (type) filter.type = String(type);
    if (category) filter.category = String(category);

    if (startDate || endDate) {
      const dateFilter: any = {};
      if (startDate) {
        const parsedStart = new Date(String(startDate));
        if (Number.isNaN(parsedStart.getTime()))
          return res.status(400).
        
        
        json({ message: "Invalid startDate" });
        dateFilter.$gte = parsedStart;
      }
      if (endDate) {
        const parsedEnd = new Date(String(endDate));
        if (Number.isNaN(parsedEnd.getTime()))
          return res.status(400).json({ message: "Invalid endDate" });
        dateFilter.$lte = parsedEnd;
      }
      filter.date = dateFilter;
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

    if (!type || !category || amount == null || !description)
      return res.status(400).json({ message: "All fields required" });

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount < 0)
      return res.status(400).json({ message: "Amount must be a non-negative number" });

    const parsedDate = date ? new Date(date) : new Date();
    if (date && Number.isNaN(parsedDate.getTime()))
      return res.status(400).json({ message: "Invalid date format" });

    const tx = await Transaction.create({
      userId,
      type,
      category,
      amount: parsedAmount,
      description,
      date: parsedDate,
    });
    res.status(201).json(tx);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const updates: any = { ...req.body };

    if (updates.amount != null) {
      const parsedAmount = Number(updates.amount);
      if (Number.isNaN(parsedAmount) || parsedAmount < 0)
        return res.status(400).json({ message: "Amount must be a non-negative number" });
      updates.amount = parsedAmount;
    }

    if (updates.date) {
      const parsedDate = new Date(updates.date);
      if (Number.isNaN(parsedDate.getTime()))
        return res.status(400).json({ message: "Invalid date format" });
      updates.date = parsedDate;
    }

    const tx = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: (req as any).user._id },
      updates,
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