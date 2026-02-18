"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

const NAV_SECTIONS = [
  { id: "experience", label: "EXPERIENCE" },
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "projects", label: "PROJECTS" },
  { id: "writing", label: "WRITING" },
  { id: "contact", label: "CONTACT" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Fixed header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 lg:hidden"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
      >
        <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
          {profile.name}
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ color: "var(--muted)" }}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        >
          {open ? (
            // X icon
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* Overlay menu */}
      {open && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "var(--bg)" }}
        >
          <div className="flex flex-col gap-2 px-6 pt-20">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="py-4 text-left text-lg font-medium tracking-widest uppercase transition-colors"
                style={{
                  color: "var(--text)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {label}
              </button>
            ))}
            <a
              href="/projects"
              className="py-4 text-left text-sm transition-colors"
              style={{ color: "var(--muted)" }}
              onClick={() => setOpen(false)}
            >
              All Projects →
            </a>
            <a
              href="/writing"
              className="py-4 text-left text-sm transition-colors"
              style={{ color: "var(--muted)" }}
              onClick={() => setOpen(false)}
            >
              All Writing →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
