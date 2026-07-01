const contentImages = [
  { src: "/momatcafe/content/1.png", alt: "Mo Mat Coffee fanpage posting schedule — November and December", layer: "back" },
  { src: "/momatcafe/content/2.png", alt: "Mo Mat Coffee fanpage posting schedule — December", layer: "front" },
] as const;

const roleIntro =
  "Built the brand from zero: content system, in-house photo/video production, and KOC partnerships to grow awareness fast.";

const rolePoints = [
  "Managed the fanpage with a 24-post/month content calendar, using AI to keep brand voice consistent.",
  "Produced product photos, event/decor photos, and short-form videos in-house.",
  "Scheduled and coordinated KOC bookings (@traivanphongthichreview).",
];

export default function MoMatContentPlan() {
  return (
    <section className="momat-cp" data-reveal aria-label="Content Plan — My role">
      <div className="momat-cp-head">
        <span className="momat-cp-pill">Content Plan</span>
      </div>

      <div className="momat-cp-body">
        <div className="momat-cp-visual">
          {contentImages.map((image) => (
            <div className={`momat-cp-sheet momat-cp-sheet--${image.layer}`} key={image.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} draggable={false} />
            </div>
          ))}
        </div>

        <div className="momat-cp-role">
          <h3 className="momat-cp-role-title">My role</h3>
          <p className="momat-cp-role-intro">{roleIntro}</p>
          <ul className="momat-cp-role-list">
            {rolePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
