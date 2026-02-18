"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";

const PREVIEW_COUNT = 4;

export default function Projects() {
  const preview = projects.slice(0, PREVIEW_COUNT);

  return (
    <section id="projects" className="mb-24">
      <SectionLabel>Projects</SectionLabel>

      <div className="flex flex-col gap-5">
        {preview.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <a
              href={project.url ?? "#"}
              target={project.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex gap-4 rounded-xl p-4 transition-colors"
              style={{
                background: "var(--bg-sub)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Thumbnail */}
              {project.thumbnail && (
                <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={project.thumbnail}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {project.name}
                  </h3>
                  {/* Stars */}
                  <span className="flex flex-shrink-0 items-center gap-1 text-xs tabular-nums" style={{ color: "var(--muted)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {project.stars}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 text-right"
      >
        <Link
          href="/projects"
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          View more →
        </Link>
      </motion.div>
    </section>
  );
}
