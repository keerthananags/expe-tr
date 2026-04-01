import React from "react";
import { motion } from "framer-motion";

export const LampContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full ${className}`}
      style={{ background: "#0a0a0f" }}
    >
      {/* Lamp beams */}
      <div className="relative flex w-full flex-1 items-center justify-center"
        style={{ transform: "scaleY(1.25)" }}>

        {/* Left beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "8rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            right: "50%",
            height: "14rem",
            overflow: "visible",
            backgroundImage: "conic-gradient(from 70deg at center top, #6c63ff, transparent, transparent)",
            color: "white",
          }}
        >
          <div style={{
            position: "absolute", width: "100%", left: 0,
            background: "#0a0a0f", height: "10rem", bottom: 0, zIndex: 20,
            maskImage: "linear-gradient(to top, white, transparent)",
            WebkitMaskImage: "linear-gradient(to top, white, transparent)",
          }} />
          <div style={{
            position: "absolute", width: "10rem", height: "100%", left: 0,
            background: "#0a0a0f", bottom: 0, zIndex: 20,
            maskImage: "linear-gradient(to right, white, transparent)",
            WebkitMaskImage: "linear-gradient(to right, white, transparent)",
          }} />
        </motion.div>

        {/* Right beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "8rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: "50%",
            height: "14rem",
            overflow: "visible",
            backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, #6c63ff)",
            color: "white",
          }}
        >
          <div style={{
            position: "absolute", width: "10rem", height: "100%", right: 0,
            background: "#0a0a0f", bottom: 0, zIndex: 20,
            maskImage: "linear-gradient(to left, white, transparent)",
            WebkitMaskImage: "linear-gradient(to left, white, transparent)",
          }} />
          <div style={{
            position: "absolute", width: "100%", right: 0,
            background: "#0a0a0f", height: "10rem", bottom: 0, zIndex: 20,
            maskImage: "linear-gradient(to top, white, transparent)",
            WebkitMaskImage: "linear-gradient(to top, white, transparent)",
          }} />
        </motion.div>

        {/* Glow layers */}
        <div style={{
          position: "absolute", top: "50%", height: "12rem", width: "100%",
          transform: "translateY(3rem) scaleX(1.5)", background: "#0a0a0f",
          filter: "blur(24px)",
        }} />
        <div style={{
          position: "absolute", top: "50%", zIndex: 50, height: "12rem", width: "100%",
          background: "transparent", opacity: 0.1, backdropFilter: "blur(12px)",
        }} />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute", zIndex: 30, height: "9rem",
            transform: "translateY(-6rem)", borderRadius: "50%",
            background: "#6c63ff", opacity: 0.45, filter: "blur(40px)",
          }}
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute", zIndex: 50, height: "2px",
            transform: "translateY(-7rem)", background: "#6c63ff",
          }}
        />
        <div style={{
          position: "absolute", zIndex: 40, height: "11rem", width: "100%",
          transform: "translateY(-12.5rem)", background: "#0a0a0f",
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 50,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        width: "100%", minHeight: "100vh",
        transform: "translateY(0)", padding: "0 1.25rem",
      }}>
        {children}
      </div>
    </div>
  );
};