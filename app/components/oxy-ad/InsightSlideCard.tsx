import OxySlideShell from "./OxySlideShell";

function InsightLeafDecor() {
  return (
    <svg
      className="oxy-slide-insight-leaf"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M20,180 Q80,100 150,20" stroke="var(--accent-secondary)" strokeWidth="4" strokeLinecap="round" />
      <path d="M35,160 Q20,130 40,115 Q60,140 35,160 Z" fill="var(--accent-secondary)" />
      <path d="M60,130 Q40,90 70,80 Q90,110 60,130 Z" fill="var(--accent-secondary)" />
      <path d="M90,100 Q75,60 105,50 Q120,80 90,100 Z" fill="var(--accent-secondary)" />
      <path d="M120,65 Q110,35 140,25 Q150,50 120,65 Z" fill="var(--accent-secondary)" />
      <path d="M50,145 Q80,145 85,120 Q60,115 50,145 Z" fill="var(--accent-secondary)" />
      <path d="M80,115 Q115,120 120,90 Q90,85 80,115 Z" fill="var(--accent-secondary)" />
      <path d="M110,85 Q145,90 150,60 Q120,55 110,85 Z" fill="var(--accent-secondary)" />
      <path d="M148,22 Q165,0 175,10 Q160,35 148,22 Z" fill="var(--accent-secondary)" />
      <circle cx="55" cy="115" r="3" fill="var(--fg-primary)" />
      <circle cx="85" cy="85" r="3" fill="var(--fg-primary)" />
      <circle cx="115" cy="55" r="3" fill="var(--fg-primary)" />
    </svg>
  );
}

function InsightBlobDecor() {
  return (
    <svg
      className="oxy-slide-insight-blob"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d="M0,200 L0,50 C 60,60 90,130 160,160 C 180,170 200,200 200,200 Z" fill="currentColor" />
    </svg>
  );
}

export default function InsightSlideCard() {
  return (
    <OxySlideShell className="oxy-slide--insight">
      <InsightBlobDecor />
      <InsightLeafDecor />

      <div className="oxy-slide-insight-body">
        <div className="oxy-slide-insight-copy">
          <h2 className="oxy-slide-heading">INSIGHT</h2>
          <p className="oxy-slide-body">
            Consumers are worried that OXY{" "}
            <strong>has not yet changed its technology</strong>, causing many people who have never{" "}
            <strong>used OXY</strong> to have <strong>wrong opinions</strong> about the product.
          </p>
        </div>

        <div className="oxy-slide-insight-visual">
          <figure className="oxy-slide-insight-products">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/oxy-ad/3/chaioxy.png"
              alt="Các chai sản phẩm OXY"
              draggable={false}
            />
          </figure>

          <div className="oxy-slide-insight-marker-group">
            <div className="oxy-slide-marker-wrap">
              <span className="oxy-slide-marker-text">Still OLD?</span>
              <svg
                className="oxy-slide-marker-underline"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M5,15 Q100,5 195,10"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="oxy-slide-insight-vn">
              &ldquo;Bình mới,
              <br />
              rượu cũ&rdquo; ?
            </h3>
          </div>
        </div>
      </div>
    </OxySlideShell>
  );
}
