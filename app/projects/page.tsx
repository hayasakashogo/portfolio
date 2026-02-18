import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Projects — Taro Yamada",
  description: "Taro Yamadaのプロジェクト一覧",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            ← Back
          </Link>
        </div>

        <SectionLabel>All Projects</SectionLabel>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url ?? "#"}
              target={project.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-xl transition-opacity hover:opacity-90"
              style={{
                background: "var(--bg-sub)",
                border: "1px solid var(--border)",
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
                  <span className="flex flex-shrink-0 items-center gap-1 text-xs tabular-nums" style={{ color: "var(--muted)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {project.stars}
                  </span>
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
