import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Transaction } from "../types";

export const Transactions = () => {
  const [tx, setTx] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/transactions");
        setTx(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e5e7eb", padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Transactions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : tx.length ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tx.map((t) => (
            <li key={t._id} style={{ marginBottom: "0.7rem", border: "1px solid #2d3344", borderRadius: "10px", padding: "1rem", background: "#111827" }}>
              <p><strong>{t.description}</strong></p>
              <p>Type: {t.type}</p>
              <p>Category: {t.category}</p>
              <p>Amount: ₹{t.amount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found</p>
      )}
    </div>
  );
};