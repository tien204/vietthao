import BxvSlideShell from "./BxvSlideShell";

const points = [
  {
    title: "Food-First Visual",
    description: "Món ăn phải xuất hiện hấp dẫn ngay từ đầu.",
    icon: BowlFoodIcon,
  },
  {
    title: "Clear Hook",
    description: "Người xem cần hiểu video đang hứa hẹn điều gì.",
    icon: HookIcon,
  },
  {
    title: "Attention Moment",
    description: 'Một khoảnh khắc "ngon mắt" giúp họ dừng lướt.',
    icon: PenIcon,
  },
] as const;

export default function KeyInsightFiveSecondsSlide() {
  return (
    <BxvSlideShell className="bxv-slide--insight-b">
      <header className="bxv-insight-b-header">
        <span className="bxv-insight-b-index">05</span>
        <div className="bxv-insight-b-kicker">
          <span>Key</span>
          <span>Insight</span>
        </div>
      </header>

      <div className="bxv-insight-b-layout">
        <div className="bxv-insight-b-phone">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bxv-ad/5/phone.png"
            alt="TikTok food video on phone"
            draggable={false}
          />
        </div>

        <div className="bxv-insight-b-copy">
          <div className="bxv-insight-b-title-row">
            <h1 className="bxv-insight-b-hero">
              5 Seconds
              <br />
              Decide Everything
            </h1>
            <FiveSecondBadge />
          </div>

          <p className="bxv-insight-b-lead">
            Người xem cần thấy <strong>thèm ăn trước khi</strong> họ quan tâm đến sản phẩm.
          </p>

          <div className="bxv-insight-b-points">
            {points.map((point) => (
              <article className="bxv-insight-b-point" key={point.title}>
                <div className="bxv-insight-b-point-icon" aria-hidden>
                  <point.icon />
                </div>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="bxv-insight-b-banner">
        <svg
          className="bxv-insight-b-banner-shape"
          preserveAspectRatio="none"
          viewBox="0 0 1000 100"
          aria-hidden
        >
          <path d="M 8 12 Q 150 4 300 8 T 700 5 T 985 10 Q 995 50 990 88 L 980 92 Q 800 96 500 90 T 200 95 Q 50 98 10 90 Z" />
        </svg>
        <p>
          If the first 5 seconds do not look delicious enough,
          <br className="bxv-insight-b-br-lg" />
          viewers scroll away before the brand can explain itself.
        </p>
      </div>
    </BxvSlideShell>
  );
}

function FiveSecondBadge() {
  return (
    <svg
      className="bxv-insight-b-timer"
      viewBox="0 0 120 120"
      aria-hidden
    >
      <path
        d="M 100 60 A 40 40 0 1 1 76 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <text
        x="56"
        y="74"
        fontFamily="var(--font-body), Inter, sans-serif"
        fontWeight="900"
        fontSize="38"
        fill="currentColor"
        textAnchor="middle"
      >
        5s
      </text>
      <line x1="88" y1="28" x2="102" y2="16" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="102" y1="44" x2="116" y2="38" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="106" y1="62" x2="118" y2="62" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

function BowlFoodIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 10h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-2zm2-2h12l-1-3H7l-1 3z" />
    </svg>
  );
}

function HookIcon() {
  return (
    <svg
      className="bxv-insight-b-hook-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M7 7l10 10M17 7 7 17" strokeLinecap="round" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}
