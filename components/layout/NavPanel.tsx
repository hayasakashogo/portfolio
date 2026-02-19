"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_SECTIONS = [
  { id: "experience", label: "EXPERIENCE" },
  { id: "skills", label: "SKILLS" },
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "projects", label: "PROJECTS" },
  { id: "writing", label: "WRITING" },
  { id: "contact", label: "CONTACT" },
];

export default function NavPanel() {
  const [active, setActive] = useState<string>("experience");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="flex flex-col gap-1">
      {NAV_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-3 py-2 text-sm font-medium transition-all duration-200"
            style={{ color: isActive ? "var(--text)" : "var(--muted)" }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span
              className="h-px transition-all duration-200"
              style={{
                width: isActive ? "2rem" : "1rem",
                background: isActive ? "var(--accent)" : "var(--muted)",
              }}
            />
            <span className="tracking-widest text-xs uppercase">{label}</span>
          </a>
        );
      })}

      <div className="mt-8 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <Link
          href="/projects"
          className="block py-1.5 text-xs transition-colors"
          style={{ color: "var(--accent)" }}
        >
          All Projects →
        </Link>
        <Link
          href="/writing"
          className="block py-1.5 text-xs transition-colors"
          style={{ color: "var(--accent)" }}
        >
          All Writing →
        </Link>
      </div>
    </nav>
  );
}
