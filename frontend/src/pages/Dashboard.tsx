import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  TrendingUp, TrendingDown, Wallet, RefreshCw,
  ArrowUpRight, ArrowDownRight, LayoutDashboard,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { Navbar } from "../components/Navbar";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionList } from "../components/TransactionList";
import { FilterBar } from "../components/FilterBar";
import { DashboardChart } from "../components/DashboardChart";
import { Transaction, Summary } from "../types";
import { useAuth } from "../context/AuthContext";

const DEFAULT_FILTERS = { type: "", category: "", startDate: "", endDate: "" };

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bg: string;
  trend?: string;
  index: number;
}

const StatCard = ({ label, value, icon: Icon, color, bg, trend, index }: StatCardProps) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    style={{
      background: "rgba(16,16,24,0.85)",
      border: `1px solid ${color}20`,
      borderRadius: "20px",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(16px)",
    }}
  >
    {/* Background glow */}
    <div style={{
      position: "absolute", inset: 0, borderRadius: "20px",
      background: `radial-gradient(ellipse at top right, ${color}08, transparent 60%)`,
      pointerEvents: "none",
    }} />

    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
      <div>
        <p style={{
          fontSize: "11px", fontWeight: 600, color: "#6b7280",
          letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px",
        }}>{label}</p>
        {trend && (
          <span style={{
            fontSize: "11px", color,
            display: "flex", alignItems: "center", gap: "2px",
          }}>
            {color === "#10d9a0" ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
            {trend}
          </span>
        )}
      </div>
      <div style={{
        width: "42px", height: "42px", borderRadius: "12px",
        background: bg, display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon size={18} style={{ color }} />
      </div>
    </div>

    <p style={{
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800, fontSize: "28px", color: "#f1f5f9",
      letterSpacing: "-0.02em",
    }}>
      <span style={{ fontSize: "16px", color: "#6b7280", fontWeight: 400 }}>₹</span>
      {value.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
    </p>
  </motion.div>
);

export const Dashboard = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({ income: 0, expense: 0, balance: 0, byCategory: {} });
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"all" | "income" | "expense">("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const [txRes, sumRes] = await Promise.all([
        api.get("/transactions", { params }),
        api.get("/transactions/summary"),
      ]);
      setTransactions(txRes.data);
      setSummary(sumRes.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredByTab = transactions.filter((t) =>
    tab === "all" ? true : t.type === tab
  );

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(108,99,255,0.1), transparent)",
      }} />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(108,99,255,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <Navbar />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "88px 24px 40px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <LayoutDashboard size={18} style={{ color: "#6c63ff" }} />
              <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Dashboard
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#f1f5f9", lineHeight: 1.2,
            }}>
              {greeting()},{" "}
              <span style={{
                background: "linear-gradient(135deg, #6c63ff, #10d9a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {user?.name?.split(" ")[0]}
              </span>{" "}👋
            </h1>
            <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
              Here's your financial overview for today
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={fetchData}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "10px 14px", borderRadius: "12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8", fontSize: "13px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(108,99,255,0.4)";
                e.currentTarget.style.color = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#94a3b8";
              }}
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <TransactionForm onSuccess={fetchData} />
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}>
          <StatCard
            index={0} label="Total Income" value={summary.income}
            icon={TrendingUp} color="#10d9a0" bg="rgba(16,217,160,0.1)"
            trend="All time"
          />
          <StatCard
            index={1} label="Total Expenses" value={summary.expense}
            icon={TrendingDown} color="#ff4d7d" bg="rgba(255,77,125,0.1)"
            trend="All time"
          />
          <StatCard
            index={2} label="Net Balance" value={summary.balance}
            icon={Wallet}
            color={summary.balance >= 0 ? "#6c63ff" : "#ff4d7d"}
            bg={summary.balance >= 0 ? "rgba(108,99,255,0.1)" : "rgba(255,77,125,0.1)"}
          />
        </div>

        {/* Transaction tabs + list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: "28px" }}
        >
          {/* Tab bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "4px" }}>
              {(["all", "income", "expense"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: "8px 18px", borderRadius: "9px", border: "none",
                    background: tab === t ? "rgba(108,99,255,0.2)" : "transparent",
                    color: tab === t ? "#818cf8" : "#6b7280",
                    fontSize: "13px", fontWeight: tab === t ? 600 : 400,
                    cursor: "pointer", textTransform: "capitalize",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.2s",
                    borderWidth: tab === t ? "1px" : "0",
                    borderStyle: "solid",
                    borderColor: tab === t ? "rgba(108,99,255,0.3)" : "transparent",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <p style={{ fontSize: "13px", color: "#4b5563" }}>
              {filteredByTab.length} transaction{filteredByTab.length !== 1 ? "s" : ""}
            </p>
          </div>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", flexDirection: "column", gap: "12px" }}>
              <div style={{
                width: "36px", height: "36px",
                border: "2px solid rgba(108,99,255,0.2)",
                borderTop: "2px solid #6c63ff",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
              <p style={{ color: "#4b5563", fontSize: "13px" }}>Loading transactions...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TransactionList transactions={filteredByTab} onUpdate={fetchData} />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          style={{ marginBottom: "28px" }}
        >
          <DashboardChart summary={summary} />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ marginBottom: "20px" }}
        >
          <FilterBar filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
