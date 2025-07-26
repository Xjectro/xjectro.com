import { BlogGrid } from "@//components/features/blog/blog-grid";
import { MainLayout } from "@//components/layout/main-layout";
import { Section } from "@//components/ui/section";
import { generateMeta } from "@//utils/meta/generate-meta";
import { getBlogs } from "@//utils/mdx/blog-utils";
import { CTA } from "@//components/ui/cta";

export const metadata = generateMeta({
  title: "Blogs",
  description: "Read my blog.",
  path: "/blogs",
});

export default function Page() {
  const blogs = getBlogs();
  return (
    <MainLayout
      title="Blogs"
      description="Read my blogs."
      image="/assets/backgrounds/blogs.webp"
    >
      <Section>
        <BlogGrid blogs={blogs} />
      </Section>

      <CTA
        title="Found This Article Interesting?"
        description="If our blogs inspired you, imagine what we can achieve together! Share your project with us and let's take the first step together."
        link={{ href: "/contact", text: "Get in Touch" }}
      />
    </MainLayout>
  );
}
