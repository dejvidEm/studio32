import type { MetadataRoute } from "next";
import { getSiteName } from "@/lib/site";
import { DEFAULT_META_DESCRIPTION_SK } from "@/lib/seo-text";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: getSiteName(),
    short_name: "Studio32",
    description: DEFAULT_META_DESCRIPTION_SK,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#1F2A2E",
  };
}
