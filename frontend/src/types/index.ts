export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Transaction {
  _id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
}

export interface Summary {
  income: number;
  expense: number;
  balance: number;
  byCategory: Record<string, number>;
}

export type Category =
  | "Food" | "Transport" | "Shopping" | "Health"
  | "Entertainment" | "Salary" | "Freelance" | "Investment" | "Other";

export const CATEGORIES: Category[] = [
  "Food", "Transport", "Shopping", "Health",
  "Entertainment", "Salary", "Freelance", "Investment", "Other",
];