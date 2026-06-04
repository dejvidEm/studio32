import type { MetadataRoute } from "next";
import fs from "fs";
import { join } from "path";
import { getSiteUrl } from "@/lib/site";
import { getPostSlugs } from "@/lib/markdown";
import { getBlogsSlugs } from "@/lib/blogmarkdown";

function lastModifiedForFile(relativePath: string): Date {
  try {
    const full = join(process.cwd(), relativePath);
    return fs.statSync(full).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticPaths: {
    path: string;
    priority: number;
    frequency: MetadataRoute.Sitemap[0]["changeFrequency"];
    file?: string;
  }[] = [
    { path: "/", priority: 1, frequency: "weekly" },
    { path: "/about", priority: 0.9, frequency: "monthly" },
    { path: "/contact", priority: 0.9, frequency: "monthly" },
    { path: "/projects", priority: 0.95, frequency: "weekly" },
    { path: "/blog", priority: 0.85, frequency: "weekly" },
    { path: "/privacy-policy", priority: 0.3, frequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.3, frequency: "yearly" },
    { path: "/license-terms", priority: 0.3, frequency: "yearly" },
  ];

  const urls: MetadataRoute.Sitemap = staticPaths.map(({ path, priority, frequency }) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: frequency,
    priority,
  }));

  for (const file of getPostSlugs()) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/u, "");
    urls.push({
      url: `${base}/projects/${slug}`,
      lastModified: lastModifiedForFile(`markdown/projects/${file}`),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  for (const file of getBlogsSlugs()) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/u, "");
    urls.push({
      url: `${base}/blog/${slug}`,
      lastModified: lastModifiedForFile(`markdown/blogs/${file}`),
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return urls;
}
