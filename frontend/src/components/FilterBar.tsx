// ============================================================
// FilterBar.tsx
// ============================================================
import React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES } from "../types";

interface Props {
  filters: { type: string; category: string; startDate: string; endDate: string };
  onChange: (filters: any) => void;
  onReset: () => void;
}

const selectStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  padding: "9px 14px",
  color: "#94a3b8",
  fontSize: "13px",
  outline: "none",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
};

export const FilterBar = ({ filters, onChange, onReset }: Props) => {
  const hasActive = Object.values(filters).some(Boolean);

  return (
    <div style={{
      background: "rgba(16,16,24,0.85)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "16px",
      padding: "16px 20px",
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      alignItems: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6c63ff", marginRight: "4px" }}>
        <SlidersHorizontal size={15} />
        <span style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Filters
        </span>
      </div>

      <select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        style={selectStyle}
      >
        <option value="" style={{ background: "#16161f" }}>All Types</option>
        <option value="income" style={{ background: "#16161f" }}>Income</option>
        <option value="expense" style={{ background: "#16161f" }}>Expense</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        style={selectStyle}
      >
        <option value="" style={{ background: "#16161f" }}>All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c} style={{ background: "#16161f" }}>{c}</option>
        ))}
      </select>

      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
        style={{ ...selectStyle, colorScheme: "dark" }}
      />

      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
        style={{ ...selectStyle, colorScheme: "dark" }}
      />

      {hasActive && (
        <button
          onClick={onReset}
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: "rgba(255,77,125,0.08)",
            border: "1px solid rgba(255,77,125,0.15)",
            borderRadius: "10px", padding: "9px 14px",
            color: "#ff4d7d", fontSize: "13px", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,77,125,0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,77,125,0.08)")}
        >
          <X size={13} /> Clear
        </button>
      )}
    </div>
  );
};


// ============================================================
// TransactionForm.tsx  (paste into separate file)
// ============================================================
// import React, { useState } from "react";
// import { PlusCircle, X, DollarSign } from "lucide-react";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../api/axios";
// import { CATEGORIES } from "../types";
// 
// export const TransactionForm = ({ onSuccess }: { onSuccess: () => void }) => { ... }
