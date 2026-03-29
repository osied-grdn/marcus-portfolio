import React from "react";

export default function Header() {
  return (
    <header
      className="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "20px 32px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          pointerEvents: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "15px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                color: "var(--text-primary)",
                textTransform: "uppercase",
              }}
            >
              OSIED
            </span>
            <span
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "15px",
                fontWeight: "300",
                letterSpacing: "0.12em",
                color: "var(--text-primary)",
                textTransform: "uppercase",
              }}
            >
              PORTFOLIO
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: "8px",
              fontWeight: "400",
              letterSpacing: "0.2em",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              marginTop: "-1px",
            }}
          >
            Software Engineer
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .site-header {
            padding: 16px 20px !important;
          }
        }
      `}</style>
    </header>
  );
}
