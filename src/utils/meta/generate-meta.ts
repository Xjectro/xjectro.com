import type { Metadata } from "next";

interface generateMetaProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  publishedTime?: string;
  type?: "website" | "article";
}

export function generateMeta({
  title,
  description = "Full-stack developer crafting elegant solutions through clean code and intuitive design.",
  keywords = [],
  image = "/favicon.ico",
  path = "",
  publishedTime,
  type = "website",
}: generateMetaProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}${path}`;

  return {
    title: `${title} - ${process.env.NEXT_PUBLIC_BASE_TITLE}`,
    description,
    keywords: [
      "web developer",
      "software engineer",
      "frontend developer",
      "portfolio",
      "nextjs",
      "react",
      ...keywords,
    ],
    authors: [{ name: "xjectro", url: baseUrl }],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: `${title} - ${process.env.NEXT_PUBLIC_BASE_TITLE}`,
      description,
      url,
      siteName: process.env.NEXT_PUBLIC_BASE_TITLE!,
      images: [
        {
          url: image.startsWith("http") ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${process.env.NEXT_PUBLIC_BASE_TITLE}`,
      description,
      images: [image.startsWith("http") ? image : `${baseUrl}${image}`],
      creator: "@xjectro",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}
