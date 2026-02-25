"use client";

import { useRef, useState } from "react";

export default function SlideButton({
  type = "button",
  onClick,
  disabled,
  animate = true,
  fillColor = "var(--accent)",
  borderColor = "var(--accent)",
  textColor = "var(--accent)",
  padding = "0.625rem 1.5rem",
  borderRadius = "4px",
  children,
}: {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  animate?: boolean;
  fillColor?: string;
  borderColor?: string;
  textColor?: string;
  padding?: string;
  borderRadius?: string;
  children: React.ReactNode;
}) {
  const [hoverState, setHoverState] = useState<"idle" | "in" | "out">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = () => {
    if (disabled || !animate) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoverState("in");
  };

  const handleMouseLeave = () => {
    if (disabled || !animate) return;
    setHoverState("out");
    timerRef.current = setTimeout(() => setHoverState("idle"), 300);
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--badge-bg)",
        border: `1px solid ${disabled ? "var(--muted)" : borderColor}`,
        color: disabled ? "var(--muted)" : animate && hoverState === "in" ? "var(--bg)" : textColor,
        padding,
        borderRadius,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "0.875rem",
        fontWeight: 500,
        transition: "color 0.2s",
      }}
    >
      {animate && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: fillColor,
            transform:
              hoverState === "in"
                ? "translateX(0)"
                : hoverState === "out"
                  ? "translateX(100%)"
                  : "translateX(-100%)",
            transition: hoverState === "idle" ? "none" : "transform 0.3s ease-out",
          }}
        />
      )}
      <span style={{ position: "relative", zIndex: 10 }}>{children}</span>
    </button>
  );
}
