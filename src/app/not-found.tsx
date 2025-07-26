import { NotFoundPage } from "@//components/features/not-found/page";
import { generateMeta } from "@//utils/meta/generate-meta";

export const metadata = generateMeta({
  title: "Page Not Found | 404",
  description:
    "The page you are looking for could not be found. Please check the URL or return to the homepage.",
  path: "/not-found",
});

export default function Page() {
  return <NotFoundPage />;
}
