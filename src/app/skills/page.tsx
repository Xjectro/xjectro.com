import { Section } from "@/components/ui/section";
import { SkillGrid } from "@/components/features/skills/skill-grid";
import { MainLayout } from "@/components/layout/main-layout";
import { CTA } from "@/components/ui/cta";
import { generateMeta } from "@/utils/meta/generate-meta";
import { skills } from "@/constants/skills";

export const metadata = generateMeta({
  title: "Skills & Expertise",
  description:
    "A comprehensive overview of my technical capabilities and expertise",
  path: "/skills",
});

export default function Page() {
  return (
    <MainLayout
      image="/assets/backgrounds/skills.webp"
      title="Skills & Expertise"
      description="A comprehensive overview of my technical capabilities and expertise"
    >
      <Section>
        <SkillGrid skills={skills} />
      </Section>

      <CTA
        title="Ready to Work Together?"
        description="Let's combine our skills and create something extraordinary."
        link={{ text: "Get Started", href: "/contact" }}
      />
    </MainLayout>
  );
}
