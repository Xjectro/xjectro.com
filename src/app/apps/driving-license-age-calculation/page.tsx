import { MainLayout } from "@//components/layout/main-layout";
import { Section } from "@//components/ui/section";
import { LicenseForm } from "@//components/apps/driving-license-age-calculation/license-form";
import { generateMeta } from "@//utils/meta/generate-meta";
import { Card, CardContent } from "@//components/ui/card";

export const metadata = generateMeta({
  title: "Driving License Age Calculator",
  description:
    "Find out which license groups you are eligible for by selecting your country and entering your date of birth.",
  image: "/assets/backgrounds/driving-license-age-calculation.webp",
  keywords: [
    "driving license age calculator",
    "license eligibility",
    "age requirements for driving license",
    "calculate driving license age",
    "driving license groups",
    "age calculator for driving license",
    "driving license by country",
    "driving age calculator",
    "find eligible driving license groups",
    "driving license age requirements",
    // Turkish
    "ehliyet yaş hesaplama",
    "ehliyet uygunluk",
    "ehliyet için yaş gereksinimleri",
    "ehliyet yaşını hesapla",
    "ehliyet grupları",
    "ehliyet için yaş hesaplama",
    "ülkeye göre ehliyet yaşları",
    "ehliyet yaş gereksinimleri",
    // French
    "calculateur d'âge pour permis de conduire",
    "éligibilité au permis de conduire",
    "exigences d'âge pour permis de conduire",
    "calculer l'âge pour permis de conduire",
    "groupes de permis de conduire",
    "calculateur d'âge permis",
    "âge permis par pays",
    "trouver groupes permis éligibles",
    // German
    "führerschein altersrechner",
    "führerschein berechtigung",
    "alter voraussetzungen führerschein",
    "führerschein alter berechnen",
    "führerscheingruppen",
    "alter rechner führerschein",
    "führerschein nach land",
    "führerschein altersanforderungen",
  ],
  path: "/apps/driving-license-age-calculation",
});

export default function Page() {
  return (
    <MainLayout
      image="/assets/backgrounds/driving-license-age-calculation.webp"
      title="Driving License Age Calculator"
      description="Find out which license groups you are eligible for by selecting your country and entering your date of birth."
    >
      <Section>
        <Card className="mx-auto max-w-xl">
          <CardContent>
            <LicenseForm />
          </CardContent>
        </Card>
      </Section>
    </MainLayout>
  );
}
