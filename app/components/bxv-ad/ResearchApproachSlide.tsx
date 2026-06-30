import BxvSlideShell from "./BxvSlideShell";

const phases = [
  {
    step: "01",
    title: "Desk Research",
    image: "/bxv-ad/3/researchdesk.jpg",
    alt: "Desk Research",
    description: "Understand the category, brand context, and early hypotheses.",
    icon: FolderIcon,
  },
  {
    step: "02",
    title: "Qualitative Research",
    image: "/bxv-ad/3/qualityresearch.jpg",
    alt: "Qualitative Research",
    description: "Explore cooking behavior, motivations, barriers, and content expectations.",
    icon: UsersIcon,
  },
  {
    step: "03",
    title: "Quantitative Survey",
    image: "/bxv-ad/3/quatativeservey.jpg",
    alt: "Quantitative Survey",
    description:
      "Validate key patterns and measure how strongly each barrier affects purchase decision.",
    icon: ChartIcon,
  },
] as const;

export default function ResearchApproachSlide() {
  return (
    <BxvSlideShell className="bxv-slide--approach">
      <header className="bxv-approach-header">
        <span className="bxv-approach-index">03</span>
        <div className="bxv-approach-kicker">
          <span>Research</span>
          <span>Approach</span>
        </div>
      </header>

      <h1 className="bxv-approach-hero">
        3-Phase
        <br />
        Research Approach
      </h1>

      <div className="bxv-approach-phases">
        {phases.map((phase) => (
          <article className="bxv-approach-phase" key={phase.step}>
            <div className="bxv-approach-phase-badge" aria-hidden>
              <phase.icon />
            </div>
            <span className="bxv-approach-phase-step">{phase.step}</span>
            <h3>{phase.title}</h3>
            <div className="bxv-approach-phase-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={phase.image} alt={phase.alt} draggable={false} />
            </div>
            <p>{phase.description}</p>
          </article>
        ))}
      </div>

      <div className="bxv-approach-contribution">
        <div className="bxv-approach-star" aria-hidden>
          <StarIcon />
        </div>
        <div>
          <h4>My Contribution</h4>
          <p>
            I helped keep the research direction focused by turning a broad business question into
            answerable research areas.
          </p>
        </div>
      </div>
    </BxvSlideShell>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 19a5 5 0 0 1 10 0H3zm11 0a4 4 0 0 1 7 0h-7z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5 19V9h4v10H5zm6 0V5h4v14h-4zm6 0v-7h4v7h-4z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.9L22 10.2l-5.3 4.6L18.2 22 12 18.3 5.8 22l1.5-7.2L2 10.2l7.1-1.3L12 2z" />
    </svg>
  );
}
