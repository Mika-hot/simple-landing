"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import type { LayoutMode } from "@/types";
import { tokens } from "@/theme/tokens";

interface LayoutToggleProps {
  layout: LayoutMode;
  onChange: (layout: LayoutMode) => void;
}

export default function LayoutToggle({ layout, onChange }: LayoutToggleProps) {
  return (
    <div className="flex items-center gap-1">
      <IconButton
        onClick={() => onChange("grid")}
        size="small"
        aria-label="Grid view"
        sx={{
          color: layout === "grid" ? tokens.color.gradientFrom : tokens.color.textMuted,
          border: `1px solid ${layout === "grid" ? tokens.color.gradientFrom : tokens.color.border}`,
          borderRadius: "2px",
          padding: "4px",
        }}
      >
        <GridViewIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => onChange("row")}
        size="small"
        aria-label="Row view"
        sx={{
          color: layout === "row" ? tokens.color.gradientFrom : tokens.color.textMuted,
          border: `1px solid ${layout === "row" ? tokens.color.gradientFrom : tokens.color.border}`,
          borderRadius: "2px",
          padding: "4px",
        }}
      >
        <ViewListIcon fontSize="small" />
      </IconButton>
    </div>
  );
}
