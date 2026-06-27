import type { Config } from "tailwindcss";
import { tokens } from "./src/theme/tokens";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  // Keep Tailwind layout utilities without conflicting with MUI component styles
  corePlugins: {
    preflight: false, // MUI provides its own CSS baseline
  },
  theme: {
    extend: {
      colors: {
        brand: {
          from: tokens.color.gradientFrom,
          to: tokens.color.gradientTo,
          accentDark: tokens.color.logoAccentDark,
          accentLight: tokens.color.logoAccentLight,
        },
        accent: tokens.color.accent,
        muted: tokens.color.textMuted,
        disabled: tokens.color.textDisabled,
        border: tokens.color.border,
        inputBorder: tokens.color.inputBorder,
        iconInactive: tokens.color.iconInactive,
        iconMuted: tokens.color.iconMuted,
        loadMore: tokens.color.loadMore,
        surface: tokens.color.surface,
      },
      fontFamily: {
        brand: [...tokens.font.brand],
        body: [...tokens.font.body],
      },
      boxShadow: {
        header: tokens.shadow.header,
        card: tokens.shadow.card,
      },
      backdropBlur: {
        header: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
