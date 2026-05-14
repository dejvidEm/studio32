import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import StructuredData from "./components/seo/StructuredData";
import { getSiteUrl, getSiteName } from "@/lib/site";
import { DEFAULT_META_DESCRIPTION_SK } from "@/lib/seo-text";

const siteUrl = getSiteUrl();
const siteName = getSiteName();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — digitálny dizajn, branding a web`,
    template: `%s | ${siteName}`,
  },
  description: DEFAULT_META_DESCRIPTION_SK,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "design",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/images/logo/favicon.svg", type: "image/svg+xml" },
    ],
    other: [{ rel: "mask-icon", url: "/images/logo/favicon.svg", color: "#1F2A2E" }],
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName,
    title: `${siteName} — digitálny dizajn, branding a web`,
    description: DEFAULT_META_DESCRIPTION_SK,
    images: [{ url: "/images/logo/final.svg", width: 512, height: 512, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — digitálny dizajn a branding`,
    description: DEFAULT_META_DESCRIPTION_SK,
    ...(process.env.NEXT_PUBLIC_TWITTER_HANDLE
      ? { site: `@${process.env.NEXT_PUBLIC_TWITTER_HANDLE.replace(/^@/, "")}` }
      : {}),
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.trim(),
        },
      }
    : {}),
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
    <html lang="sk" suppressHydrationWarning>
      <body className={manrope.className}>
        <StructuredData />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
