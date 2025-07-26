import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export function Section({
  children,
  className,
  id,
  fullWidth = false,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)} {...props}>
      <div className={cn(fullWidth ? "w-full" : "container mx-auto px-4")}>
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "mb-4 text-3xl font-bold tracking-tight md:text-4xl",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function SectionSubtitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mb-10 max-w-3xl text-xl text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}
