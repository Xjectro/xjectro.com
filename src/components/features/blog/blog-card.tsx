"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@//components/ui/button";
import { cn } from "@//lib/utils";
import { Blog } from "@//types/content";

interface BlogProps {
  blog: Blog;
  index: number;
  featured?: boolean;
}

export function BlogCard({ blog, index, featured = false }: BlogProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl",
        featured && "md:col-span-2 md:row-span-2",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={blog.metadata.image || "/assets/backgrounds/blog-detail.webp"}
          alt={blog.metadata.title}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            isHovered && "scale-110 blur-[2px]",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 transition-opacity duration-300",
            isHovered && "opacity-90",
          )}
        />

        <motion.div
          initial={false}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center gap-4"
        >
          <Button asChild size="lg" variant="secondary" className="shadow-lg">
            <Link
              href={`/blogs/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Blog</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={isHovered ? { y: -10 } : { y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative space-y-4 p-6"
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            {blog.metadata.publishedAt}
          </span>
        </div>

        <div>
          <h3 className="mb-2 text-xl font-semibold leading-tight">
            {blog.metadata.title}
          </h3>
          <p className="line-clamp-2 text-muted-foreground">
            {blog.metadata.summary}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
