// components/Contact/SectionCard.tsx
import * as React from "react";

type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, "as" | "className" | "children">;

export default function SectionCard<E extends React.ElementType = "section">(
  { as, className, children, ...rest }: PolymorphicProps<E>
) {
  const Tag = (as ?? "section") as React.ComponentType<{ children?: React.ReactNode; className?: string; [key: string]: unknown }>;

  return (
    <Tag
      {...rest}
      className={[
        "rounded-3xl bg-white border border-gold/45",
        "shadow-[0_1px_0_rgba(255,255,255,0.02)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
