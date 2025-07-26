"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/features/project/project-card";
import { Project } from "@/types/content";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          featured={index === 0}
          index={index}
        />
      ))}
    </motion.div>
  );
}
