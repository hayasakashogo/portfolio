"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Contact() {
  return (
    <section id="contact" className="mb-24">
      <SectionLabel>Contact</SectionLabel>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-6 rounded-md p-6"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--badge-border)",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          プロジェクトのご相談・お仕事のご依頼など、お気軽にご連絡ください。
          フリーランスとして新しいプロジェクトを随時受け付けています。
        </p>

        <a
          href={`mailto:${profile.social.email}`}
          className="inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all hover:opacity-80"
          style={{
            border: "1px solid var(--accent)",
            color: "var(--accent)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          {profile.social.email}
        </a>
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Next.js
          </a>
          {" & "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Tailwind CSS
          </a>
          {" · "}
          Deployed on{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Vercel
          </a>
        </p>
      </footer>
    </section>
  );
}
