import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "markdown/blogs");

export function getBlogsSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getBlogsBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    // [key: string]: string;
    [key: string]: string | object;
  };

  const items: any = {};

  function escapeHtmlAttr(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function processImages(content: string) {
    return content.replace(/!\[(.*?)\]\((.*?)\)/g, (_match, alt, src) => {
      const safeAlt = escapeHtmlAttr(String(alt).trim());
      return `<img src="${src}" alt="${safeAlt}" />`;
    });
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      // You can modify the content here to include images
      items[field] = processImages(content);
    }

    if (field === "metadata") {
      // Include metadata, including the image information
      items[field] = { ...data, coverImage: data.coverImage || null };
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllBlogs(fields: string[] = []) {
  const slugs = getBlogsSlugs();
  const blogs = slugs
    .map((slug) => getBlogsBySlug(slug, fields))

  return blogs;
}
