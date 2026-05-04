import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Studio32",
};

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <ClientProviders>{children}</ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
