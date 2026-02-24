import HeroPanel from "@/components/layout/HeroPanel";
import NavPanel from "@/components/layout/NavPanel";

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      {/* Main layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="lg:flex lg:min-h-screen lg:gap-12 xl:gap-16">
          {/* Left: Hero panel — fixed on lg+ */}
          <aside className="flex min-h-screen flex-col justify-center pt-20 pb-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:min-h-0 lg:w-[320px] lg:shrink-0 lg:pt-16 lg:pb-16 lg:justify-center">
            <HeroPanel />
          </aside>

          {/* Center: Scrollable content */}
          <main className="flex-1 min-w-0 lg:pt-16">
            {children}
          </main>

          {/* Right: Nav panel — fixed on lg+ */}
          <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-45 lg:shrink-0 lg:flex-col lg:justify-center lg:pt-16 lg:pb-16 xl:flex">
            <NavPanel />
          </aside>
        </div>
      </div>
    </>
  );
}
