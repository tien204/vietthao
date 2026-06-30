import type { CSSProperties, ReactNode } from "react";
import OxyVisualDoodles from "./OxyVisualDoodles";

type OxySlideShellProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  footer?: ReactNode;
};

export default function OxySlideShell({ children, className, style, footer }: OxySlideShellProps) {
  return (
    <article className={`oxy-slide${className ? ` ${className}` : ""}`} data-project style={style}>
      <div className="oxy-slide-card">
        <OxyVisualDoodles className="oxy-visual--slide" />
        {children}
      </div>
      {footer}
    </article>
  );
}
