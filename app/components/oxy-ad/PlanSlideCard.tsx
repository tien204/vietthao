import OxySlideShell from "./OxySlideShell";

const planYears = [
  {
    year: "YEAR 1",
    title: "TRY TO BELIEVE",
    description:
      "Focus on challenging people to try OXY again through product experience and high-trial activities.",
    icon: "megaphone" as const,
  },
  {
    year: "YEAR 2",
    title: "BELIEVE TO STAY LOYAL",
    description:
      "Turn trial into a regular habit through education, KOL/KOC reviews, seeding, and expert-led content.",
    icon: "people" as const,
  },
  {
    year: "YEAR 3",
    title: "UPGRADE TO LEAD",
    description:
      "Introduce the idea of product upgrade, encouraging users to explore new technology and keep the brand relevant.",
    icon: "rocket" as const,
  },
] as const;

function PlanArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PlanIcon({ type }: { type: (typeof planYears)[number]["icon"] }) {
  if (type === "megaphone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        <line x1="7" y1="15" x2="10" y2="21" />
        <line x1="4" y1="15" x2="7" y2="21" />
        <line x1="7" y1="21" x2="10" y2="21" />
      </svg>
    );
  }

  if (type === "people") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function PlanSmiley() {
  return (
    <svg
      className="oxy-slide-plan-smiley"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="50" cy="52" r="38" />
      <circle cx="38" cy="46" r="4.5" fill="currentColor" stroke="none" />
      <circle cx="62" cy="46" r="4.5" fill="currentColor" stroke="none" />
      <path d="M32,63 Q50,78 68,63" />
    </svg>
  );
}

function PlanLeaf() {
  return (
    <svg className="oxy-slide-plan-leaf" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M10,80 Q40,40 80,10 Q60,60 10,80 Z" />
      <path d="M50,90 Q70,60 95,40 Q80,80 50,90 Z" transform="scale(0.6) translate(40, -10)" />
    </svg>
  );
}

export default function PlanSlideCard() {
  return (
    <OxySlideShell className="oxy-slide--plan">
      <header className="oxy-slide-plan-header">
        <h2 className="oxy-slide-plan-kicker">
          3-YEAR O2O COMMUNICATION PLAN
        </h2>

        <div className="oxy-slide-plan-quote-wrap">
          <div className="oxy-slide-plan-quote">
            <span className="oxy-slide-plan-quote-mark" aria-hidden>
              &ldquo;
            </span>
            <p className="oxy-slide-plan-quote-text">
              <span>TRY OXY,</span>
              <span>WHAT&apos;S THERE TO HESITATE?</span>
            </p>
            <span className="oxy-slide-plan-quote-mark" aria-hidden>
              &rdquo;
            </span>
          </div>
          <svg
            className="oxy-slide-plan-underline"
            viewBox="0 0 200 10"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M5,5 Q100,8 195,3"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <PlanSmiley />
          <PlanLeaf />
        </div>
      </header>

      <div className="oxy-slide-plan-grid">
        {planYears.map((item, index) => (
          <div className="oxy-slide-plan-track" key={item.year}>
            <article className="oxy-slide-plan-card">
              <span className="oxy-slide-plan-year">{item.year}</span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <div className="oxy-slide-plan-icon">
                <PlanIcon type={item.icon} />
              </div>
            </article>
            {index < planYears.length - 1 && (
              <div className="oxy-slide-plan-arrow" aria-hidden>
                <PlanArrow />
              </div>
            )}
          </div>
        ))}
      </div>
    </OxySlideShell>
  );
}
