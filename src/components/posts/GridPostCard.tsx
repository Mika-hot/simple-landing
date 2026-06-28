import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import type { Post } from "@/types";
import { tokens } from "@/theme/tokens";
import { PostCardColumn } from "./PostCardColumn";

type GridPostCardProps = Post & { priority?: boolean };

const heading: React.CSSProperties = {
  fontFamily: tokens.font.body.join(", "),
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "100%",
  letterSpacing: 0,
  color: tokens.color.textPrimary,
  marginBottom: 8,
};

const sub: React.CSSProperties = {
  ...heading,
  fontSize: 14,
  color: tokens.color.textMuted,
  marginTop: 24,
};

const statText: React.CSSProperties = {
  fontFamily: tokens.font.body.join(", "),
  fontWeight: tokens.fontWeight.medium,
  fontSize: 14,
  lineHeight: "100%",
  color: tokens.color.textPrimary,
};

export function GridPostCard({
  imageUrl,
  labelDate,
  postDate,
  likesA,
  commentsA,
  likesB,
  commentsB,
  sourceType,
  sourceDate,
  priority,
}: GridPostCardProps) {
  return (
    <article
      style={{
        width: "100%",
        maxWidth: 203,
        maxHeight: 341,
        backgroundColor: tokens.color.white,
        boxShadow: tokens.shadow.card,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "100%",
          maxHeight: 203,
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Image
          src={imageUrl}
          alt={sourceType}
          fill
          sizes="203px"
          priority={priority}
          className="object-cover"
        />
      </div>

      <div
        style={{
          padding: "12px 12px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <PostCardColumn
          headerText={labelDate}
          headerStyle={heading}
          likes={likesA}
          comments={commentsA}
          footerText={sourceType}
          footerStyle={sub}
          statTextStyle={statText}
          iconColor={tokens.color.textPrimary}
        />
        <PostCardColumn
          headerText={format(postDate, "d-MM-yyyy")}
          headerStyle={{ ...heading, color: tokens.color.textMuted }}
          likes={likesB}
          comments={commentsB}
          footerText={format(sourceDate, "d-MM-yyyy")}
          footerStyle={sub}
          statTextStyle={statText}
          iconColor={tokens.color.textPrimary}
          alignEnd
        />
      </div>
    </article>
  );
}
