import React from "react";
import { StatGroup } from "./StatGroup";

interface PostCardColumnProps {
  headerText: string;
  headerStyle: React.CSSProperties;
  likes: number;
  comments: number;
  footerText: string;
  footerStyle: React.CSSProperties;
  statTextStyle: React.CSSProperties;
  iconColor: string;
  alignEnd?: boolean;
}

export function PostCardColumn({
  headerText,
  headerStyle,
  likes,
  comments,
  footerText,
  footerStyle,
  statTextStyle,
  iconColor,
  alignEnd = false,
}: PostCardColumnProps) {
  return (
    <div
      className={`flex flex-col justify-between flex-1 ${alignEnd ? "items-start pl-2" : "items-start"}`}
    >
      <span style={headerStyle}>{headerText}</span>
      <StatGroup likes={likes} comments={comments} textStyle={statTextStyle} iconColor={iconColor} />
      <span style={footerStyle}>{footerText}</span>
    </div>
  );
}
