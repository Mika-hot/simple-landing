"use client";

import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { tokens } from "./tokens";

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.color.gradientFrom,
      dark: tokens.color.gradientTo,
      contrastText: tokens.color.white,
    },
    secondary: {
      main: tokens.color.accent,
      contrastText: tokens.color.white,
    },
    text: {
      primary: tokens.color.textPrimary,
      secondary: tokens.color.textMuted,
      disabled: tokens.color.textDisabled,
    },
    divider: tokens.color.border,
    background: {
      default: tokens.color.surface,
      paper: tokens.color.white,
    },
  },
  typography: {
    fontFamily: tokens.font.body.join(", "),
    fontWeightRegular: tokens.fontWeight.regular,
    fontWeightMedium: tokens.fontWeight.medium,
    fontWeightBold: tokens.fontWeight.bold,
    h1: {
      fontFamily: tokens.font.brand.join(", "),
      fontWeight: tokens.fontWeight.medium,
      fontSize: tokens.fontSize.logo,
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: tokens.font.body.join(", "),
          fontWeight: tokens.fontWeight.medium,
          letterSpacing: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: tokens.fontSize.label,
          fontFamily: tokens.font.body.join(", "),
          backgroundColor: tokens.color.border,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.color.border,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.color.accent,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.color.accent,
          },
        },
        input: {
          padding: "6px 10px",
          height: "auto",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: tokens.fontSize.label,
          color: tokens.color.textMuted,
        },
      },
    },
  },
});

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
