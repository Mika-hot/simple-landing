"use client";

import * as React from "react";
import type { LayoutMode } from "@/types";
import { tokens } from "@/theme/tokens";

interface ViewToggleProps {
  layout: LayoutMode;
  onLayoutChange: (l: LayoutMode) => void;
}

// ─── SVG icons (fill is dynamic) ─────────────────────────────────────────────

function RowsIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="6" height="6" fill={color}/>
      <rect x="8" width="6" height="6" fill={color}/>
      <rect x="16" width="6" height="6" fill={color}/>
      <rect y="8" width="6" height="6" fill={color}/>
      <rect y="16" width="6" height="6" fill={color}/>
      <rect x="8" y="8" width="6" height="6" fill={color}/>
      <rect x="8" y="16" width="6" height="6" fill={color}/>
      <rect x="16" y="8" width="6" height="6" fill={color}/>
      <rect x="16" y="16" width="6" height="6" fill={color}/>
    </svg>
  );
}

function TilesIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="6" height="6" fill={color}/>
      <rect y="8" width="6" height="6" fill={color}/>
      <rect y="16" width="6" height="6" fill={color}/>
      <rect x="9" y="2" width="15" height="2" fill={color}/>
      <rect x="9" y="10" width="15" height="2" fill={color}/>
      <rect x="9" y="18" width="15" height="2" fill={color}/>
    </svg>
  );
}

// ─── Toggle component ─────────────────────────────────────────────────────────

export default function ViewToggle({ layout, onLayoutChange }: ViewToggleProps) {
  const [hovered, setHovered] = React.useState<LayoutMode | null>(null);

  const colorFor = (mode: LayoutMode) =>
    layout === mode || hovered === mode ? tokens.color.accent : tokens.color.iconInactive;

  const btnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    lineHeight: 0,
  };

  return (
    <div className="flex items-center gap-2">
      {/* RowsIcon (3×3 grid) → activates row list view */}
      <button
        type="button"
        aria-label="Row view"
        onClick={() => onLayoutChange("row")}
        onMouseEnter={() => setHovered("row")}
        onMouseLeave={() => setHovered(null)}
        style={btnStyle}
      >
        <RowsIcon color={colorFor("row")} />
      </button>

      {/* TilesIcon (squares + lines) → activates tile grid view */}
      <button
        type="button"
        aria-label="Grid view"
        onClick={() => onLayoutChange("grid")}
        onMouseEnter={() => setHovered("grid")}
        onMouseLeave={() => setHovered(null)}
        style={btnStyle}
      >
        <TilesIcon color={colorFor("grid")} />
      </button>
    </div>
  );
}
