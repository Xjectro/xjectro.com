"use client";

import { motion } from "framer-motion";
import { CertificateCard } from "@/components/features/about/certificate-card";
import { Certificate } from "@/types/content";
import { listVariants } from "@/utils/motion/animations";

export function CertificateGrid({
  certificates,
}: {
  certificates: Certificate[];
}) {
  return (
    <motion.div
      layout
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={listVariants}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {certificates.map((certificate, index) => (
        <CertificateCard
          key={certificate.id}
          certificate={certificate}
          index={index}
        />
      ))}
    </motion.div>
  );
}
