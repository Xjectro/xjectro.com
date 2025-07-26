import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/ui/mdx";
import { formatDate } from "@/utils/mdx/mdx-utils";
import { MainLayout } from "@/components/layout/main-layout";
import { Section } from "@/components/ui/section";
import { getBlogBySlug } from "@/utils/mdx/blog-utils";
import { generateMeta as createMetadata } from "@/utils/meta/generate-meta";
import Image from "next/image";
import { socialLinks } from "@/constants/social";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { slug } = await params;
  let blog = getBlogBySlug(slug);
  if (!blog) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = blog.metadata;
  let ogImage = image ? image : `/assets/backgrounds/blog-detail.webp`;

  return createMetadata({
    title,
    description,
    path: `/blogs/${blog.slug}`,
    image: ogImage,
    type: "article",
    publishedTime,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  let blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <MainLayout
      title={blog.metadata.title}
      description={blog.metadata.summary}
      image={blog.metadata.image || `/assets/backgrounds/blog-detail.webp`}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blogbloging",
            headline: blog.metadata.title,
            datePublished: blog.metadata.publishedAt,
            dateModified: blog.metadata.publishedAt,
            description: blog.metadata.summary,
            image: blog.metadata.image
              ? `${process.env.NEXT_PUBLIC_BASE_URL}${blog.metadata.image}`
              : `/assets/backgrounds/blog-detail.webp`,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`,
            author: {
              "@type": "Person",
              name: "Xjectro",
            },
          }),
        }}
      />
      <Section>
        <div className="mb-8 mt-2 flex items-center justify-between text-sm">
          <p className="text-md flex items-center gap-4 text-muted-foreground">
            <span className="relative size-6">
              <Image
                alt="Me"
                src="/favicon.ico"
                className="rounded-full object-cover object-center outline-2 outline-offset-2 outline-border"
                fill
              />
            </span>
            {formatDate(blog.metadata.publishedAt)}
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-5 lg:flex-row">
          <article className="w-full space-y-6 rounded-lg border border-border p-8">
            <CustomMDX source={blog.content} />
          </article>
          <div className="top-22 sticky flex w-full flex-wrap items-center gap-5 rounded-lg border border-border p-8 lg:w-fit lg:flex-col">
            {socialLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="flex size-16 items-center justify-center rounded-lg bg-gradient-to-tl from-primary/50 from-5% to-muted to-60% text-foreground transition-colors hover:from-primary"
              >
                <link.icon className="size-8" />
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
