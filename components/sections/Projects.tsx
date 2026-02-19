"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";

const PREVIEW_COUNT = 4;

export default function Projects() {
  const preview = projects.slice(0, PREVIEW_COUNT);

  return (
    <section id="projects" className="mb-24">
      <SectionLabel>Projects</SectionLabel>

      {/* SP: 2-column card grid / lg: list */}
      <div className="grid grid-cols-1 gap-4 lg:flex lg:flex-col lg:gap-5">
        {preview.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.url ?? "#"}
            target={project.url ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card-link group flex flex-col overflow-hidden rounded-md duration-200 lg:flex-row lg:gap-4 lg:p-4"
            style={{
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "1px solid var(--badge-border)",
            }}
          >
            {/* Thumbnail */}
            {project.thumbnail ? (
              <div className="relative h-28 w-full flex-shrink-0 overflow-hidden lg:h-20 lg:w-32 lg:rounded-lg">
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
            ) : (
              <div
                className="flex h-28 w-full flex-shrink-0 items-center justify-center lg:h-20 lg:w-32 lg:rounded-lg"
                style={{ background: "var(--border)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted)" }}>
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
            )}

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 lg:p-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm font-semibold" style={{ color: "var(--text)" }}>
                  {project.name}
                </h3>
                <ExternalLink
                  className="-mt-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  size={12}
                  style={{ color: "var(--accent)" }}
                />
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
          </motion.a>
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
