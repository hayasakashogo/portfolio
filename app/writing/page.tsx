import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { writings } from "@/lib/data";
import WritingGrid from "@/components/writing/WritingGrid";

export const metadata = {
  title: "Writing — Taro Yamada",
  description: "Taro Yamadaの記事一覧",
};

export default function WritingPage() {
  return (
    <div className="min-h-screen">
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

        <WritingGrid writings={writings} />
      </div>
    </div>
  );
}
