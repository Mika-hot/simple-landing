"use client";

import * as React from "react";
import Image from "next/image";
import SiteHeader from "@/components/header/SiteHeader";
import DateRangeFilter from "@/components/filters/DateRangeFilter";
import PostGrid from "@/components/posts/PostGrid";
import ViewToggle from "@/components/ui/ViewToggle";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import { usePostFilters } from "@/hooks/usePostFilters";
import { mockPosts, profileStats } from "@/lib/mockPosts";
import { tokens } from "@/theme/tokens";

// Tiles: 8 per page (2 rows × 4 cols); Rows: 24 per page
const PAGE_SIZE: Record<"grid" | "row", number> = { grid: 8, row: 9 };
const LOAD_MORE_SIZE: Record<"grid" | "row", number> = { grid: 8, row: 9 };

export default function HomePage() {
  const { filtered, filterState, setFrom, setTo, setLayout } = usePostFilters(mockPosts);

  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE[filterState.layout]);

  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE[filterState.layout]);
  }, [filtered, filterState.layout]);

  const visible = React.useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  const hasMore = visibleCount < filtered.length;

  const loadMore = React.useCallback(() => {
    setVisibleCount((n) => n + LOAD_MORE_SIZE[filterState.layout]);
  }, [filterState.layout]);

  // Date filter only — toggle lives in the main column below
  const filterBar = (
    <DateRangeFilter
      from={filterState.from}
      to={filterState.to}
      onFromChange={setFrom}
      onToChange={setTo}
    />
  );

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: tokens.color.surface }}
    >
      {/* ── Left background vector ── */}
      <div
        className="absolute top-0 left-0 pointer-events-none select-none"
        style={{ width: 630, height: 398, zIndex: 0 }}
        aria-hidden="true"
      >
        <Image
          src="/assets/LeftVector.svg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "top left" }}
          priority
        />
      </div>

      {/* ── Sticky header ── */}
      <div className="relative" style={{ zIndex: 10 }}>
        <SiteHeader stats={profileStats} filterSlot={filterBar} />
      </div>

      {/* ── Main content ── */}
      <main
        className="relative max-w-[1440px] mx-auto pb-24 px-4 sm:px-6"
        style={{ zIndex: 1, paddingTop: 18 }}
      >
        {/* 836px wrapper — toggle right-edge aligns with post container */}
        <div className="mx-auto w-full" style={{ maxWidth: 836 }}>
          <div className="flex justify-end" style={{ marginBottom: 24 }}>
            <ViewToggle layout={filterState.layout} onLayoutChange={setLayout} />
          </div>

          <PostGrid posts={visible} layout={filterState.layout} />
        </div>

        {/* Load more / end indicator */}
        {filtered.length > 0 && (
          <div className="flex justify-center my-8">
            {hasMore ? (
              <LoadMoreButton onClick={loadMore} />
            ) : (
              <span
                style={{
                  fontFamily: tokens.font.body.join(", "),
                  fontSize: 11,
                  fontWeight: 500,
                  color: tokens.color.textDisabled,
                  letterSpacing: "-0.03em",
                }}
              >
                {filtered.length} posts shown
              </span>
            )}
          </div>
        )}
      </main>

      {/* ── Right decorative vector ── */}
      <div
        className="fixed bottom-0 right-0 pointer-events-none select-none"
        style={{ width: 210, height: 368, zIndex: 0 }}
        aria-hidden="true"
      >
        <Image
          src="/assets/RightVector.svg"
          alt=""
          fill
          style={{ objectFit: "contain", objectPosition: "bottom right" }}
        />
      </div>
    </div>
  );
}
