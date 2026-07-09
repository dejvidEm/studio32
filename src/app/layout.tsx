import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import StructuredData from "./components/seo/StructuredData";
import { getSiteUrl, getSiteName } from "@/lib/site";
import {
  DEFAULT_META_DESCRIPTION_SK,
  DEFAULT_META_TITLE_SK,
  DEFAULT_OG_IMAGE,
  SITE_KEYWORDS,
} from "@/lib/seo-text";

const siteUrl = getSiteUrl();
const siteName = getSiteName();
const defaultOgImage = new URL(DEFAULT_OG_IMAGE, siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${DEFAULT_META_TITLE_SK}`,
    template: `%s | ${siteName}`,
  },
  description: DEFAULT_META_DESCRIPTION_SK,
  keywords: [...SITE_KEYWORDS],
  alternates: {
    canonical: "/",
  },
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "design",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    title: `${siteName} — ${DEFAULT_META_TITLE_SK}`,
    description: DEFAULT_META_DESCRIPTION_SK,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteName} — logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${DEFAULT_META_TITLE_SK}`,
    description: DEFAULT_META_DESCRIPTION_SK,
    images: [defaultOgImage],
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
        <noscript>
          {/* Without JS the white panel could never roll up, so never let it cover content. */}
          <style>{`.preloader-root{display:none !important}html.preloader-active,html.preloader-active body{overflow:auto !important}`}</style>
        </noscript>
        <StructuredData />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
