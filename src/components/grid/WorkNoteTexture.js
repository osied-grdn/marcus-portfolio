import { useMemo } from "react";
import * as THREE from "three";

const CANVAS_W = 600;
const CANVAS_H = 450;

const ACCENT_COLORS = {
  fintech: "#2563eb",
  ai: "#7c3aed",
  entertainment: "#e11d48",
  "experience-design": "#059669",
};

function getAccentColor(tags) {
  if (!tags || tags.length === 0) return "#6b7280";
  for (const tag of tags) {
    if (ACCENT_COLORS[tag]) return ACCENT_COLORS[tag];
  }
  return "#6b7280";
}

function drawWorkNote(canvas, data) {
  const ctx = canvas.getContext("2d");
  const w = CANVAS_W;
  const h = CANVAS_H;
  canvas.width = w;
  canvas.height = h;

  const accent = getAccentColor(data.tags);

  // Background
  ctx.fillStyle = "#f8f8f6";
  ctx.fillRect(0, 0, w, h);

  // Subtle dot grid (are.na style)
  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  for (let x = 20; x < w; x += 20) {
    for (let y = 20; y < h; y += 20) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Top accent bar
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.12;
  ctx.fillRect(0, 0, w, 4);
  ctx.globalAlpha = 1;

  // Title
  ctx.fillStyle = "#111";
  ctx.font = "bold 18px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText(data.title || "Untitled", 28, 44);

  // Subtitle line
  if (data.subtitle) {
    ctx.fillStyle = "#999";
    ctx.font = "12px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.fillText(data.subtitle, 28, 64);
  }

  // Divider
  ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(28, 80);
  ctx.lineTo(w - 28, 80);
  ctx.stroke();

  // Chat bubble notes
  const notes = data.notes || [];
  let bubbleY = 100;
  notes.forEach((note, i) => {
    const isLeft = i % 2 === 0;
    const bubbleX = isLeft ? 28 : 80;
    const maxBubbleW = w - 108;

    // Measure text
    ctx.font = "13px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    const textWidth = Math.min(ctx.measureText(note).width + 28, maxBubbleW);
    const bubbleH = 36;

    // Bubble background
    const radius = 12;
    ctx.fillStyle = isLeft ? "rgba(0, 0, 0, 0.04)" : `${accent}15`;
    ctx.beginPath();
    ctx.roundRect(bubbleX, bubbleY, textWidth, bubbleH, radius);
    ctx.fill();

    // Bubble border
    ctx.strokeStyle = isLeft ? "rgba(0, 0, 0, 0.06)" : `${accent}30`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(bubbleX, bubbleY, textWidth, bubbleH, radius);
    ctx.stroke();

    // Bubble text
    ctx.fillStyle = "#333";
    ctx.font = "13px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.fillText(note, bubbleX + 14, bubbleY + 22);

    bubbleY += bubbleH + 14;
  });

  // Tag chips at bottom
  if (data.tags && data.tags.length > 0) {
    let chipX = 28;
    const chipY = h - 40;
    ctx.font = "10px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    data.tags.forEach((tag) => {
      const label = tag.replace("-", " ").toUpperCase();
      const tw = ctx.measureText(label).width + 16;
      ctx.fillStyle = `${accent}18`;
      ctx.beginPath();
      ctx.roundRect(chipX, chipY, tw, 22, 6);
      ctx.fill();
      ctx.fillStyle = accent;
      ctx.fillText(label, chipX + 8, chipY + 15);
      chipX += tw + 8;
    });
  }

  return canvas;
}

export function useWorkNoteTexture(data) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    drawWorkNote(canvas, data);
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, [data.id]);

  return texture;
}

export const WORK_NOTE_ASPECT = CANVAS_W / CANVAS_H;
