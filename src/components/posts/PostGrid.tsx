import * as React from "react";
import type { Post, LayoutMode } from "@/types";
import { PostCard } from "./PostCard";
import { tokens } from "@/theme/tokens";

interface PostGridProps {
  posts: Post[];
  layout: LayoutMode;
}

export default function PostGrid({ posts, layout }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div
        className="text-center py-20"
        style={{ color: tokens.color.textDisabled, fontFamily: tokens.font.body.join(", ") }}
      >
        No posts match the selected date range.
      </div>
    );
  }

  if (layout === "grid") {
    // 4 columns × 203 px + 3 gaps × 8 px = 836 px total — matches row card max-width
    // On tablet: 2 cols fluid; mobile: 1 col fluid
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto w-full"
        style={{
          maxWidth: 836,
          columnGap: 8,
          rowGap: 16,
        }}
      >
        {posts.map((post, i) => (
          <PostCard.Tile key={post.id} {...post} priority={i === 0} />
        ))}
      </div>
    );
  }

  // Row layout — each card is also capped at 836 px
  return (
    <div className="flex flex-col mx-auto w-full" style={{ gap: 8, maxWidth: 836 }}>
      {posts.map((post) => (
        <PostCard.Row key={post.id} {...post} />
      ))}
    </div>
  );
}
