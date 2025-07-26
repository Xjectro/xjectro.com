import { MainLayout } from "@//components/layout/main-layout";
import { CTA } from "@//components/ui/cta";
import { MyJourney } from "@//components/features/about/my-journey";
import { Overview } from "@//components/features/about/overview";
import { generateMeta } from "@//utils/meta/generate-meta";
import { WorkExperience } from "@//components/features/about/work-experience";

export const metadata = generateMeta({
  title: "About Me",
  description: "Crafting digital experiences through code and creativity",
  path: "/about",
});

export default function Page() {
  return (
    <MainLayout
      image="/assets/backgrounds/about.webp"
      title="About Me"
      description="Crafting digital experiences through code and creativity"
    >
      <MyJourney />
      <WorkExperience />
      <Overview />
      <CTA
        title="Let's Create Something Amazing Together"
        description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
        link={{ text: "Get Started", href: "/contact" }}
      />
    </MainLayout>
  );
}
