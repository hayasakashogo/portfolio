type SectionLabelProps = {
  children: React.ReactNode;
};

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p
      className="mb-8 text-xs font-semibold tracking-widest uppercase"
      style={{ color: "var(--accent)" }}
    >
      {children}
    </p>
  );
}
