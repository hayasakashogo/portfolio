export const dynamic = "force-dynamic";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { getProjects } from "@/lib/data";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata = {
  title: "Projects — Shogo Hayasaka",
  description: "Shogo Hayasakaのプロジェクト一覧",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="min-h-screen">
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

        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
