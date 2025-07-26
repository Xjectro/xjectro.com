"use client";

import { motion } from "framer-motion";
import { Section } from "@//components/ui/section";
import {
  fadeInUp,
  staggerChildren,
  cardHover,
} from "@//utils/motion/animations";

export function Overview() {
  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren(0.2)}
        className="grid gap-12 md:grid-cols-2"
      >
        <motion.div variants={fadeInUp()} className="space-y-8">
          <h2 className="text-3xl font-bold">Core Values</h2>
          <div className="grid gap-6">
            {[
              {
                title: "Quality First",
                description: "Delivering excellence in every line of code.",
              },
              {
                title: "Continuous Learning",
                description: "Always staying updated with latest technologies.",
              },
              {
                title: "User-Centric",
                description: "Creating solutions that solve real problems.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={cardHover}
                className="transform rounded-lg border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp(0.2)} className="space-y-8">
          <h2 className="text-3xl font-bold">Technical Skills</h2>
          <div className="space-y-6">
            {[
              { name: "Frontend Development", level: 95 },
              { name: "Backend Development", level: 85 },
              { name: "UI/UX Design", level: 80 },
              { name: "Database Management", level: 90 },
              { name: "DevOps & Deployment", level: 85 },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>{skill.name}</span>
                  <span className="text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
