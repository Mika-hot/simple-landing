import React from "react";
import type { SvgIconProps } from "@mui/material";

interface StatLineProps {
  Icon: React.ComponentType<SvgIconProps>;
  value: number;
  textStyle: React.CSSProperties;
  iconSize?: number;
  iconColor?: string;
}

export function StatLine({ Icon, value, textStyle, iconSize = 14, iconColor }: StatLineProps) {
  return (
    <div className="flex items-center" style={{ gap: 6 }}>
      <Icon sx={{ fontSize: iconSize, color: iconColor }} />
      <span style={textStyle}>{value}</span>
    </div>
  );
}
