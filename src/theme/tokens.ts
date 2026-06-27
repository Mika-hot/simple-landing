// Single source of truth — all values extracted from figma_data.json
export const tokens = {
  color: {
    gradientFrom: "#40AF79",
    gradientTo: "#124757",
    logoAccentDark: "#066C61",
    logoAccentLight: "#B3DBC9",
    accent: "#3D8EDA",
    textPrimary: "#000000",
    textMuted: "#636163",
    textDisabled: "#919191",
    border: "#EBEBEB",
    inputBorder: "#DEDEDE",
    iconInactive: "#C8C7C7",
    iconMuted: "#5F5F5F",
    loadMore: "#929292",
    headerBg: "rgba(255,255,255,0.67)",
    white: "#ffffff",
    surface: "#f9f9f9",
    bgLoadMore: "#F5F5F5",
  },
  shadow: {
    // Figma: drop 0 4px 24px #0000001F + inset 0 12px 24px #0000001F
    header: "0px 4px 24px 0px rgba(0,0,0,0.122), inset 0px 12px 24px 0px rgba(0,0,0,0.122)",
    card: "0 2px 8px rgba(0,0,0,0.08)",
  },
  font: {
    brand: ["Montserrat", "sans-serif"],
    body: ["Roboto", "sans-serif"],
  },
  fontSize: {
    logo: "24px",
    stats: "14px",
    label: "13px",
    date: "16px",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  borderRadius: {
    input: "2px",
    card: "4px",
    logo: "25px",
  },
  spacing: {
    headerH: "172px",
  },
} as const;
