import OxySlideShell from "./OxySlideShell";

export default function BigIdeaSlideCard() {
  return (
    <OxySlideShell className="oxy-slide--big-idea">
      <div className="oxy-slide-big-idea-body">
        <div className="oxy-slide-big-idea-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="oxy-slide-big-idea-img"
            src="/oxy-ad/5/bear.png"
            alt="Gấu — biểu tượng Big Idea"
            draggable={false}
          />
        </div>

        <div className="oxy-slide-big-idea-copy">
          <span className="oxy-slide-big-idea-label">BIG IDEA</span>

          <blockquote className="oxy-slide-big-idea-quote">
            <span className="oxy-slide-big-idea-open" aria-hidden>
              &ldquo;
            </span>
            <div className="oxy-slide-big-idea-lines">
              <span className="oxy-slide-big-idea-line oxy-slide-big-idea-line--dark">OXY</span>
              <span className="oxy-slide-big-idea-line">KHÔNG NGẠI</span>
              
              <span className="oxy-slide-big-idea-line">KIỂM CHỨNG</span>
            </div>
            <span className="oxy-slide-big-idea-close" aria-hidden>
              &rdquo;
            </span>
            <svg
              className="oxy-slide-big-idea-underline"
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M5,10 Q150,15 295,5"
                stroke="var(--surface-secondary)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </blockquote>

          <p className="oxy-slide-body oxy-slide-big-idea-desc">
            With the product&apos;s <strong>Japanese technology</strong>, OXY will destroy all
            negative rumors about OXY in customers&apos; minds{" "}
            <strong>with actual product experiences</strong>.
          </p>
        </div>
      </div>
    </OxySlideShell>
  );
}
