export const dynamic = "force-dynamic";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { getWritings } from "@/lib/data";
import WritingGrid from "@/components/writing/WritingGrid";

export const metadata = {
  title: "Writing — Shogo Hayasaka",
  description: "Shogo Hayasakaの記事一覧",
};

export default async function WritingPage() {
  const writings = await getWritings();
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
