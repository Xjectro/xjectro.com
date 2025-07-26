import { getBlogs } from "@//utils/mdx/blog-utils";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  let blogs = getBlogs().map((blog) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`,
    lastModified: blog.metadata.publishedAt,
  }));

  let routes = [
    "",
    "/about",
    "/skills",
    "/projects",
    "/contact",
    `/blogs`,
    "/apps/driving-license-age-calculation",
    "/apps/color-converter",
  ].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
