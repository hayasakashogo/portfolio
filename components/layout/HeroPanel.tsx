import { profile } from "@/lib/data";
import ThemeToggle from "@/components/layout/ThemeToggle";
import SocialLinks from "@/components/layout/SocialLinks";

export default function HeroPanel() {
  return (
    <div className="flex flex-col gap-6">
      {/* Role label */}
      <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
        {profile.role}
      </p>

      {/* Name */}
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl" style={{ color: "var(--text)" }}>
        {profile.name}
      </h1>

      {/* Bio */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {profile.bio}
      </p>

      {/* Social links */}
      <div className="flex items-center">
        <SocialLinks />
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
