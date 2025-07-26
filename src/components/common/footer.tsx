"use client";

import React from "react";
import { motion } from "framer-motion";
import { socialLinks } from "@/constants/social";
import Link from "next/link";
import { projects } from "@/constants/projects";
import { navigationItems } from "@/constants/navigation";
import { apps } from "@/constants/apps";

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Footer() {
  return (
    <div className="container py-20">
      <footer>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={listVariants}
          >
            <h3 className="mb-4 font-bold">Navigation</h3>
            <motion.ul
              className="space-y-4 text-muted-foreground"
              variants={listVariants}
            >
              {navigationItems.map((item) => (
                <motion.li
                  key={item.label}
                  className="font-medium hover:text-primary"
                  variants={itemVariants}
                >
                  <Link passHref target="_blank" href={item.path}>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={listVariants}
          >
            <h3 className="mb-4 font-bold">Projects</h3>
            <motion.ul
              className="space-y-4 text-muted-foreground"
              variants={listVariants}
            >
              {projects.map((project) => (
                <motion.li
                  key={project.slug}
                  className="font-medium hover:text-primary"
                  variants={itemVariants}
                >
                  <Link passHref target="_blank" href="/projects">
                    {project.title}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={listVariants}
          >
            <h3 className="mb-4 font-bold">Apps</h3>
            <motion.ul
              className="space-y-4 text-muted-foreground"
              variants={listVariants}
            >
              {apps.map((app) => (
                <motion.li
                  key={app.name}
                  className="font-medium hover:text-primary"
                  variants={itemVariants}
                >
                  <Link passHref target="_blank" href={app.href}>
                    {app.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
        <div className="mt-10 gap-10">
          <div className="grid gap-8 lg:grid-cols-4 lg:flex-row">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={listVariants}
              className="col-span-3"
            >
              <p className="mb-3 font-bold">Follow us</p>
              <motion.ul
                className="flex items-center gap-2 text-muted-foreground"
                variants={listVariants}
              >
                <motion.li
                  className="flex items-center justify-center gap-4"
                  variants={itemVariants}
                >
                  {socialLinks.map((social) => (
                    <Link
                      passHref
                      target="_blank"
                      href={social.url}
                      className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary"
                      key={social.name}
                    >
                      <social.icon width="30" height="30" />
                    </Link>
                  ))}
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
        <div className="mt-24 border-t pt-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-sm font-medium text-muted-foreground"
          >
            © {new Date().getFullYear()}{" "}
            {new URL(process.env.NEXT_PUBLIC_BASE_URL!).host}. All rights
            reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
