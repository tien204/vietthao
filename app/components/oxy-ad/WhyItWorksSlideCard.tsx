import OxySlideShell from "./OxySlideShell";

const pillars = [
  {
    title: ["ERASE", "OLD BIAS"],
    description: ["Through real experience", "& superior", "technology"],
    icon: "shield" as const,
  },
  {
    title: ["PROVE", "RESULTS"],
    description: ["Instant hydration –", "no dry skin"],
    icon: "drop" as const,
  },
  {
    title: ["BUILD HABIT", "& TRUST"],
    description: ["From experience →", "trust → loyalty"],
    icon: "people" as const,
  },
  {
    title: ["ALWAYS FRESH", "& LEADING"],
    description: ["Continuously upgrade", "technology, maintain", "brand leadership"],
    icon: "rocket" as const,
  },
] as const;

function WhyIcon({ type }: { type: (typeof pillars)[number]["icon"] }) {
  if (type === "shield") {
    return (
      <svg viewBox="0 0 100 100" fill="none" aria-hidden>
        <path
          d="M50 15 L20 25 V45 C20 65 35 80 50 90 C65 80 80 65 80 45 V25 L50 15 Z"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M35 50 L45 60 L65 40"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 25 V80"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.3"
          strokeDasharray="4 4"
        />
      </svg>
    );
  }

  if (type === "drop") {
    return (
      <svg viewBox="0 0 100 100" fill="none" aria-hidden>
        <path
          d="M50 15 C50 15 25 45 25 65 C25 78.8 36.2 90 50 90 C63.8 90 75 78.8 75 65 C75 45 50 15 50 15 Z"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M35 65 C35 73.3 41.7 80 50 80"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "people") {
    return (
      <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden>
        <circle cx="50" cy="35" r="12" />
        <path d="M30 75 C30 60 40 50 50 50 C60 50 70 60 70 75 V80 H30 V75 Z" />
        <circle cx="25" cy="42" r="8" />
        <path d="M10 80 C10 68 18 60 25 60 C28.5 60 31.7 61.4 34 63.8 C32.1 66.8 31 70.3 31 74 V80 H10 Z" />
        <circle cx="75" cy="42" r="8" />
        <path d="M90 80 C90 68 82 60 75 60 C71.5 60 68.3 61.4 66 63.8 C67.9 66.8 69 70.3 69 74 V80 H90 Z" />
      </svg>
    );
  }

  return (
    <svg className="oxy-slide-why-rocket" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M50 10 C50 10 75 30 75 60 L85 80 H15 L25 60 C25 30 50 10 50 10 Z" />
      <path d="M15 80 L5 90 H35 L25 80 Z" />
      <path d="M85 80 L95 90 H65 L75 80 Z" />
      <circle cx="50" cy="45" r="10" fill="var(--oxy-slide-surface)" />
      <path d="M35 80 L50 95 L65 80 Z" />
    </svg>
  );
}

function WhyBrushBanner() {
  return (
    <div className="oxy-slide-why-banner">
      <svg
        className="oxy-slide-why-brush"
        preserveAspectRatio="none"
        viewBox="0 0 1000 120"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M30,50 Q60,20 150,30 T450,25 T800,35 T950,45 Q970,50 960,75 Q940,95 850,90 T500,100 T150,90 Q20,85 30,50 Z"
        />
        <path
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          d="M15,45 L40,48 M20,60 L50,55 M940,40 L980,35 M950,70 L985,65 M40,35 L70,40 M920,95 L960,90 M80,25 L120,30 M850,105 L900,100 M250,20 L300,25 M700,105 L750,100"
        />
      </svg>
      <h2 className="oxy-slide-why-banner-text">TRY OXY, WHAT&apos;S THERE TO HESITATE!</h2>
    </div>
  );
}

export default function WhyItWorksSlideCard() {
  return (
    <OxySlideShell className="oxy-slide--why">
      <h2 className="oxy-slide-why-title">WHY IT WORKS?</h2>

      <div className="oxy-slide-why-grid">
        {pillars.map((pillar) => (
          <article className="oxy-slide-why-pillar" key={pillar.title.join("-")}>
            <div className="oxy-slide-why-icon">
              <WhyIcon type={pillar.icon} />
            </div>
            <h3>
              {pillar.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h3>
            <p>
              {pillar.description.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < pillar.description.length - 1 && <br />}
                </span>
              ))}
            </p>
          </article>
        ))}
      </div>

      <footer className="oxy-slide-why-footer">
        <WhyBrushBanner />
        <div className="oxy-slide-why-sub">
          <p>TRY TO SEE. BELIEVE TO LOVE.</p>
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden>
            <path
              d="M50 85 C50 85 15 60 15 35 C15 20 28 10 40 15 C45 17 50 25 50 25 C50 25 55 17 60 15 C72 10 85 20 85 35 C85 60 50 85 50 85 Z"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </footer>
    </OxySlideShell>
  );
}
