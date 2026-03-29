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
              borderBottom: "1px solid rgba(0,0,0,0.08)",
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
                borderBottom: "1px solid rgba(0,0,0,0.04)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <td style={tdStyle}>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#111" }}>
                  {item.title}
                </span>
                <span style={{ fontSize: "12px", color: "#999", marginLeft: "12px" }}>
                  {item.subtitle}
                </span>
              </td>
              <td style={{ ...tdStyle, textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "#bbb" }}>
                  {item.tags && item.tags.length > 0
                    ? item.tags[0].replace("-", " ")
                    : "—"}
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
  color: "#bbb",
  padding: "12px 0",
};

const tdStyle = {
  padding: "14px 0",
};
