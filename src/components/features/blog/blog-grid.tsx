"use client";

import { motion } from "framer-motion";
import { BlogCard } from "./blog-card";
import { Blog } from "@/types/content";

interface BlogGridProps {
  blogs: Blog[];
}

export function BlogGrid({ blogs }: BlogGridProps) {
  const sortedBlogs = [...blogs].sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {sortedBlogs.map((blog, index) => (
        <BlogCard
          key={blog.slug}
          blog={blog}
          featured={index === 0}
          index={index}
        />
      ))}
    </motion.div>
  );
}
