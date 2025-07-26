import { MainLayout } from "@//components/layout/main-layout";
import { Section } from "@//components/ui/section";
import { ConverterForm } from "@//components/apps/color-converter/converter-form";
import { generateMeta } from "@//utils/meta/generate-meta";

export const metadata = generateMeta({
  title: "Color Converter",
  description: "Easily convert between different color code types.",
  image: "/assets/backgrounds/color-converter.webp",
  keywords: ["converter", "color", "color converter"],
  path: "/apps/color-converter",
});

export default function Page() {
  return (
    <MainLayout
      image="/assets/backgrounds/color-converter.webp"
      title="Color Converter"
      description="Easily convert between different color code types."
    >
      <Section>
        <ConverterForm />
      </Section>
    </MainLayout>
  );
}
