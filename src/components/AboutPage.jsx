import React from "react";
import { motion } from "framer-motion";
import aboutData from "../../backend/about.json";

export function AboutPage() {
  const { title, subtitle, intro, experience, education, contact } = aboutData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "60px 40px 120px",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "700",
          color: "var(--text-primary)",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "var(--text-tertiary)",
          margin: "8px 0 0 0",
          letterSpacing: "0.04em",
        }}
      >
        {subtitle}
      </p>

      {/* Intro */}
      <p
        style={{
          fontSize: "16px",
          color: "var(--text-secondary)",
          lineHeight: 1.75,
          margin: "36px 0 0 0",
        }}
      >
        {intro}
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--border-divider)",
          margin: "40px 0",
        }}
      />

      {/* Experience */}
      <h2 style={sectionHeading}>Experience</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "20px" }}>
        {experience.map((exp) => (
          <div key={exp.company + exp.period} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>
                {exp.company}
              </span>
              <span style={{ fontSize: "14px", color: "var(--text-tertiary)", marginLeft: "10px" }}>
                {exp.role}
              </span>
            </div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>
              {exp.period} · {exp.location}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--border-divider)",
          margin: "40px 0",
        }}
      />

      {/* Education */}
      <h2 style={sectionHeading}>Education</h2>
      <div style={{ marginTop: "20px" }}>
        <span style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>
          {education.school}
        </span>
        <br />
        <span style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          {education.degree}
        </span>
        <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "10px" }}>
          {education.period}
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--border-divider)",
          margin: "40px 0",
        }}
      />

      {/* Contact */}
      <h2 style={sectionHeading}>Contact</h2>
      <a
        href={`mailto:${contact.email}`}
        style={{
          fontSize: "15px",
          color: "var(--text-primary)",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          textDecorationColor: "var(--text-muted)",
          marginTop: "20px",
          display: "inline-block",
        }}
      >
        {contact.email}
      </a>
    </motion.div>
  );
}

const sectionHeading = {
  fontSize: "10px",
  fontWeight: "600",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  margin: 0,
};
