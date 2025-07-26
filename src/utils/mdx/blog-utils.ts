import { getMDXData } from "@//utils/mdx/mdx-utils";
import path from "path";

export function getBlogs() {
  return getMDXData(path.join(process.cwd(), "content"));
}

export function getBlogBySlug(slug: string) {
  const blogs = getBlogs();
  return blogs.find((blog) => blog.slug === slug);
}
