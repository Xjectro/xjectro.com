"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/constants/navigation";

const headerVariants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 20,
    },
  },
};

const navItemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      delay: 0.2,
    },
  },
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    blockSize: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    opacity: 1,
    blockSize: "auto",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40,
    },
  },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={headerVariants}
      className={cn(
        "fixed top-0 z-50 w-full transition-colors",
        isScrolled || mobileMenuOpen
          ? "border-b bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative z-10">
            <motion.div
              variants={navItemVariants}
              className="flex items-center gap-2"
            >
              <span className="rounded-md bg-primary p-1 text-primary-foreground">
                XJ
              </span>
              <span className="hidden font-bold sm:inline">Xjectro</span>
            </motion.div>
          </Link>

          <nav className="hidden md:block">
            <motion.ul
              variants={navItemVariants}
              className="flex items-center gap-8"
            >
              {navigationItems.map((item) => (
                <motion.li key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      "relative px-1 py-2 text-sm font-medium transition-colors",
                      pathname === item.path
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    {item.label}
                    {pathname === item.path && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-10 md:hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="border-b bg-background/95 backdrop-blur-sm md:hidden"
          >
            <nav className="container mx-auto py-4">
              <ul className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        "block py-2 text-lg font-medium transition-colors",
                        pathname === item.path
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
