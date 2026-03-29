import React from "react";
import { motion } from "framer-motion";

export function WelcomeCard({ onDismiss, onAbout }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "84px",
        left: 0,
        right: 0,
        zIndex: 99,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        maxWidth: "420px",
        width: "calc(100vw - 40px)",
        pointerEvents: "auto",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #d4ccf0 0%, #c7d8f0 100%)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: "20px",
            fontWeight: "700",
            color: "#fff",
          }}
        >
          M
        </span>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: "13px",
            color: "#333",
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          Hi, I'm Marcus — a software engineer based in the UAE,
          experienced in fintech, AI, and experience design.{" "}
          <span
            onClick={(e) => {
              e.stopPropagation();
              onAbout();
            }}
            style={{
              color: "#666",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              cursor: "pointer",
            }}
          >
            More
          </span>
        </p>
      </div>

      {/* Dismiss */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDismiss}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          flexShrink: 0,
          color: "#bbb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </motion.button>
    </motion.div>
    </div>
  );
}
