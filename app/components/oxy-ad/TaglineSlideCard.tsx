import OxySlideShell from "./OxySlideShell";

const taglines = [
  {
    label: "Main",
    className: "oxy-slide-tagline-box--main",
    lines: ["OXY INSTANT HYDRATION —", "TRY IT AND SEE"],
  },
  {
    label: "Secondary",
    className: "oxy-slide-tagline-box--mid",
    lines: ["OXY dries out your skin?", "How would you know without trying?"],
  },
  {
    label: null,
    className: "oxy-slide-tagline-box--light",
    lines: ["Technology from", "Japan"],
  },
] as const;

export default function TaglineSlideCard() {
  return (
    <OxySlideShell className="oxy-slide--tagline">
      <div className="oxy-slide-tagline-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/oxy-ad/oxy-logo.png" alt="OXY" width={56} height={56} draggable={false} />
      </div>

      <div className="oxy-slide-tagline-body">
        <div className="oxy-slide-tagline-visual" aria-hidden>
          <div className="oxy-slide-tagline-char-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="oxy-slide-tagline-char"
              src="/oxy-ad/6/char.png"
              alt="OXY Deep Wash model"
              draggable={false}
            />
          </div>
        </div>

        <div className="oxy-slide-tagline-copy">
          <h2 className="oxy-slide-tagline-title">TAGLINE</h2>

          <div className="oxy-slide-tagline-list">
            {taglines.map((item, index) => (
              <article className="oxy-slide-tagline-item" key={index}>
                {item.label && (
                  <span className="oxy-slide-tagline-badge">{item.label}</span>
                )}
                <div className={`oxy-slide-tagline-box ${item.className}`}>
                  <p>
                    {item.lines.map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {line}
                        {lineIndex < item.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="oxy-slide-tagline-note">
            <span className="oxy-slide-tagline-arrow" aria-hidden>
              &rarr;
            </span>
            <p className="oxy-slide-tagline-note-text">
              <span className="quote-line-highlight">
                Use call-to-action sentences,
              </span>
              <br />
              <span className="quote-line-highlight">
                motivating the listener to take action
              </span>
            </p>
          </div>
        </div>
      </div>
    </OxySlideShell>
  );
}
