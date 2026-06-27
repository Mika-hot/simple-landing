import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import { StatLine } from "./StatLine";

interface StatGroupProps {
  likes: number;
  comments: number;
  textStyle: React.CSSProperties;
  iconColor: string;
}

export function StatGroup({ likes, comments, textStyle, iconColor }: StatGroupProps) {
  return (
    <div className="flex flex-col" style={{ gap: 16 }}>
      <StatLine Icon={FavoriteIcon} value={likes} textStyle={textStyle} iconColor={iconColor} />
      <StatLine Icon={ModeCommentRoundedIcon} value={comments} textStyle={textStyle} iconColor={iconColor} />
    </div>
  );
}
