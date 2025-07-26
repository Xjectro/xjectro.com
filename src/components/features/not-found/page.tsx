"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function NotFoundPage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex h-screen flex-col items-center justify-center px-4">
        <div className="z-9 absolute inset-0">
          <Image
            src="/assets/backgrounds/homescreen.webp"
            alt="not found background"
            fill
            priority
            quality={80}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1
              className="mb-4 text-7xl font-bold text-primary drop-shadow-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              404
            </motion.h1>
            <motion.h2
              className="mb-2 text-2xl font-semibold text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Page Not Found
            </motion.h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 mt-4 text-lg text-muted-foreground"
          >
            The page you are looking for does not exist or may have been moved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/"
              className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/80"
            >
              Return to Homepage
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
