"use client";
import { SiX, SiInstagram, SiGithub, SiZenn } from "react-icons/si";
import { profile } from "@/lib/data";

// note.com は react-icons/si に存在しないためカスタム SVG を使用
// アクセントカラーの丸角四角形から "n" の形をくり抜くスタイル
function NoteIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* evenodd: 丸角四角形から "n" パスをくり抜く */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.8 0h14.4C21.85 0 24 2.15 24 4.8v14.4c0 2.65-2.15 4.8-4.8 4.8H4.8C2.15 24 0 21.85 0 19.2V4.8C0 2.15 2.15 0 4.8 0zM4 20V4h4.5v3.5C9.8 5.5 11.8 4.5 14 4.5c3.5 0 6 2.5 6 7V20h-4.5v-8c0-2-1.5-3.5-3.5-3.5S8 10 8 12v8H4z"
      />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "X",        href: profile.social.x        ?? "", Icon: SiX },
  { label: "Instagram",href: profile.social.instagram ?? "", Icon: SiInstagram },
  { label: "GitHub",   href: profile.social.github   ?? "", Icon: SiGithub },
  { label: "Zenn",     href: profile.social.zenn     ?? "", Icon: SiZenn },
  { label: "Note",     href: profile.social.note     ?? "", Icon: NoteIcon },
] as const;

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {SOCIAL_LINKS.filter(({ href }) => href).map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}
