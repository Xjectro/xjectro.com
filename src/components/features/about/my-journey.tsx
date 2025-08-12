"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { fadeInUp, staggerChildren } from "@/utils/motion/animations";

export function MyJourney() {
  return (
    <Section>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren(0.2)}
        >
          <motion.h2 variants={fadeInUp()} className="mb-6 text-3xl font-bold">
            My Journey
          </motion.h2>
          <motion.p
            variants={fadeInUp()}
            className="mb-6 text-xl text-muted-foreground"
          >
            I&apos;m a passionate full-stack developer with expertise in
            creating beautiful, functional, and user-centered digital
            experiences.
          </motion.p>
          <motion.p
            variants={fadeInUp()}
            className="mb-6 text-muted-foreground"
          >
            With over 7 years of experience, I&apos;ve worked on diverse
            projects ranging from e-commerce platforms to enterprise
            applications. I specialize in modern web technologies and love
            solving complex problems through clean, efficient code.
          </motion.p>
        </motion.div>

        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src="/assets/images/me.webp"
            alt="Developer portrait"
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>
    </Section>
  );
}
