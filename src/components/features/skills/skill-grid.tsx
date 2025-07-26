"use client";

import { SkillCard } from "@/components/features/skills/skill-card";
import { Button } from "@/components/ui/button";
import { Skill } from "@/types/content";
import { useState } from "react";

const levelOrder = ["Expert", "Advanced", "Intermediate", "Beginner"];
const categories = [
  "Frontend",
  "Backend",
  "Mobile",
  "Languages",
  "Database",
  "DevOps",
  "Tools",
  "Testing",
  "Design",
  "AI/ML",
];

export function SkillGrid({ skills }: { skills: Skill[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const filteredSkills = skills
    .sort((a, b) => {
      return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
    })
    .filter((skill) => (category ? skill.category === category : true));

  return (
    <div className="flex flex-col items-start gap-10">
      <div className="flex w-full max-w-[calc(100vw-2rem)] items-center gap-2 overflow-x-auto py-2">
        <Button
          variant={category == null ? "default" : "secondary"}
          size="lg"
          onClick={() => setCategory(null)}
        >
          Show All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat == category ? "default" : "secondary"}
            size="lg"
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}
