import BxvSlideShell from "./BxvSlideShell";

const roleItems = [
  "Market Research",
  "Strategic Direction",
  "Data Visualization",
  "Questionnaire Design",
];

const metaColumns = [
  {
    title: "MY ROLE",
    icon: UserIcon,
    body: (
      <ul className="bxv-portfolio-list">
        {roleItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    title: "CONTEXT",
    icon: ClipboardIcon,
    body: (
      <p>
        Acting as Marketing Executives, we built a research plan to identify the brand problem and
        propose research-based directions.
      </p>
    ),
  },
  {
    title: "RESULT",
    icon: HistoryIcon,
    body: (
      <p>Achieved the highest score in class, evaluated by a guest lecturer from YouNet Media.</p>
    ),
  },
] as const;

type ProjectPortfolioSlideProps = {
  expanded?: boolean;
  onToggleExpanded?: () => void;
};

export default function ProjectPortfolioSlide({
  expanded = false,
  onToggleExpanded,
}: ProjectPortfolioSlideProps) {
  return (
    <BxvSlideShell className="bxv-slide--portfolio">
      <div className="bxv-portfolio-inner">
        <div className="bxv-portfolio-grid">
          <div className="bxv-portfolio-copy">
            <h2 className="bxv-portfolio-brand">Bếp Xuyên Việt</h2>
            <h1 className="bxv-portfolio-hero">
              Communication
              <br />
              Research Project
            </h1>
            <p className="bxv-portfolio-lead">
              A research project to uncover why young consumers – active users of ready-to-cook
              products – rarely choose Bếp Xuyên Việt.
            </p>

            <blockquote className="bxv-portfolio-quote">
              <div className="bxv-portfolio-quote-inner">
                <span className="bxv-portfolio-quote-mark" aria-hidden>
                  &ldquo;
                </span>
                <p>
                  Nếu người trẻ vẫn nấu ăn, vẫn xem review gia vị nấu ăn, vẫn mua hàng trên TikTok
                  Shop, vậy nội dung số của Bếp Xuyên Việt đang thiếu điều gì để khiến họ bấm mua?
                </p>
              </div>
            </blockquote>
          </div>

          <div className="bxv-portfolio-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bxv-ad/1/sotphone.png"
              alt="Bếp Xuyên Việt — sốt thịt kho, sốt kho tiêu và mockup TikTok trên điện thoại"
              draggable={false}
            />
          </div>
        </div>

        <div className="bxv-portfolio-meta">
          {metaColumns.map((column) => (
            <section className="bxv-portfolio-meta-item" key={column.title}>
              <div className="bxv-portfolio-meta-icon" aria-hidden>
                <column.icon />
              </div>
              <div>
                <h3>{column.title}</h3>
                {column.body}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="bxv-portfolio-cta">
        <button
          type="button"
          className="bxv-showcase-toggle"
          onClick={onToggleExpanded}
          aria-expanded={expanded}
          aria-controls="bxv-ad-more"
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

      <footer className="bxv-portfolio-footer">
        <a
          href="https://drive.google.com/drive/folders/1m2E37T8bKbN0DLlir8SzC8WlJ12Q5XzO"
          className="bxv-portfolio-footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DesktopIcon />
          <span>Full Deck (Drive)</span>
        </a>
        <div className="bxv-portfolio-footer-divider" aria-hidden />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdcFIkaH0rf-F4ZobGePzcxIhlE2q6EutbrSEAqpkYjIfWdIA/viewform"
          className="bxv-portfolio-footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkIcon />
          <span>Link bảng hỏi khảo sát</span>
        </a>
      </footer>
    </BxvSlideShell>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 4V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
      <path d="M9 10h6M9 14h6" strokeLinecap="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" />
      <path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
    </svg>
  );
}
