type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${className}`}
      style={{
        background: "var(--badge-bg)",
        border: "1px solid var(--badge-border)",
        color: "var(--accent)",
      }}
    >
      {children}
    </span>
  );
}
