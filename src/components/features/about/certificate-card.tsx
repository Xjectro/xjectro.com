"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Certificate } from "@/types/content";
import { cardVariants } from "@/utils/motion/animations";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export function CertificateCard({ certificate, index }: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      id={certificate.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={certificate.imageUrl}
          alt={certificate.name}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            isHovered && "scale-110 blur-[2px]",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 transition-opacity duration-300",
            isHovered && "opacity-90",
          )}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center gap-4"
        >
          {certificate.url && (
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Certificate</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </motion.div>
      </div>

      <div className="relative space-y-4 p-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-normal">
            {certificate.platform}
          </Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            {new Date(certificate.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
