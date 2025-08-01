import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import { slugify } from "@/lib/utils";
import Prism from "prismjs";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header: string, index: number) => (
    <th
      key={index}
      className="bg-muted/50 px-4 py-2 text-left font-semibold text-foreground"
    >
      {header}
    </th>
  ));
  const rows = data.rows.map((row: string[], rowIndex: number) => (
    <tr key={rowIndex} className="even:bg-muted/30">
      {row.map((cell: string, cellIndex: number) => (
        <td
          key={cellIndex}
          className="border-b border-border px-4 py-2 text-muted-foreground"
        >
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/70">
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function CustomLink(props: React.ComponentProps<"a">) {
  const href = props.href || "";

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  const { alt, ...rest } = props;
  return <Image alt={alt || ""} className="rounded-lg" {...rest} />;
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(
      typeof children === "string"
        ? children
        : React.Children.toArray(children).join(" "),
    );
    const base =
      level === 1
        ? "text-4xl md:text-5xl font-bold mb-6 mt-10 text-primary tracking-tight"
        : level === 2
          ? "text-3xl md:text-4xl font-bold mb-5 mt-8 text-primary tracking-tight"
          : level === 3
            ? "text-2xl md:text-3xl font-semibold mb-4 mt-7 text-foreground tracking-tight"
            : level === 4
              ? "text-xl md:text-2xl font-semibold mb-3 mt-6 text-foreground tracking-tight"
              : level === 5
                ? "text-lg font-semibold mb-2 mt-5 text-muted-foreground tracking-tight"
                : "text-base font-semibold mb-2 mt-4 text-muted-foreground tracking-tight";
    return React.createElement(
      `h${level}`,
      { id: slug, className: `${base} group relative flex items-center` },
      [
        React.createElement(
          "a",
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className:
              "mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground underline-offset-4 absolute -left-6 top-0",
            "aria-label": "Anchor link to this section",
          },
          "#",
        ),
        <span key="heading-content" className="relative">
          {children}
          <span className="mt-2 block h-0.5 w-full rounded-full bg-primary/20" />
        </span>,
      ],
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

function Code(props: React.ComponentProps<"code">) {
  const className = props.className || "";
  const match = className.match(/language-(\w+)/);
  const code =
    typeof props.children === "string"
      ? props.children
      : String(props.children);

  if (match) {
    const language = match[1];
    let html = "";
    try {
      html = Prism.highlight(
        code,
        Prism.languages[language] || Prism.languages.javascript,
        language,
      );
    } catch {
      html = code;
    }
    return (
      <pre className="my-4 overflow-x-auto rounded border border-border bg-muted">
        <code
          className={`language-${language} block px-3 py-2 font-mono text-sm text-muted-foreground`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    );
  }

  return (
    <code
      {...props}
      className={
        "rounded border border-border bg-muted px-1 py-0.5 font-mono text-sm text-muted-foreground " +
        (props.className || "")
      }
    >
      {props.children}
    </code>
  );
}

function MarkdownTable(props: React.ComponentProps<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-sm" {...props} />
    </div>
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mb-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
      {props.children}
    </p>
  ),
  Image: RoundedImage,
  a: CustomLink,
  Table,
  table: MarkdownTable,
  code: Code,
};

export function CustomMDX(props: React.ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
