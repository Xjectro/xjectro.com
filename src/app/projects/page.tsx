import { ProjectGrid } from "@//components/features/project/project-grid";
import { Section } from "@//components/ui/section";
import { CTA } from "@//components/ui/cta";
import { MainLayout } from "@//components/layout/main-layout";
import { generateMeta } from "@//utils/meta/generate-meta";
import { projects } from "@//constants/projects";

export const metadata = generateMeta({
  title: "My Projects",
  description: "A showcase of my work, from web applications to design systems",
  path: "/projects",
});

export default function Page() {
  return (
    <MainLayout
      image="/assets/backgrounds/projects.webp"
      title="My Projects"
      description="A showcase of my work, from web applications to design systems"
    >
      <Section>
        <ProjectGrid projects={projects} />
      </Section>

      <CTA
        title="Have a Project in Mind?"
        description="Let's collaborate and bring your ideas to life with cutting-edge technology and exceptional design."
        link={{ href: "/contact", text: "Start a Project" }}
      />
    </MainLayout>
  );
}
