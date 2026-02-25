"use client";

import { useRef, useState } from "react";

export default function ProjectLinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<"idle" | "in" | "out">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState("in");
  };

  const handleMouseLeave = () => {
    setState("out");
    timerRef.current = setTimeout(() => setState("idle"), 300);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-1 items-center justify-center overflow-hidden py-3 text-sm"
      style={{
        background: "var(--badge-bg)",
        color: state === "in" ? "var(--bg)" : "var(--accent)",
        transition: "color 0.2s",
      }}
    >
      <span
        className="absolute inset-0"
        style={{
          background: "var(--accent)",
          transform:
            state === "in"
              ? "translateX(0)"
              : state === "out"
                ? "translateX(100%)"
                : "translateX(-100%)",
          transition: state === "idle" ? "none" : "transform 0.3s ease-out",
        }}
      />
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </a>
  );
}
