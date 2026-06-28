import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import { StatLine } from "./StatLine";

interface StatGroupProps {
  likes: number;
  comments: number;
  textStyle: React.CSSProperties;
  iconColor: string;
  direction?: "col" | "row";
}

export function StatGroup({ likes, comments, textStyle, iconColor, direction = "col" }: StatGroupProps) {
  return (
    <div
      className={direction === "row" ? "flex flex-row" : "flex flex-col"}
      style={{ gap: direction === "row" ? 20 : 8 }}
    >
      <StatLine Icon={FavoriteIcon} value={likes} textStyle={textStyle} iconColor={iconColor} />
      <StatLine Icon={ModeCommentRoundedIcon} value={comments} textStyle={textStyle} iconColor={iconColor} />
    </div>
  );
}
