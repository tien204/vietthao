import BxvSlideShell from "./BxvSlideShell";

const focusItems = [
  "Cooking behavior",
  "Content preference",
  "Purchase motivation",
  "Brand perception",
  "Product information needs",
];

export default function ResearchFocusSlide() {
  return (
    <BxvSlideShell className="bxv-slide--focus">
      <header className="bxv-research-header">
        <span className="bxv-research-index">02</span>
        <div className="bxv-research-kicker">
          <span>Research</span>
          <span>Focus</span>
        </div>
      </header>

      <h1 className="bxv-research-hero">
        From Broad Question
        <br />
        To Researchable Problem
      </h1>

      <div className="bxv-research-funnel">
        <section className="bxv-research-box bxv-research-box--broad">
          <h2>Too Broad</h2>
          <p>
            &ldquo;Why hasn&apos;t
            <br />
            Bếp Xuyên Việt
            <br />
            reached young
            <br />
            consumers?&rdquo;
          </p>
          <div className="bxv-research-box-icon" aria-hidden>
            <MagnifyingGlassIcon />
          </div>
        </section>

        <div className="bxv-research-funnel-mid" aria-hidden>
          <ArrowChevron className="bxv-research-arrow bxv-research-arrow--chevron" />
          <FunnelIcon />
          <ArrowLine className="bxv-research-arrow bxv-research-arrow--line" />
        </div>

        <section className="bxv-research-box bxv-research-box--narrow">
          <h2>Researchable</h2>
          <p>
            How can digital
            <br />
            content move
            <br />
            young consumers
            <br />
            from watching
            <br />
            to buying?
          </p>
          <div className="bxv-research-box-icon" aria-hidden>
            <BullseyeIcon />
          </div>
        </section>
      </div>

      <div className="bxv-research-bottom">
        <div className="bxv-research-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bxv-ad/2/young.png"
            alt="Young person cooking at home"
            draggable={false}
          />
        </div>

        <section className="bxv-research-focus">
          <div className="bxv-research-focus-heading">
            <h3>OUR RESEARCH FOCUS</h3>
            <div className="bxv-research-focus-rule" aria-hidden />
          </div>

          <p className="bxv-research-focus-lead">
            Single 18-25-year-olds
            <br />
            who often cook at home.
          </p>

          <ul className="bxv-research-checklist">
            {focusItems.map((item) => (
              <li key={item}>
                <CircleCheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </BxvSlideShell>
  );
}

function FunnelIcon() {
  return (
    <svg
      className="bxv-research-funnel-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 20 C 5 10, 95 10, 95 20 L 65 60 L 60 90 C 60 95, 40 95, 40 90 L 35 60 Z"
        fill="#1f4e35"
        stroke="#1f4e35"
        strokeLinejoin="round"
      />
      <ellipse cx="50" cy="18" rx="45" ry="7" fill="#2e6b47" />
      <path d="M16 35 C 30 42, 70 42, 84 35" stroke="white" strokeWidth="2.5" fill="none" />
      <path d="M26 50 C 35 55, 65 55, 74 50" stroke="white" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

function ArrowChevron({ className }: { className?: string }) {
  return (
    <>
      <svg
        className={`${className} bxv-research-arrow--desktop`}
        viewBox="0 0 24 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 4 L20 20 L4 36" />
      </svg>
      <svg
        className={`${className} bxv-research-arrow--mobile`}
        viewBox="0 0 40 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 4 L20 20 L36 4" />
      </svg>
    </>
  );
}

function ArrowLine({ className }: { className?: string }) {
  return (
    <>
      <svg
        className={`${className} bxv-research-arrow--desktop`}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 20 L34 20" />
        <path d="M20 6 L34 20 L20 34" />
      </svg>
      <svg
        className={`${className} bxv-research-arrow--mobile`}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20 4 L20 34" />
        <path d="M6 20 L20 34 L34 20" />
      </svg>
    </>
  );
}

function MagnifyingGlassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" strokeLinecap="round" />
    </svg>
  );
}

function BullseyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CircleCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
