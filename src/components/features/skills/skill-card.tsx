"use client";

import { motion } from "framer-motion";
import { Skill } from "@//types/content";
import { cn } from "@//lib/utils";
import { Badge } from "@//components/ui/badge";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex items-center">
        <div className="mr-4 text-4xl">{skill.icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{skill.name}</h3>
          <Badge
            variant="secondary"
            className={cn(
              "font-normal",
              skill.level === "Expert" &&
                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
              skill.level === "Advanced" &&
                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
              skill.level === "Intermediate" &&
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
              skill.level === "Beginner" &&
                "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
            )}
          >
            {skill.level}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{skill.description}</p>
    </motion.div>
  );
}
