"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Footer } from "@//components/common/footer";

export function MainLayout({
  children,
  title,
  description,
  image,
}: React.PropsWithChildren<{
  image: string;
  title: string;
  description: string;
}>) {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 0.2], [0, -1000]);

  return (
    <>
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </motion.div>

        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="mb-6 max-w-4xl text-5xl font-bold md:text-7xl">
                {title}
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto max-w-2xl text-xl text-muted-foreground md:text-2xl"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {children}

      <Footer />
    </>
  );
}
