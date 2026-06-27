import * as React from "react";
import Image from "next/image";
import { format } from "date-fns";
import type { ProfileStats } from "@/types";
import { tokens } from "@/theme/tokens";

interface SiteHeaderProps {
  stats: ProfileStats;
  filterSlot: React.ReactNode;
}

export default function SiteHeader({ stats, filterSlot }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: tokens.color.headerBg,
        boxShadow: tokens.shadow.header,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-center gap-[86px] py-5">
          {/* Hexagon logo */}
          <div className="shrink-0">
            <Image
              src="/assets/Logo.svg"
              alt="monblanproject logo"
              width={128}
              height={128}
              priority
            />
          </div>

          {/* Info block — 3 stacked rows */}
          <div className="flex flex-col gap-3.5 min-w-0">
            {/* Row 1: username + start badge */}
            <div className="flex items-center gap-4 flex-wrap">
              <span
                style={{
                  fontFamily: tokens.font.brand.join(", "),
                  fontSize: tokens.fontSize.logo,
                  fontWeight: tokens.fontWeight.medium,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  color: tokens.color.textPrimary,
                }}
              >
                {stats.username}
              </span>

              {/* Blue badge — 135×28, 2px radius, 1px border, 6px/12px pad */}
              <div
                style={{
                  width: 135,
                  height: 28,
                  borderRadius: 2,
                  border: `1px solid ${tokens.color.accent}`,
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    fontFamily: tokens.font.body.join(", "),
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: "100%",
                    letterSpacing: "-0.03em",
                    color: tokens.color.accent,
                    whiteSpace: "nowrap",
                  }}
                >
                  Start on {format(stats.startDate, "dd-MM-yyyy")}
                </span>
              </div>
            </div>

            {/* Row 2: account metrics */}
            <div className="flex items-baseline gap-5">
              <Stat value={stats.posts.toLocaleString("en-US")} label="posts" />
              <Stat value={stats.followers.toLocaleString("en-US")} label="followers" />
              <Stat value={stats.following.toLocaleString("en-US")} label="following" />
            </div>

            {/* Row 3: date filter controls */}
            <div className="pt-1" >{filterSlot}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span
        style={{
          fontFamily: tokens.font.body.join(", "),
          fontSize: 14,
          fontWeight: 700,
          lineHeight: "100%",
          letterSpacing: 0,
          color: tokens.color.textPrimary,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: tokens.font.body.join(", "),
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "100%",
          letterSpacing: 0,
          color: tokens.color.textPrimary,
        }}
      >
        {label}
      </span>
    </div>
  );
}
