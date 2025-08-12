"use client";

import { motion } from "framer-motion";
import { Star, GitCommit, Github } from "lucide-react";
import Image from "next/image";
import { socialLinks } from "@/constants/social";
import Link from "next/link";

export function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex h-screen flex-col items-center justify-center px-4">
        <div className="z-9 absolute inset-0">
          <Image
            src="/assets/backgrounds/homescreen.webp"
            alt="xjectro website home background"
            fill
            priority
            quality={100}
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 flex w-full items-center justify-center gap-6"
            >
              <div className="flex items-center gap-2 rounded-lg px-3 py-1 shadow">
                <Star size={22} className="text-yellow-400" />
                <span className="font-semibold">160+</span>
                <span className="text-sm text-muted-foreground">Stars</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg px-3 py-1 shadow">
                <GitCommit size={22} className="text-emerald-500" />
                <span className="font-semibold">500+</span>
                <span className="text-sm text-muted-foreground">Commits</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg px-3 py-1 shadow">
                <Github size={22} className="text-blue-500" />
                <span className="font-semibold">20+</span>
                <span className="text-sm text-muted-foreground">Repos</span>
              </div>
            </motion.div>
            <motion.h1
              className="text-5xl font-bold text-primary md:text-7xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              Eray Günüuygun
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground md:text-2xl"
          >
            Full-stack developer crafting elegant solutions through clean code
            and intuitive design.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            {socialLinks.map((social) => (
              <Link
                passHref
                target="_blank"
                href={social.url}
                className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/50"
                key={social.name}
              >
                <social.icon width="30" height="30" />
              </Link>
            ))}
          </motion.p>
        </div>
      </section>
    </main>
  );
}
