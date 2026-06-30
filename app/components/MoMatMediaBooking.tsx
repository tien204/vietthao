"use client";

import { useState, type CSSProperties } from "react";

type Card = (typeof cards)[number];

const cards = [
  {
    image: "/momatcafe/booking/traivanphongthichreview.jpg",
    views: "52.3K",
    pinned: false,
    metrics: { views: "52.3K", likes: "960", comments: "21", shares: "29", saves: "44" },
    creator: "@traivanphongthichreview",
  },
  {
    image: "/momatcafe/booking/anngoncungcam01.jpg",
    pinned: true,
    views: "293K",
    metrics: { views: "293K", likes: "2.1K", comments: "86", shares: "124", saves: "318" },
    creator: "@anngoncungcam01",
  },
  {
    image: "/momatcafe/booking/nguyenleanhtien.jpg",
    views: "141K",
    pinned: false,
    metrics: { views: "141K", likes: "4K", comments: "52", shares: "68", saves: "91" },
    creator: "@nguyenleanhtien",
  },
  {
    image: "/momatcafe/booking/riviuphanthiet.jpg",
    views: "87.5K",
    pinned: false,
    metrics: { views: "87.5K", likes: "1.8K", comments: "34", shares: "41", saves: "56" },
    creator: "@riviuphanthiet",
  },
] as const;

function getCardDistance(index: number, hoveredIndex: number | null) {
  return hoveredIndex === null ? null : Math.abs(index - hoveredIndex);
}

function getCardStyle(index: number, hoveredIndex: number | null, totalCards: number): CSSProperties {
  const distance = getCardDistance(index, hoveredIndex);

  const overlap =
    index === 0
      ? "0px"
      : hoveredIndex === null
        ? "-58px"
        : index === hoveredIndex || index === hoveredIndex + 1
          ? "8px"
          : distance === 2
            ? "-28px"
            : "-58px";

  const rotateY =
    hoveredIndex === index ? "0deg" : distance === 1 ? "-12deg" : "-25deg";

  const scale = hoveredIndex === index ? "0.98" : distance === 1 ? "0.94" : "0.92";

  const y = hoveredIndex === index ? "-10px" : distance === 1 ? "-3px" : "0px";

  const zIndex =
    hoveredIndex === index ? 20 : distance === 1 ? 16 : totalCards - index;

  return {
    "--momat-overlap": overlap,
    "--momat-rotate-y": rotateY,
    "--momat-scale": scale,
    "--momat-y": y,
    "--momat-z": zIndex,
    zIndex,
  } as CSSProperties;
}

export default function MoMatMediaBooking() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="momat-media" data-reveal aria-label="Social Execution — Media Booking">
      <div className="momat-media-head">
        <span className="momat-media-pill momat-media-pill--soft">Social Execution</span>
        <span className="momat-media-pill momat-media-pill--bold">MEDIA BOOKING</span>
      </div>

      <div className="momat-media-stage">
        {cards.map((card, index) => (
          <MediaCard
            card={card}
            index={index}
            key={card.creator + card.views}
            hoveredIndex={hoveredIndex}
            totalCards={cards.length}
            onHover={setHoveredIndex}
          />
        ))}
      </div>
    </section>
  );
}

function MediaCard({
  card,
  index,
  hoveredIndex,
  totalCards,
  onHover,
}: {
  card: Card;
  index: number;
  hoveredIndex: number | null;
  totalCards: number;
  onHover: (index: number | null) => void;
}) {
  return (
    <article
      className="momat-media-card"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={getCardStyle(index, hoveredIndex, totalCards)}
    >
      <div className="momat-media-card-visual">
        <div className="momat-media-card-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image}
            alt={`Preview social content ${index + 1} của Mở Mắt Coffee`}
            draggable={false}
          />

          {card.pinned ? <span className="momat-media-pinned">Đã ghim</span> : null}

          <div className="momat-media-metrics" aria-hidden>
            <MetricItem icon="heart" value={card.metrics.likes} />
            <MetricItem icon="comment" value={card.metrics.comments} />
            <MetricItem icon="share" value={card.metrics.shares} />
          </div>

          <div className="momat-media-views">
            <PlayIcon />
            <span>{card.views}</span>
          </div>
        </div>
      </div>

      <p className="momat-media-creator">{card.creator}</p>
    </article>
  );
}

function MetricItem({ icon, value }: { icon: string; value: string }) {
  return (
    <div className="momat-media-metric">
      <MetricIcon type={icon} />
      <span>{value}</span>
    </div>
  );
}

function MetricIcon({ type }: { type: string }) {
  switch (type) {
    case "heart":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case "comment":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      );
    case "share":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
        </svg>
      );
    case "save":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      );
  }
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
