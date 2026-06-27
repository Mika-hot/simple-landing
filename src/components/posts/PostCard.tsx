import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import type { Post } from "@/types";
import { tokens } from "@/theme/tokens";
import { GridPostCard } from "./GridPostCard";
import { StatGroup } from "./StatGroup";

const rowLabel: React.CSSProperties = {
  fontFamily: tokens.font.body.join(", "),
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "100%",
  letterSpacing: 0,
  color: tokens.color.textPrimary,
};

const rowDateText: React.CSSProperties = {
  ...rowLabel,
  fontSize: 14,
  color: tokens.color.textMuted,
};

const rowStatText: React.CSSProperties = {
  fontFamily: tokens.font.body.join(", "),
  fontWeight: tokens.fontWeight.medium,
  fontSize: 14,
  lineHeight: "100%",
  color: tokens.color.textPrimary,
};

function PostCardRow({
  imageUrl,
  labelDate,
  postDate,
  likesA,
  commentsA,
  likesB,
  commentsB,
  sourceType,
  sourceDate,
}: Post) {
  return (
    <article
      className="flex items-center"
      style={{
        height: 86,
        maxWidth: 836,
        width: "100%",
        backgroundColor: tokens.color.white,
        borderBottom: `1px solid ${tokens.color.border}`,
      }}
    >
      <div
        style={{
          width: 86,
          height: 86,
          position: "relative",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Image src={imageUrl} alt={sourceType} fill sizes="86px" className="object-cover" />
      </div>

      <div
        className="flex items-center flex-1 min-w-0"
        style={{ paddingLeft: 30, paddingRight: 16 }}
      >
        <div className="flex flex-col justify-center flex-1" style={{ gap: 8, minWidth: 0 }}>
          <span style={rowLabel}>{labelDate}</span>
          <StatGroup
            likes={likesA}
            comments={commentsA}
            textStyle={rowStatText}
            iconColor={tokens.color.textPrimary}
          />
        </div>

        <div className="flex flex-col justify-center flex-1" style={{ gap: 8, minWidth: 0 }}>
          <span style={rowLabel}>{format(postDate, "d-MM-yyyy")}</span>
          <StatGroup
            likes={likesB}
            comments={commentsB}
            textStyle={rowStatText}
            iconColor={tokens.color.textPrimary}
          />
        </div>

        <div className="flex flex-col justify-center flex-1" style={{ gap: 8, minWidth: 0 }}>
          <span style={rowLabel}>{sourceType}</span>
          <span style={rowDateText}>{format(sourceDate, "d-MM-yyyy")}</span>
        </div>
      </div>
    </article>
  );
}

export const PostCard = {
  Tile: GridPostCard,
  Row: PostCardRow,
};
