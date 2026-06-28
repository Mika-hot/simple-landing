"use client";

import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import Popover from "@mui/material/Popover";
import { format } from "date-fns";
import { tokens } from "@/theme/tokens";

interface DateRangeFilterProps {
  from: Date | null;
  to: Date | null;
  onFromChange: (date: Date | null) => void;
  onToChange: (date: Date | null) => void;
}

// ─── Static SVG icons ─────────────────────────────────────────────────────────

// bx:bx-calendar — official Boxicons path, viewBox 0 0 24 24, rendered at 18×20
function CalendarSvg() {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 24 24"
      fill={tokens.color.iconMuted}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z" />
      <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z" />
    </svg>
  );
}

// bx:bx-plus rotated 45° — renders as an × close icon, 14×14
function XSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(45 7 7)">
        <path d="M7 1V13" stroke={tokens.color.iconMuted} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M1 7H13" stroke={tokens.color.iconMuted} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ─── Shared constants ─────────────────────────────────────────────────────────

const ICON_BG = tokens.color.bgLoadMore; // #F5F5F5

// ─── Custom picker input ──────────────────────────────────────────────────────

interface PickerProps {
  value: Date | null;
  onChange: (d: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder: string;
  style?: React.CSSProperties;
}

function CustomDatePicker({ value, onChange, minDate, maxDate, placeholder, style }: PickerProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      {/*
        DOM structure per spec:
        [text/value · flex-1] [×-btn 24×24] [cal-btn 24×24]
        Total width: 162px, height: 28px
      */}
      <div
        ref={anchorRef}
        style={{
          width: 162,
          height: 28,
          display: "flex",
          alignItems: "center",
          border: `1px solid ${tokens.color.inputBorder}`,
          borderRadius: 4,
          backgroundColor: tokens.color.white,
          overflow: "hidden",
          flexShrink: 0,
          ...style,
        }}
      >
        {/* Left: text / value — click opens calendar */}
        <span
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
          style={{
            flex: 1,
            paddingLeft: 8,
            fontSize: 13,
            fontFamily: tokens.font.body.join(", "),
            color: value ? tokens.color.textPrimary : tokens.color.textMuted,
            lineHeight: "28px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          {value ? format(value, "d-MM-yyyy") : placeholder}
        </span>

        {/* Right: two static 24×24 icon containers */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0, height: "100%" }}>
          {/* ① Clear (×) — always rendered; dimmed when no value */}
          <button
            type="button"
            aria-label="clear date"
            onClick={() => {
              if (value) onChange(null);
            }}
            style={{
              width: 24,
              height: 24,
              background: ICON_BG,
              border: "none",
              borderLeft: `1px solid ${tokens.color.inputBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: value ? "pointer" : "default",
              opacity: value ? 1 : 0.4,
              padding: 0,
              flexShrink: 0,
            }}
          >
            <XSvg />
          </button>

          {/* ② Calendar trigger — always rendered, flush right */}
          <button
            type="button"
            aria-label="open calendar"
            onClick={() => setOpen(true)}
            style={{
              width: 24,
              height: 24,
              background: ICON_BG,
              border: "none",
              borderLeft: `1px solid ${tokens.color.inputBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <CalendarSvg />
          </button>
        </div>
      </div>

      {/* Calendar popup — LocalizationProvider must be inside Portal */}
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ style: { marginTop: 4, borderRadius: 4 } }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={value}
            onChange={(d) => {
              onChange(d);
              setOpen(false);
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      </Popover>
    </>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export default function DateRangeFilter({
  from,
  to,
  onFromChange,
  onToChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span
        style={{
          fontFamily: tokens.font.body.join(", "),
          fontSize: tokens.fontSize.date,
          fontWeight: tokens.fontWeight.regular,
          color: tokens.color.textPrimary,
        }}
      >
        Date
      </span>

      <CustomDatePicker
        value={from}
        onChange={onFromChange}
        maxDate={to ?? undefined}
        placeholder="from"
      />

      <CustomDatePicker
        value={to}
        onChange={onToChange}
        minDate={from ?? undefined}
        placeholder="to"
        style={{ marginLeft: 8 }}
      />
    </div>
  );
}
