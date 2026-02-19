export const dynamic = "force-dynamic";

import PageLayout from "@/components/layout/PageLayout";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Projects from "@/components/sections/Projects";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";
import { getProjects, getWritings } from "@/lib/data";

export default async function Home() {
  const [projects, writings] = await Promise.all([getProjects(), getWritings()]);
  return (
    <PageLayout>
      <Experience />
      <Certifications />
      <Projects projects={projects} />
      <Writing writings={writings} />
      <Contact />
    </PageLayout>
  );
}
