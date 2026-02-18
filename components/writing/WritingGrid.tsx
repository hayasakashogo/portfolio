"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Writing } from "@/lib/types";

export default function WritingGrid({ writings }: { writings: Writing[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {writings.map((article, i) => (
        <motion.a
          key={article.id}
          href={article.url ?? "#"}
          target={article.url ? "_blank" : undefined}
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="card-link group flex flex-col gap-2 rounded-md p-5 hover:bg-accent/6 duration-200"
          style={{
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--badge-border)",
          }}
        >
          {/* Date + platform */}
          <div className="flex items-center gap-3">
            <time className="text-xs tabular-nums" style={{ color: "var(--muted)" }}>
              {article.date}
            </time>
            <span
              className="rounded px-1.5 py-0.5 text-xs font-medium"
              style={{
                background: "var(--badge-bg)",
                border: "1px solid var(--badge-border)",
                color: "var(--accent)",
              }}
            >
              {article.platform}
            </span>
            <ExternalLink
              className="-mt-1 ml-auto shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              size={13}
              style={{ color: "var(--accent)" }}
            />
          </div>

          {/* Title + external link icon */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>
            </h2>
              {article.title}
          </div>

          {/* Description */}
          <p className="flex-1 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            {article.description}
          </p>

          {/* Views */}
          <p className="mt-auto flex items-center gap-1 pt-2 text-xs" style={{ color: "var(--muted)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {article.views.toLocaleString("ja-JP")} views
          </p>
        </motion.a>
      ))}
    </div>
  );
}
