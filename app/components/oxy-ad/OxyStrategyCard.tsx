import OxyVisualDoodles from "./OxyVisualDoodles";

type OxyStrategyCardProps = {
  expanded?: boolean;
  onToggleExpanded?: () => void;
};

function LinkIcon() {
  return (
    <svg
      className="oxy-link-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

const infoRows = [
  {
    label: "CONTEXT:",
    body: "Thriving soft drink scene from GEN Z to Alpha",
  },
  {
    label: "MY ROLE:",
    body: (
      <>
        Market &amp; T&amp;A Research, Strategic Direction,
        <br />
        Key Visual Design
      </>
    ),
  },
  {
    label: "RESULT:",
    body: (
      <>
        The trial platform well-received by
        <br />
        the OXY Vietnam leadership.
      </>
    ),
  },
] as const;

export default function OxyStrategyCard({
  expanded = false,
  onToggleExpanded,
}: OxyStrategyCardProps) {
  return (
    <article className="oxy-showcase" data-project>
      <div className="oxy-card">
        <div className="oxy-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="oxy-logo-img"
            src="/oxy-ad/oxy-logo.png"
            alt="OXY"
            width={88}
            height={88}
            draggable={false}
          />
        </div>

        <div className="oxy-main">
          <div className="oxy-copy">
            <div className="asset-title">
              <h1 className="oxy-hero-name">OXY</h1>

              <h2 className="oxy-hero-sub">
                ADVERTISING
                <br />
                STRATEGY - 2024
              </h2>

              <div className="oxy-blue-banner">TRỌN ĐIỂM LÀNH TÍNH</div>

              <div className="oxy-info-list">
                {infoRows.map((row) => (
                  <div className="oxy-info-row" key={row.label}>
                    <span className="oxy-check" aria-hidden>
                      ✓
                    </span>
                    <div>
                      <h3>{row.label}</h3>
                      <p>{row.body}</p>
                    </div>
                  </div>
                ))}

                <div className="oxy-info-row oxy-file-row">
                  <span className="oxy-check" aria-hidden>
                    ✓
                  </span>
                  <a
                    href="https://drive.google.com/drive/folders/1lAeWETHrEb1pTGkseFqmRgMugeQm3mE2"
                    className="oxy-file-box"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>FULL PROPOSAL</h3>
                    <LinkIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <OxyVisualDoodles />
        </div>

        <div className="oxy-figure" role="img" aria-label="Key visual người mẫu OXY">
          <div className="oxy-scratch-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="oxy-scratch"
              src="/oxy-ad/1/blackscratch.png"
              alt=""
              aria-hidden
              draggable={false}
            />
          </div>

          <div className="oxy-man-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="oxy-man"
              src="/oxy-ad/1/man.png"
              alt="Người mẫu OXY — Let's change the game"
              draggable={false}
            />
          </div>
        </div>

        <div className="oxy-showcase-cta">
          <button
            type="button"
            className="oxy-showcase-toggle"
            onClick={onToggleExpanded}
            aria-expanded={expanded}
            aria-controls="oxy-ad-more"
          >
            <span>{expanded ? "Thu gọn" : "Xem thêm"}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path
                d={expanded ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
