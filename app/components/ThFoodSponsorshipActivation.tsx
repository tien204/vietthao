"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, REVEAL_START } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const roleItems = [
  { icon: "handshake", label: "Partner outreach" },
  { icon: "logistics", label: "Logistics coordination" },
  { icon: "onsite", label: "On-site execution" },
] as const;

const stats = [
  {
    icon: "ribbon",
    value: "2 sponsorships",
    label: "Successfully secured",
  },
  {
    icon: "people",
    value: "~100 participants",
    label: "Across 2 workshops",
  },
  {
    icon: "star",
    value: "Brand fit",
    label: "Aligned with health & lifestyle positioning",
  },
] as const;

const visualImages = [
  {
    src: "/th_food/sponsor/1.png",
    alt: "TH true OAT workshop — on-site presentation",
  },
  {
    src: "/th_food/sponsor/2.png",
    alt: "TH true OAT product display at sponsorship event",
  },
  {
    src: "/th_food/sponsor/onsite.png",
    alt: "TH true OAT on-site activation",
  },
] as const;

export default function ThFoodSponsorshipActivation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...q(".th-sponsor-left > *"), ...q(".th-sponsor-photo")], {
          autoAlpha: 1,
          clearProps: "transform",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(q(".th-sponsor-left > *"), { autoAlpha: 0, y: 18 });
        gsap.set(q(".th-sponsor-photo"), { autoAlpha: 0, y: 28, scale: 0.96 });

        gsap
          .timeline({
            scrollTrigger: { trigger: root, start: REVEAL_START, once: true },
            defaults: { ease: EASE },
          })
          .to(q(".th-sponsor-title, .th-sponsor-kicker"), {
            autoAlpha: 1,
            y: 0,
            duration: DUR.fast,
            stagger: 0.08,
          })
          .to(
            q(".th-sponsor-panel, .th-sponsor-stats"),
            { autoAlpha: 1, y: 0, duration: DUR.fast, stagger: 0.1 },
            "-=0.2"
          )
          .to(
            q(".th-sponsor-photo"),
            { autoAlpha: 1, y: 0, scale: 1, duration: DUR.fast, stagger: 0.12 },
            "-=0.15"
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="th-sponsor"
      data-reveal
      ref={sectionRef}
      aria-label="Sponsorship Activation — TH true OAT"
    >
      <div className="th-sponsor-body">
        <div className="th-sponsor-left">
          <h3 className="th-sponsor-title">Sponsorship Activation</h3>
          <p className="th-sponsor-kicker">TH true OAT</p>

          <div className="th-sponsor-panel">
            <p className="th-sponsor-desc">
              Coordinated a sponsorship campaign for the newly launched TH true OAT, from
              identifying suitable workshops and contacting partners to product delivery,
              logistics, and on-site execution.
            </p>

            <div className="th-sponsor-divider" aria-hidden />

            <p className="th-sponsor-result">
              Secured two sponsorship opportunities and reached around 100 participants across
              both events.
            </p>

            <div className="th-sponsor-divider" aria-hidden />

            <ul className="th-sponsor-role-list">
              {roleItems.map((item) => (
                <li key={item.label}>
                  <span className="th-sponsor-role-icon" aria-hidden>
                    <RoleIcon type={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="th-sponsor-stats">
            {stats.map((item) => (
              <div className="th-sponsor-stat" key={item.value}>
                <span className="th-sponsor-stat-icon" aria-hidden>
                  <StatIcon type={item.icon} />
                </span>
                <b>{item.value}</b>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="th-sponsor-visual">
          {visualImages.map((image) => (
            <div className="th-sponsor-photo" key={image.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleIcon({ type }: { type: string }) {
  switch (type) {
    case "logistics":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <path d="M3.3 7.3L12 12l8.7-4.7M12 22V12" />
        </svg>
      );
    case "onsite":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M11 12h2a2 2 0 100-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
          <path d="M7 18l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1.4 2.8 1.2l3.2 3.4" />
          <path d="M2 12l3-3 3 3M19 9l3 3-3 3" />
        </svg>
      );
  }
}

function StatIcon({ type }: { type: string }) {
  switch (type) {
    case "people":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="12" cy="8" r="5" />
          <path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5" />
        </svg>
      );
  }
}
