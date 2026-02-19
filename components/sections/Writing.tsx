"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { writings } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";

const PREVIEW_COUNT = 5;

export default function Writing() {
  const preview = writings.slice(0, PREVIEW_COUNT);

  return (
    <section id="writing" className="mb-24">
      <SectionLabel>Writing</SectionLabel>

      <div className="flex flex-col gap-3">
        {preview.map((article, i) => (
          <motion.a
            key={article.id}
            href={article.url ?? "#"}
            target={article.url ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="card-link group grid gap-1 rounded-md p-4 hover:bg-accent/6 duration-200"
            style={{
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
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
              <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>
                {article.title}
              </h3>
            </div>

            {/* Description */}
            <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {article.description}
            </p>

            {/* Views */}
            <p className="mt-1 flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {article.views.toLocaleString("ja-JP")} views
            </p>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 text-right"
      >
        <Link
          href="/writing"
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          View more →
        </Link>
      </motion.div>
    </section>
  );
}
