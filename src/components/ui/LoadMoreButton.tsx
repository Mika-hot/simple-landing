import * as React from "react";
import { tokens } from "@/theme/tokens";

interface LoadMoreButtonProps {
  onClick: () => void;
}

export default function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 111,
        height: 28,
        borderRadius: 14,
        backgroundColor: tokens.color.bgLoadMore,
        border: `1px solid ${tokens.color.loadMore}`,
        fontFamily: tokens.font.body.join(", "),
        fontWeight: 500,
        fontSize: 11,
        textTransform: "uppercase",
        lineHeight: "100%",
        letterSpacing: "-0.03em",
        color: tokens.color.loadMore,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Load more
    </button>
  );
}
