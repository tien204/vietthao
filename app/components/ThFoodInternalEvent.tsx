"use client";

const topImages = [
  {
    src: "/th_food/internal/3.png",
    alt: "Happy Mid-Autumn invitation poster — TH",
    tilt: "left",
  },
  {
    src: "/th_food/internal/1.png",
    alt: "Activity photos and game scripts at TH internal event",
    tilt: "right",
  },
] as const;

const baseImage = {
  src: "/th_food/internal/2.png",
  alt: "On-site coordination and event filming at TH internal event",
} as const;

const roleItems = [
  { icon: "game", label: "Suggested game formats" },
  { icon: "script", label: "Prepared MC script & run sheet" },
  { icon: "team", label: "Supported design materials and on-site coordination" },
] as const;

export default function ThFoodInternalEvent() {
  return (
    <section className="th-event" data-reveal aria-label="Internal Event Coordination — Mid-Autumn">
      <header className="th-event-head">
        <h3 className="th-event-title">Internal Event Coordination</h3>
      </header>

      <div className="th-event-body">
        <div className="th-event-left-col">
          <p className="th-event-subtitle">Mid-Autumn Employee Engagement</p>
          <p className="th-event-desc">
            Supported TH internal events to strengthen employee engagement and team culture.
          </p>

          <div className="th-event-role-card">
            <h4 className="th-event-role-title">My role</h4>
            <ul className="th-event-role-list">
              {roleItems.map((item) => (
                <li key={item.label}>
                  <span className="th-event-role-icon" aria-hidden>
                    <RoleIcon type={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="th-event-visual">
          <div className="th-event-visual-top">
            {topImages.map((image) => (
              <div
                className={`th-event-sheet th-event-sheet--tilt-${image.tilt}`}
                key={image.src}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.alt} draggable={false} />
              </div>
            ))}
          </div>

          <div className="th-event-sheet th-event-sheet--base">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={baseImage.src} alt={baseImage.alt} draggable={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleIcon({ type }: { type: string }) {
  switch (type) {
    case "script":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M6 11h4v4H6zM14 9h4v6h-4z" />
          <path d="M8 11V8a2 2 0 012-2h1M16 9V7a2 2 0 00-2-2h-1" />
          <path d="M12 18v2M8 20h8" />
        </svg>
      );
  }
}
