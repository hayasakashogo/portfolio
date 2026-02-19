"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiJquery,
  SiReact,
  SiNextdotjs,
  SiWordpress,
  SiSupabase,
  SiFigma,
  SiAdobephotoshop,
  SiGit,
  SiSourcetree,
  SiClaude,
  SiVercel,
  SiGoogleappsscript,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

type SkillItem = { name: string; icon?: IconType };

const SKILL_CATEGORIES: { category: string; items: SkillItem[] }[] = [
  {
    category: "Languages",
    items: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "Sass", icon: SiSass },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    category: "Frameworks / Libraries",
    items: [
      { name: "jQuery", icon: SiJquery },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "WordPress", icon: SiWordpress },
      { name: "Smarty" },
    ],
  },
  {
    category: "Tools / Services",
    items: [
      { name: "Figma", icon: SiFigma },
      { name: "Photoshop", icon: SiAdobephotoshop },
      { name: "Git", icon: SiGit },
      { name: "SourceTree", icon: SiSourcetree },
      { name: "Vercel", icon: SiVercel },
      { name: "Supabase", icon: SiSupabase },
      { name: "VS Code", icon: VscVscode },
      { name: "microCMS" },
      { name: "Google Apps Script", icon: SiGoogleappsscript },
      { name: "Claude Code", icon: SiClaude },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mb-24">
      <SectionLabel>SKILLS</SectionLabel>
      <div className="flex flex-col gap-6">
        {SKILL_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(4px)",
              border: "1px solid var(--badge-border)",
              borderRadius: "0.75rem",
            }}
            className="p-6"
          >
            <p
              className="mb-4 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--muted)" }}
            >
              {cat.category}
            </p>
            <div className="flex flex-wrap gap-3">
              {cat.items.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm"
                  style={{
                    background: "var(--badge-bg)",
                    border: "1px solid var(--badge-border)",
                    color: "var(--accent)",
                  }}
                >
                  {Icon && <Icon size={16} />}
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
