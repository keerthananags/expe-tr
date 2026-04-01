import React, { useState } from "react";
import { Pencil, Trash2, Check, X, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Transaction, CATEGORIES } from "../types";
import api from "../api/axios";

const CATEGORY_ICONS: Record<string, string> = {
  Food: "🍽️", Transport: "🚗", Shopping: "🛍️", Health: "💊",
  Entertainment: "🎬", Salary: "💼", Freelance: "💻", Investment: "📈", Other: "📦",
};

export const TransactionList = ({
  transactions,
  onUpdate,
}: {
  transactions: Transaction[];
  onUpdate: () => void;
}) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Transaction>>({});

  const startEdit = (tx: Transaction) => {
    setEditId(tx._id);
    setEditForm(tx);
  };

  const saveEdit = async () => {
    try {
      await api.put(`/transactions/${editId}`, editForm);
      toast.success("Updated!");
      setEditId(null);
      onUpdate();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      toast.success("Deleted!");
      onUpdate();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!transactions.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: "rgba(16,16,24,0.6)",
          border: "1px dashed rgba(108,99,255,0.15)",
          borderRadius: "20px",
          padding: "60px 24px",
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "18px", fontWeight: 700,
          color: "#f1f5f9", marginBottom: "6px",
        }}>
          No transactions yet
        </p>
        <p style={{ color: "#4b5563", fontSize: "14px" }}>
          Add your first transaction using the button above
        </p>
      </motion.div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <AnimatePresence>
        {transactions.map((tx, i) => (
          <motion.div
            key={tx._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            style={{
              background: "rgba(16,16,24,0.85)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              transition: "border-color 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(108,99,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
          >
            {/* Category icon */}
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px",
              background: tx.type === "income"
                ? "rgba(16,217,160,0.08)"
                : "rgba(255,77,125,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", flexShrink: 0,
            }}>
              {CATEGORY_ICONS[tx.category] || "📦"}
            </div>

            {/* Edit mode */}
            {editId === tx._id ? (
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <input
                  value={editForm.description || ""}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  style={{
                    gridColumn: "1 / -1",
                    background: "rgba(108,99,255,0.08)",
                    border: "1px solid rgba(108,99,255,0.3)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    color: "#f1f5f9",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  placeholder="Description"
                />
                <input
                  type="number"
                  value={editForm.amount || ""}
                  onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    color: "#f1f5f9",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  placeholder="Amount"
                />
                <select
                  value={editForm.category || ""}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    color: "#f1f5f9",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: "#16161f" }}>{c}</option>)}
                </select>
              </div>
            ) : (
              /* Normal view */
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: "14px", fontWeight: 500,
                  color: "#f1f5f9",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  marginBottom: "3px",
                }}>
                  {tx.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    fontSize: "11px", color: "#6b7280",
                    background: "rgba(255,255,255,0.04)",
                    padding: "2px 8px", borderRadius: "6px",
                  }}>
                    {tx.category}
                  </span>
                  <span style={{ fontSize: "11px", color: "#4b5563" }}>
                    {new Date(tx.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
            )}

            {/* Amount & actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
              {editId !== tx._id && (
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700, fontSize: "16px",
                    color: tx.type === "income" ? "#10d9a0" : "#ff4d7d",
                    display: "flex", alignItems: "center", gap: "4px",
                  }}>
                    {tx.type === "income"
                      ? <TrendingUp size={13} />
                      : <TrendingDown size={13} />
                    }
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                  </span>
                  <span style={{ fontSize: "11px", color: "#4b5563" }}>
                    {tx.type}
                  </span>
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "6px" }}>
                {editId === tx._id ? (
                  <>
                    <button
                      onClick={saveEdit}
                      style={{
                        width: "32px", height: "32px", borderRadius: "8px",
                        background: "rgba(16,217,160,0.1)",
                        border: "1px solid rgba(16,217,160,0.2)",
                        color: "#10d9a0", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      style={{
                        width: "32px", height: "32px", borderRadius: "8px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#6b7280", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(tx)}
                      style={{
                        width: "32px", height: "32px", borderRadius: "8px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "#6b7280", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(108,99,255,0.1)";
                        e.currentTarget.style.color = "#818cf8";
                        e.currentTarget.style.borderColor = "rgba(108,99,255,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.color = "#6b7280";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      }}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => deleteTransaction(tx._id)}
                      style={{
                        width: "32px", height: "32px", borderRadius: "8px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "#6b7280", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,77,125,0.1)";
                        e.currentTarget.style.color = "#ff4d7d";
                        e.currentTarget.style.borderColor = "rgba(255,77,125,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.color = "#6b7280";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
