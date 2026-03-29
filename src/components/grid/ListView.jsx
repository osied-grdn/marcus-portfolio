import React from "react";

export function ListView({ items, onSelect }) {
  return (
    <div style={{ padding: "0 32px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "1px solid var(--border-divider)",
            }}
          >
            <th style={thStyle}>Project</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{
                borderBottom: "1px solid var(--border-subtle)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <td style={tdStyle}>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "var(--text-primary)" }}>
                  {item.title}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-tertiary)", marginLeft: "12px" }}>
                  {item.subtitle}
                </span>
              </td>
              <td style={{ ...tdStyle, textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  {item.tags && item.tags.length > 0
                    ? item.tags[0].replace("-", " ")
                    : "\u2014"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  fontSize: "10px",
  fontWeight: "500",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  padding: "12px 0",
};

const tdStyle = {
  padding: "14px 0",
};
