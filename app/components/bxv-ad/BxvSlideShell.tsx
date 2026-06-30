import type { CSSProperties, ReactNode } from "react";

type BxvSlideShellProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function BxvSlideShell({ children, className, style }: BxvSlideShellProps) {
  return (
    <article className={`bxv-slide${className ? ` ${className}` : ""}`} data-project style={style}>
      <div className="bxv-slide-card">{children}</div>
    </article>
  );
}
