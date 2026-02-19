"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";

export default function Certifications() {
  return (
    <section id="certifications" className="mb-24">
      <SectionLabel>Certifications</SectionLabel>

      <div className="flex flex-col gap-6">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-md p-5 transition-colors"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "1px solid var(--badge-border)",
            }}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>
                {cert.name}
              </h3>
              <span className="flex-shrink-0 text-xs tabular-nums" style={{ color: "var(--muted)" }}>
                {cert.year}
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {cert.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {cert.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
