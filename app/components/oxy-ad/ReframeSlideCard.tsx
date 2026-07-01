import OxySlideShell from "./OxySlideShell";

function ReframeSparkle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M25,5 L28,20 L45,25 L28,30 L25,45 L22,30 L5,25 L22,20 Z" />
    </svg>
  );
}

export default function ReframeSlideCard() {
  return (
    <OxySlideShell className="oxy-slide--reframe">
      <div className="oxy-slide-reframe-body">
        <div className="oxy-slide-reframe-copy">
          <div className="oxy-slide-reframe-text">
            <p>This question helped us reframe the problem.</p>
            <p>
              <strong>
                The real barrier was not simply
                <br className="oxy-slide-br-lg" />
                &ldquo;OXY&apos;s cleanser has a bad image&rdquo;
              </strong>
              ,
              <br className="oxy-slide-br-lg" />
              but{" "}
              <strong>
                &ldquo;people need a concrete reason to
                <br className="oxy-slide-br-lg" />
                update what they think they know
                <br className="oxy-slide-br-lg" />
                about the cleanser.&rdquo;
              </strong>
            </p>
            <p>
              <strong>
                So I shifted the direction from
                <br className="oxy-slide-br-lg" />
                emotional persuasion to functional proof.
              </strong>
            </p>
            <p>
              Instead of only saying <strong>&ldquo;OXY is different now&rdquo;</strong>,
              <br className="oxy-slide-br-lg" />
              I wanted to build a strategy that lets people
              <br className="oxy-slide-br-lg" />
              experience the difference directly. The product&apos;s
              <br className="oxy-slide-br-lg" />
              new technology became the reason to believe,
              <br className="oxy-slide-br-lg" />
              while real trials became the way to <strong>rebuild trust</strong>.
            </p>
          </div>

          <p className="oxy-slide-reframe-cta">
            <span className="quote-line-highlight">
              THIS LED ME TO THE BIG IDEA AND
            </span>
            <br />
            <span className="quote-line-highlight">TAGLINE:</span>
          </p>
        </div>

        <div className="oxy-slide-reframe-visual" aria-hidden>
          <ReframeSparkle className="oxy-slide-reframe-spark-a" />
          <ReframeSparkle className="oxy-slide-reframe-spark-b" />

          <div className="oxy-slide-reframe-backdrop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="oxy-slide-reframe-backdrop-img"
              src="/oxy-ad/4/dai.png"
              alt=""
              draggable={false}
            />
          </div>

          <div className="oxy-slide-reframe-portrait-wrap" role="img" aria-label="OXY face wash model">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="oxy-slide-reframe-portrait"
              src="/oxy-ad/4/char.png"
              alt="OXY face wash model"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </OxySlideShell>
  );
}
