"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import {
  fadeInUp,
  staggerChildren,
  cardHover,
} from "@/utils/motion/animations";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Building2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { workExperiences } from "@/constants/work-experiences";

export function WorkExperience() {
  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren(0.2)}
        className="grid gap-12"
      >
        <motion.div variants={fadeInUp()} className="w-full space-y-8">
          <h2 className="text-3xl font-bold">Work Experience</h2>

          <div className="relative">
            <div className="absolute bottom-0 left-8 top-0 hidden w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent md:block" />

            <div className="space-y-8">
              {workExperiences.map((value, index) => (
                <motion.div
                  key={index}
                  variants={cardHover}
                  className="group relative"
                >
                  <div className="sticky top-24 z-10 ml-6 hidden h-4 w-4 rounded-full border-4 border-background bg-primary shadow-lg transition-transform duration-300 group-hover:scale-125 md:block" />

                  <div className="rounded-lg border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 md:ml-16">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                            {value.company}
                          </h3>
                        </div>
                        <p className="text-base font-medium text-muted-foreground underline">
                          {value.position}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 text-sm sm:items-end">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />
                          <span>{value.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{value.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-foreground">
                        Technologies & Tools:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {value.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary transition-colors hover:bg-primary/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border/50 pt-4">
                      <Link href={`/projects#${value.relativeProjectId}`}>
                        <Button variant="outline">
                          View related project <ExternalLink />
                        </Button>
                      </Link>
                      <Link href={value.liveUrl} target="_blank">
                        <Button variant="outline">
                          Visit live site <ExternalLink />
                        </Button>
                      </Link>
                      {value.linkedinUrl && (
                        <Link href={value.linkedinUrl} target="_blank">
                          <Button variant="outline">
                            Linkedin <ExternalLink />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
