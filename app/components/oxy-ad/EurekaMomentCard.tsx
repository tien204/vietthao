const commentCards = [
  {
    avatar: "https://picsum.photos/seed/eureka-lee/80/80",
    name: "Lee X",
    body: 'I went to BigC to ask about face wash, and a staff member whispered, "If you have money, use products from outside — I\'ll show you. Don\'t use stuff like Oxy; it\'s terrible, it dries out your skin."',
  },
  {
    avatar: "https://picsum.photos/seed/eureka-lio/80/80",
    name: "Lio Trà",
    body: "Oxy really strips your skin, and it dries it out too. Mechanically, your skin produces oil to balance moisture... so you end up with even more oil.",
  },
] as const;

function LightbulbIcon() {
  return (
    <svg
      className="eureka-bulb"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="50" y1="5" x2="50" y2="15" />
      <line x1="82" y1="18" x2="75" y2="25" />
      <line x1="95" y1="50" x2="85" y2="50" />
      <line x1="82" y1="82" x2="75" y2="75" />
      <line x1="18" y1="18" x2="25" y2="25" />
      <line x1="5" y1="50" x2="15" y2="50" />
      <path d="M35 70 C20 58 25 30 50 30 C75 30 80 58 65 70 L65 80 L35 80 Z" />
      <line x1="38" y1="88" x2="62" y2="88" />
      <line x1="42" y1="95" x2="58" y2="95" />
      <path d="M42 70 L45 52 L50 46 L55 52 L58 70" strokeWidth="3" />
    </svg>
  );
}

export default function EurekaMomentCard() {
  return (
    <article className="eureka-showcase" data-project>
      <div className="eureka-card">
        <header className="eureka-header">
          <div className="eureka-title-group">
            <span className="eureka-title-line">That was when my real</span>
            <span className="eureka-word">&ldquo;EUREKA&rdquo;</span>
            <span className="eureka-title-line">moment happened:</span>
          </div>
          <LightbulbIcon />
        </header>

        <main className="eureka-main">
          <figure className="eureka-tiktok">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/oxy-ad/2/tik.png"
              alt="TikTok video — Dr. Kinh Quang Vinh testing OXY face wash"
              draggable={false}
            />
          </figure>

          <section className="eureka-comments">
            {commentCards.map((card, index) => (
              <article
                className={`eureka-comment-card${index === 0 ? " is-straight" : ""}`}
                key={card.name}
              >
                <header>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.avatar} alt="" loading="lazy" />
                  <strong>{card.name}</strong>
                </header>
                <p>{card.body}</p>
              </article>
            ))}

            <div className="eureka-quote-wrap">
              <blockquote className="eureka-quote">
                <p>
                  <span className="quote-line-highlight">
                    Wait — are people actually criticizing
                  </span>
                  <br />
                  <span className="quote-line-highlight">
                    the new OXY?? Or have they heard so much
                  </span>
                  <br />
                  <span className="quote-line-highlight">
                    criticism of the old version that they won&apos;t try the new one?
                  </span>
                </p>
              </blockquote>

              <span className="eureka-questions" aria-hidden>
                ???
              </span>
              <span className="eureka-scribble" aria-hidden>
                〰
              </span>
            </div>

            <div className="eureka-tape eureka-tape-1" aria-hidden />
            <div className="eureka-tape eureka-tape-2" aria-hidden />
          </section>
        </main>
      </div>
    </article>
  );
}
