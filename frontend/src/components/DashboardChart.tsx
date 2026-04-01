import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Summary } from "../types";

const COLORS = ["#6c63ff", "#10d9a0", "#ff4d7d", "#f59e0b", "#06b6d4", "#8b5cf6", "#ec4899", "#14b8a6"];

export const DashboardChart = ({ summary }: { summary: Summary }) => {
  const pieData = Object.entries(summary.byCategory).map(([name, value]) => ({ name, value }));
  const barData = [
    { name: "Income", value: summary.income, fill: "#10d9a0" },
    { name: "Expense", value: summary.expense, fill: "#ff4d7d" },
    { name: "Balance", value: summary.balance, fill: "#6c63ff" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4 text-sm text-muted uppercase tracking-wider">Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
            <XAxis dataKey="name" tick={{ fill: "#e5e7eb", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#e5e7eb", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(25, 25, 34, 0.95)",
                border: "1px solid rgba(226, 232, 240, 0.2)",
                borderRadius: "10px",
                color: "#f8fafc",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
                fontSize: 12,
              }}
              labelStyle={{ color: "#e2e8f0", fontWeight: 600 }}
              itemStyle={{ color: "#e2e8f0" }}
              cursor={{ fill: "rgba(108,99,255,0.08)" }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {pieData.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-sm text-muted uppercase tracking-wider">By Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(25, 25, 34, 0.95)",
                  border: "1px solid rgba(226, 232, 240, 0.2)",
                  borderRadius: "10px",
                  color: "#f8fafc",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
                  fontSize: 12,
                }}
                labelStyle={{ color: "#e2e8f0", fontWeight: 600 }}
                itemStyle={{ color: "#e2e8f0" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {pieData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-slate-100">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};