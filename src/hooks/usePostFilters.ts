"use client";

import { useState, useMemo, useCallback } from "react";
import type { Post, FilterState, LayoutMode } from "@/types";

export function usePostFilters(posts: Post[]) {
  const [filterState, setFilterState] = useState<FilterState>({
    from: null,
    to: null,
    layout: "grid",
  });

  const filtered = useMemo(() => {
    const { from, to } = filterState;
    if (!from && !to) return posts;
    return posts.filter((post) => {
      const t = post.postDate.getTime();
      if (from && t < from.getTime()) return false;
      if (to && t > to.getTime()) return false;
      return true;
    });
  }, [posts, filterState]);

  const setFrom = useCallback((date: Date | null) => {
    setFilterState((prev) => ({ ...prev, from: date }));
  }, []);

  const setTo = useCallback((date: Date | null) => {
    setFilterState((prev) => ({ ...prev, to: date }));
  }, []);

  const clearDates = useCallback(() => {
    setFilterState((prev) => ({ ...prev, from: null, to: null }));
  }, []);

  const setLayout = useCallback((layout: LayoutMode) => {
    setFilterState((prev) => ({ ...prev, layout }));
  }, []);

  return { filtered, filterState, setFrom, setTo, clearDates, setLayout };
}
