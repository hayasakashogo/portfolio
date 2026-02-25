"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProjectLinkButton from "@/components/projects/ProjectLinkButton";
import type { Project } from "@/lib/types";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="flex flex-col overflow-hidden rounded-md"
          style={{
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border: "1px solid var(--badge-border)",
          }}
        >
          {/* Thumbnail */}
          {project.thumbnail ? (
            project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-3/2 w-full overflow-hidden block"
              >
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </a>
            ) : (
              <div className="relative aspect-3/2 w-full overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            )
          ) : (
            <div
              className="flex aspect-3/2 w-full items-center justify-center"
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
            <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              {project.name}
            </h2>
            <p className="flex-1 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Link buttons */}
          {(project.url || project.github) && (
            <div
              className="flex"
              style={{ borderTop: "1px solid var(--badge-border)" }}
            >
              {project.url && (
                <ProjectLinkButton href={project.url}>
                  <ExternalLink size={13} />
                  App
                </ProjectLinkButton>
              )}
              {project.url && project.github && (
                <div style={{ width: 1, background: "var(--badge-border)" }} />
              )}
              {project.github && (
                <ProjectLinkButton href={project.github}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </ProjectLinkButton>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
