import HeroPanel from "@/components/layout/HeroPanel";
import NavPanel from "@/components/layout/NavPanel";
import MobileMenu from "@/components/layout/MobileMenu";

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      {/* Mobile header/menu */}
      <MobileMenu />

      {/* Main layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="lg:flex lg:min-h-screen lg:gap-12 xl:gap-16">
          {/* Left: Hero panel — fixed on lg+ */}
          <aside className="pt-20 pb-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[320px] lg:flex-shrink-0 lg:flex-col lg:justify-center lg:pt-16 lg:pb-16">
            <HeroPanel />
          </aside>

          {/* Center: Scrollable content */}
          <main className="flex-1 min-w-0 pb-16 lg:pt-16">
            {children}
          </main>

          {/* Right: Nav panel — fixed on lg+ */}
          <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[180px] lg:flex-shrink-0 lg:flex-col lg:justify-center lg:pt-16 lg:pb-16 xl:flex">
            <NavPanel />
          </aside>
        </div>
      </div>
    </>
  );
}
