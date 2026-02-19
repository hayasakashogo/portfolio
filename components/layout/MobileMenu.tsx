"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_SECTIONS = [
  { id: "experience", label: "EXPERIENCE" },
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "projects", label: "PROJECTS" },
  { id: "writing", label: "WRITING" },
  { id: "contact", label: "CONTACT" },
];

const LINKS = [
  { href: "/projects", label: "All Projects →" },
  { href: "/writing", label: "All Writing →" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const allItems = [
    ...NAV_SECTIONS.map((s) => ({ type: "button" as const, ...s })),
    ...LINKS.map((l) => ({ type: "link" as const, ...l })),
  ];

  return (
    <>
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-end px-4 py-3 lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300"
          style={{
            color: "var(--accent)",
            ...(open ? {} : {
              background: "var(--glass-bg)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              // border: "1px solid var(--glass-border)",
            }),
          }}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg
                key="close"
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="hamburger"
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </header>

      {/* Overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 lg:hidden"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              borderBottom: "1px solid var(--glass-border)",
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-2 px-6 pt-20">
              {allItems.map((item, i) => (
                <motion.div
                  key={item.type === "button" ? item.id : item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.2, ease: "easeOut" }}
                >
                  {item.type === "button" ? (
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="w-full py-4 text-left text-lg font-medium tracking-widest uppercase transition-colors"
                      style={{
                        color: "var(--text)",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="block py-4 text-left text-sm transition-colors"
                      style={{ color: "var(--accent)" }}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
