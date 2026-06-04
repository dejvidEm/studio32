import type { MetadataRoute } from "next";
import { getSiteName, getSiteUrl } from "@/lib/site";
import { DEFAULT_META_DESCRIPTION_SK } from "@/lib/seo-text";

export default function manifest(): MetadataRoute.Manifest {
  const siteName = getSiteName();

  return {
    name: `${siteName} — digitálny dizajn a branding`,
    short_name: siteName,
    description: DEFAULT_META_DESCRIPTION_SK,
    start_url: "/",
    scope: "/",
    lang: "sk",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1F2A2E",
    icons: [
      {
        src: "/images/logo/favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
    ],
    id: getSiteUrl(),
  };
}
