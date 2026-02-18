"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/lib/types";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <motion.a
          key={project.id}
          href={project.url ?? "#"}
          target={project.url ? "_blank" : undefined}
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="card-link group flex flex-col overflow-hidden rounded-md hover:bg-accent/6 duration-200"
          style={{
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--badge-border)",
          }}
        >
          {/* Thumbnail */}
          {project.thumbnail ? (
            <div className="relative h-44 w-full overflow-hidden">
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
              className="flex h-44 w-full items-center justify-center"
              style={{ background: "var(--border)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted)" }}>
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
          )}

          {/* Content */}
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                {project.name}
              </h2>
              <ExternalLink
                className="-mt-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                size={12}
                style={{ color: "var(--accent)" }}
              />
            </div>
            <p className="flex-1 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
