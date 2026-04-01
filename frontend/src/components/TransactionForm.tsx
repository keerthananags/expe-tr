import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import { CATEGORIES } from "../types";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "12px 14px",
  color: "#f1f5f9",
  fontSize: "14px",
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s",
};

export const TransactionForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: "expense",
    category: "Food",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.description) return toast.error("Fill all fields");
    setLoading(true);
    try {
      await api.post("/transactions", { ...form, amount: parseFloat(form.amount) });
      toast.success("Transaction added! ✅");
      setForm({
        type: "expense", category: "Food", amount: "", description: "",
        date: new Date().toISOString().split("T")[0],
      });
      setOpen(false);
      onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 20px", borderRadius: "12px",
          background: "linear-gradient(135deg, #6c63ff, #818cf8)",
          color: "white", fontWeight: 600, fontSize: "14px",
          border: "none", cursor: "pointer",
          boxShadow: "0 4px 24px rgba(108,99,255,0.4)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <PlusCircle size={16} /> Add Transaction
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                margin: "auto",
                zIndex: 201,
                width: "min(90vw, 440px)",
                height: "fit-content",
                background: "rgba(14,14,22,0.98)",
                border: "1px solid rgba(108,99,255,0.2)",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(108,99,255,0.05)",
                fontFamily: "'DM Sans', sans-serif",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                <div>
                  <h2 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800, fontSize: "20px", color: "#f1f5f9", marginBottom: "2px",
                  }}>
                    New Transaction
                  </h2>
                  <p style={{ color: "#6b7280", fontSize: "13px" }}>Record income or expense</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#6b7280", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,77,125,0.1)";
                    e.currentTarget.style.color = "#ff4d7d";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "#6b7280";
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Type toggle */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                  {(["income", "expense"] as const).map((t) => (
                    <button
                      key={t} type="button"
                      onClick={() => setForm({ ...form, type: t })}
                      style={{
                        padding: "12px", borderRadius: "12px",
                        border: `1px solid ${form.type === t
                          ? t === "income" ? "rgba(16,217,160,0.3)" : "rgba(255,77,125,0.3)"
                          : "rgba(255,255,255,0.06)"}`,
                        background: form.type === t
                          ? t === "income" ? "rgba(16,217,160,0.1)" : "rgba(255,77,125,0.1)"
                          : "rgba(255,255,255,0.02)",
                        color: form.type === t
                          ? t === "income" ? "#10d9a0" : "#ff4d7d"
                          : "#6b7280",
                        fontSize: "14px", fontWeight: 600,
                        textTransform: "capitalize", cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.2s",
                      }}
                    >
                      {t === "income" ? "↑ Income" : "↓ Expense"}
                    </button>
                  ))}
                </div>

                {/* Category */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94a3b8", marginBottom: "6px", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    style={{ ...inputStyle, padding: "12px 14px" }}
                    onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} style={{ background: "#16161f" }}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Amount */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94a3b8", marginBottom: "6px", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    min="0" step="0.01"
                  />
                </div>

                {/* Description */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94a3b8", marginBottom: "6px", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grocery shopping"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {/* Date */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94a3b8", marginBottom: "6px", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    style={{ ...inputStyle, colorScheme: "dark" }}
                    onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  style={{
                    width: "100%", padding: "14px", borderRadius: "12px",
                    background: loading ? "rgba(108,99,255,0.5)" : "linear-gradient(135deg, #6c63ff, #818cf8)",
                    color: "white", fontWeight: 700, fontSize: "15px",
                    border: "none", cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 24px rgba(108,99,255,0.35)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {loading ? "Adding..." : "Add Transaction →"}
                </motion.button>
              </form>

              <style>{`input::placeholder { color: #374151; }`}</style>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
