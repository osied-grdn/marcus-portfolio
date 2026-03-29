import React from "react";
import { motion } from "framer-motion";

const ACCENT_COLORS = {
  fintech: { accent: "#2563eb", text: "#1e40af" },
  ai: { accent: "#7c3aed", text: "#5b21b6" },
  entertainment: { accent: "#e11d48", text: "#be123c" },
  "experience-design": { accent: "#059669", text: "#047857" },
};

function getAccent(tags) {
  if (!tags || tags.length === 0) return { accent: "#6b7280", text: "#374151" };
  for (const tag of tags) {
    if (ACCENT_COLORS[tag]) return ACCENT_COLORS[tag];
  }
  return { accent: "#6b7280", text: "#374151" };
}

export function InfoPopup({ project, onClose }) {
  const colors = getAccent(project.tags);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-popup)",
          borderRadius: "24px",
          width: "90vw",
          maxWidth: "520px",
          maxHeight: "70vh",
          overflow: "auto",
          boxShadow: "var(--shadow-popup)",
          padding: "40px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
          <div>
            <h2
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "13px",
                color: "var(--text-tertiary)",
                margin: "6px 0 0 0",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {project.subtitle}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              background: "var(--close-btn-bg)",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.button>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border-divider)", margin: "0 0 24px 0" }} />

        {/* Info list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Notes */}
          <InfoSection title="Project Notes">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {project.notes && project.notes.map((note, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: colors.accent,
                      marginTop: "6px",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {note}
                  </span>
                </div>
              ))}
            </div>
          </InfoSection>

          {/* Categories */}
          <InfoSection title="Categories">
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {project.tags && project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: colors.text,
                    background: colors.accent + "12",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${colors.accent}20`,
                  }}
                >
                  {tag.replace("-", " ")}
                </span>
              ))}
            </div>
          </InfoSection>

          {/* Link */}
          {project.url && project.url !== "#" && (
            <InfoSection title="Link">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: colors.accent,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                View Project
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </InfoSection>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function InfoSection({ title, children }) {
  return (
    <div>
      <h3
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "10px",
          fontWeight: "600",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          margin: "0 0 10px 0",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
