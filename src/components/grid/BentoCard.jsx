import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_HEIGHTS = {
  "1-1": "180px",
  "1-2": "100%",
  "2-1": "220px",
  "2-2": "100%",
  "3-1": "240px",
};

function getImageHeight(colSpan, rowSpan) {
  return IMAGE_HEIGHTS[`${colSpan}-${rowSpan}`] || "180px";
}

// Tag-based placeholder colors — muted pastel tones
const TAG_COLORS = {
  fintech: { main: "#c7d8f0", variants: ["#c7d8f0", "#b4c9e8", "#d6e3f5", "#a8bde0", "#dde9f8"] },
  ai: { main: "#d4ccf0", variants: ["#d4ccf0", "#c5b8e8", "#e0d9f5", "#b8a8e0", "#e8e2f8"] },
  entertainment: { main: "#f0c7ce", variants: ["#f0c7ce", "#e8b4bd", "#f5d6dc", "#e0a8b2", "#f8dde2"] },
  "experience-design": { main: "#c2e8d8", variants: ["#c2e8d8", "#afdecb", "#d2f0e2", "#9dd4be", "#dff5ea"] },
};
const DEFAULT_COLOR = { main: "#e4e4e4", variants: ["#e4e4e4", "#dadada", "#ebebeb", "#d0d0d0", "#f0f0f0"] };

function getTagColor(tags) {
  if (!tags || tags.length === 0) return DEFAULT_COLOR;
  for (const tag of tags) {
    if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  }
  return DEFAULT_COLOR;
}

export function BentoCard({ data, index, isExpanded, onToggle, isAnyExpanded }) {
  const colSpan = data.colSpan || 1;
  const rowSpan = data.rowSpan || 1;
  const imgHeight = getImageHeight(colSpan, rowSpan);
  const isTall = rowSpan >= 2;
  const tagColor = getTagColor(data.tags);
  const placeholderColor = tagColor.main;
  const galleryTones = tagColor.variants;
  const isResearchOrAbout = !data.tags || data.tags.length === 0;

  return (
    <motion.div
      layout
      onClick={() => !isExpanded && onToggle(data.id)}
      style={{
        gridColumn: isExpanded ? "1 / -1" : `span ${colSpan}`,
        gridRow: isExpanded ? "auto" : `span ${rowSpan}`,
        background: "var(--bg-card)",
        cursor: isExpanded ? "default" : "pointer",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isAnyExpanded && !isExpanded ? 0.4 : 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {!isExpanded ? (
        /* --- COLLAPSED: Image card with title below --- */
        <>
          <div
            style={{
              width: "100%",
              height: isTall ? "calc(100% - 72px)" : imgHeight,
              background: placeholderColor,
              flexShrink: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {data.image && (
              <img
                src={data.image}
                alt={data.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0)",
              }}
              whileHover={{ background: "rgba(0,0,0,0.03)" }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div style={{ padding: "14px 16px 16px" }}>
            <h2
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {data.title}
            </h2>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "12px",
                color: "var(--text-tertiary)",
                margin: "4px 0 0 0",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {data.subtitle}
            </p>
          </div>
        </>
      ) : (
        /* --- EXPANDED: Article layout --- */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* Header */}
          <div style={{ padding: "40px 40px 0", maxWidth: "720px" }}>
            <h2
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "32px",
                fontWeight: "500",
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {data.title}
            </h2>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "14px",
                color: "var(--text-tertiary)",
                margin: "6px 0 0 0",
                letterSpacing: "0.01em",
              }}
            >
              {data.subtitle}
            </p>
          </div>

          {/* Body text */}
          {data.description && (
            <div style={{ padding: "28px 40px 0", maxWidth: "720px" }}>
              <p
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: "15px",
                  color: "var(--text-secondary)",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {data.description}
              </p>
            </div>
          )}

          {/* Meta list */}
          {!isResearchOrAbout && (
            <div
              style={{
                padding: "28px 40px 0",
                maxWidth: "720px",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px 40px",
              }}
            >
              {data.client && (
                <MetaItem label="Client" value={data.client} />
              )}
              {data.date && (
                <MetaItem label="Date" value={data.date} />
              )}
              {data.skills && data.skills.length > 0 && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <MetaItem label="Skills" value={data.skills.join(", ")} />
                </div>
              )}
            </div>
          )}

          {/* Images */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              background: "var(--bg-subtle)",
              marginTop: "36px",
            }}
          >
            {isResearchOrAbout ? (
              data.notes && data.notes.map((note, i) => (
                <div key={i} style={{ padding: "16px 40px", background: "var(--bg-card)" }}>
                  <p
                    style={{
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontSize: "15px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {note}
                  </p>
                </div>
              ))
            ) : (
              galleryTones.map((tone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                  style={{
                    width: "100%",
                    height: i === 0 ? "50vh" : "40vh",
                    background: tone,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "16px",
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontSize: "11px",
                      color: "rgba(0,0,0,0.2)",
                    }}
                  >
                    {i + 1} / {galleryTones.length}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <span
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "10px",
          fontWeight: "600",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          display: "block",
          marginBottom: "4px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: 1.4,
        }}
      >
        {value}
      </span>
    </div>
  );
}
