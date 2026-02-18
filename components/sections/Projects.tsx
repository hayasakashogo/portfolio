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
              className="card-link group flex gap-4 rounded-md p-4 hover:bg-accent/6 duration-200"
              style={{
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid var(--badge-border)",
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
