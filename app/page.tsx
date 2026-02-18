import PageLayout from "@/components/layout/PageLayout";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Projects from "@/components/sections/Projects";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <PageLayout>
      <Experience />
      <Certifications />
      <Projects />
      <Writing />
      <Contact />
    </PageLayout>
  );
}
