import { HomePage } from "@/components/features/home/page";
import { generateMeta } from "@/utils/meta/generate-meta";

export const metadata = generateMeta({ title: "Home" });

export default function Page() {
  return <HomePage />;
}
