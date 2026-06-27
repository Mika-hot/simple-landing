import type { Metadata, Viewport } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import EmotionRegistry from "@/theme/EmotionRegistry";
import MuiThemeProvider from "@/theme/MuiThemeProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#40AF79",
};

export const metadata: Metadata = {
  title: {
    default: "monblanproject",
    template: "%s | monblanproject",
  },
  description:
    "Mountain photography archive — 870 posts from the Alps and beyond. Browse by date, switch between grid and list views.",
  keywords: ["photography", "mountain", "Alps", "portfolio", "gallery"],
  authors: [{ name: "monblanproject" }],
  creator: "monblanproject",
  metadataBase: new URL("https://monblanproject.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://monblanproject.vercel.app",
    siteName: "monblanproject",
    title: "monblanproject — Mountain Photography",
    description:
      "870 posts from the Alps and beyond. Browse by date, switch between grid and list views.",
    images: [{ url: "/assets/Logo.svg", width: 128, height: 128, alt: "monblanproject logo" }],
  },
  twitter: {
    card: "summary",
    title: "monblanproject",
    description: "Mountain photography archive — 870 posts from the Alps.",
    images: ["/assets/Logo.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/assets/Logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body suppressHydrationWarning>
        <EmotionRegistry>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
