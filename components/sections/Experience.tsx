"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";

export default function Experience() {
  return (
    <section id="experience" className="mb-24">
      <SectionLabel>Experience</SectionLabel>

      <div className="flex flex-col gap-10">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="grid gap-4 rounded-md p-5 sm:grid-cols-[120px_1fr]"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border: "1px solid var(--badge-border)",
          }}
          >
            {/* Period */}
            <div className="pt-0.5">
              <p className="text-xs leading-5" style={{ color: "var(--muted)" }}>
                {exp.period}
              </p>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  {exp.role}
                  {exp.company && (
                    <span style={{ color: "var(--muted)" }}> · {exp.company}</span>
                  )}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
