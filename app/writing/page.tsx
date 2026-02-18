import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { writings } from "@/lib/data";

export const metadata = {
  title: "Writing — Taro Yamada",
  description: "Taro Yamadaの記事一覧",
};

export default function WritingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            ← Back
          </Link>
        </div>

        <SectionLabel>All Writing</SectionLabel>

        <div className="grid gap-4 sm:grid-cols-2">
          {writings.map((article) => (
            <a
              key={article.id}
              href={article.url ?? "#"}
              target={article.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-xl p-5 transition-opacity hover:opacity-80"
              style={{
                background: "var(--bg-sub)",
                border: "1px solid var(--border)",
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
              </div>

              {/* Title */}
              <h2 className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>
                {article.title}
              </h2>

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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
