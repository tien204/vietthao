"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, EASE_EMPHASIS } from "../lib/motion";
import {
  OxyStrategyCard,
  EurekaMomentCard,
  InsightSlideCard,
  ReframeSlideCard,
  BigIdeaSlideCard,
  TaglineSlideCard,
  PlanSlideCard,
  WhyItWorksSlideCard,
} from "./oxy-ad";
import {
  ProjectPortfolioSlide,
  ResearchFocusSlide,
  ResearchApproachSlide,
  KeyInsightConvenienceSlide,
  KeyInsightFiveSecondsSlide,
  ContentImplicationsSlide,
} from "./bxv-ad";
import MoMatMediaBooking from "./MoMatMediaBooking";
import MoMatContentPlan from "./MoMatContentPlan";
import ThFoodInternalEvent from "./ThFoodInternalEvent";
import ThFoodPRWriting from "./ThFoodPRWriting";
import ThFoodSponsorshipActivation from "./ThFoodSponsorshipActivation";

gsap.registerPlugin(ScrollTrigger);

function splitChars(text: string, prefix: string) {
  return Array.from(text).map((ch, i) => (
    <span className="char" key={prefix + i}>
      {ch === " " ? " " : ch}
    </span>
  ));
}

type Experience = {
  no: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
  stats: { v: string; l: string }[];
};

type Project = {
  no: string;
  title: string;
  subtitle: string;
  summary: string;
  client: string;
  role: string;
  image: string;
  stats: { v: string; l: string }[];
};

const experiences: Experience[] = [
  {
    no: "01",
    company: "Mo Mat Coffee",
    role: "Co-founder & Content Team Lead",
    period: "11/2023 – 10/2024",
    summary: "",
    points: [],
    stats: [
      { v: "+127%", l: "followers (2,200 → 5,000 / 6 months)" },
      { v: "293K", l: "views on top-performing reels" },
      { v: "141K", l: "views · ~4K likes from KOC campaign" },
    ],
  },
  {
    no: "02",
    company: "TH Food Chain JSC",
    role: "Marketing Operations Intern",
    period: "2024",
    summary:
      "Accelerated content and PR with AI while organizing internal events, handling sponsorship logistics, and on-site brand activation.",
    points: [
      "Drafted and edited press releases for S-Race 2024 and the \u201cCh\u00e1o t\u01b0\u01a1ng TH true FOOD\u201d article.",
      "Prepared event flows, MC scripts, activity ideas, and on-site coordination (Mid-Autumn Festival, International Women's Day, etc.).",
      "Used SAP to coordinate with warehouse teams, track quantities, delivery timelines, and sponsor documentation.",
      "Adjusted backdrops, set up booths, managed brand ambassadors, and photographed events.",
    ],
    stats: [
      { v: "-75%", l: "PR writing time (~1 day → ~2 hours)" },
      { v: "2", l: "product sponsorship events handled" },
      { v: "~10", l: "conferences researched" },
    ],
  },
];

const projects: Project[] = [
  {
    no: "01",
    title: "Planting Seeds for the Future",
    subtitle: "ECO Vietnam Group — Project Coordinator · 2022",
    summary:
      "Coordinated content activities, fundraising, and donations; worked directly with stakeholders and tracked progress through to completion.",
    client: "ECO Vietnam Group",
    role: "Project Coordinator",
    image: "/eco.png",
    stats: [
      { v: "5M", l: "VND raised in just 2 weeks" },
      { v: "40+", l: "textbooks donated" },
    ],
  },
];

function SectionHeader({
  sectionNo,
  line1,
  line2,
}: {
  sectionNo: string;
  line1: string;
  line2: string;
}) {
  return (
    <div className="featured-header">
      <div className="title">
        {splitChars(line1, `${sectionNo}-a`)}
        <br />
        <span className="line2-indent" aria-hidden="true" />
        {splitChars(line2, `${sectionNo}-b`)}
      </div>
      <div className="retro-device">
        <div className="screen">
          <span>{sectionNo}</span>
        </div>
        <div className="buttons">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

export default function Featured() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isOxyExpanded, setIsOxyExpanded] = useState(false);
  const [isBxvExpanded, setIsBxvExpanded] = useState(false);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [
          ...q(".title"),
          ...q(".char"),
          ...q(".retro-device"),
          ...q(".retro-device .screen span"),
          ...q("[data-xp] *"),
          ...q("[data-project] *"),
          ...q(".oxy-showcase *"),
          ...q(".eureka-showcase *"),
          ...q(".oxy-slide *"),
        ],
        { autoAlpha: 1, clearProps: "transform" }
      );
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      q(".featured-block").forEach((block) => {
        const bq = gsap.utils.selector(block);
        const header = bq(".featured-header")[0];
        const chars = bq(".char");

        gsap
          .timeline({
            scrollTrigger: { trigger: header, start: "top 80%", once: true },
            defaults: { ease: EASE },
          })
          .from(bq(".retro-device"), {
            scale: 0.6,
            autoAlpha: 0,
            rotation: -8,
            transformOrigin: "center",
            ease: EASE_EMPHASIS,
            duration: DUR.enter,
          })
          .from(
            bq(".retro-device .screen span"),
            { scale: 0.4, autoAlpha: 0, ease: EASE_EMPHASIS, duration: DUR.fast },
            "-=0.4"
          )
          .from(
            chars,
            {
              y: 28,
              autoAlpha: 0,
              duration: DUR.fast,
              stagger: { each: 0.04, from: "start" },
            },
            "-=0.3"
          );
      });

      q("[data-xp]").forEach((el) => {
        const eq = gsap.utils.selector(el);
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            defaults: { ease: EASE },
          })
          .from(eq(".xp-index"), {
            xPercent: -40,
            autoAlpha: 0,
            duration: DUR.enter,
          })
          .from(
            eq(".xp-head"),
            { y: 24, autoAlpha: 0, duration: DUR.fast },
            "-=0.35"
          )
          .from(
            eq(".xp-sum"),
            { y: 18, autoAlpha: 0, duration: DUR.fast },
            "-=0.3"
          )
          .from(
            eq(".xp-points li"),
            { y: 14, autoAlpha: 0, duration: 0.4, stagger: 0.08 },
            "-=0.3"
          )
          .from(
            eq(".stat"),
            {
              y: 18,
              autoAlpha: 0,
              scale: 0.92,
              duration: DUR.fast,
              stagger: 0.1,
              ease: EASE_EMPHASIS,
            },
            "-=0.25"
          );
      });

      q(".project-card[data-project]").forEach((el) => {
        const pq = gsap.utils.selector(el);
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            defaults: { ease: EASE },
          })
          .from(pq(".img"), {
            xPercent: -20,
            autoAlpha: 0,
            duration: DUR.enter,
          })
          .from(
            pq(".info > *"),
            { y: 24, autoAlpha: 0, duration: DUR.fast, stagger: 0.12 },
            "-=0.35"
          )
          .from(
            pq(".prj-stat"),
            {
              y: 18,
              autoAlpha: 0,
              scale: 0.92,
              duration: DUR.fast,
              stagger: 0.1,
              ease: EASE_EMPHASIS,
            },
            "-=0.2"
          );
      });

      q(".oxy-showcase[data-project]").forEach((el) => {
        const oq = gsap.utils.selector(el);
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            defaults: { ease: EASE },
          })
          .from(oq(".oxy-card"), {
            y: 32,
            autoAlpha: 0,
            duration: DUR.enter,
            ease: EASE_EMPHASIS,
          })
          .from(
            oq(".asset-title > *"),
            { y: 20, autoAlpha: 0, duration: DUR.fast, stagger: 0.1 },
            "-=0.4"
          )
          .from(
            oq(".oxy-info-row"),
            { y: 16, autoAlpha: 0, duration: DUR.fast, stagger: 0.08 },
            "-=0.3"
          )
          .from(
            oq(".oxy-visual > *"),
            { y: 24, autoAlpha: 0, duration: DUR.fast, stagger: 0.08 },
            "-=0.35"
          )
          .from(
            oq(".oxy-srm-hero"),
            { scale: 0.92, autoAlpha: 0, duration: DUR.fast },
            "-=0.35"
          )
          .from(
            oq(".oxy-figure"),
            { autoAlpha: 0, duration: DUR.fast },
            "-=0.35"
          );
      });

      q(".eureka-showcase[data-project]").forEach((el) => {
        const eq = gsap.utils.selector(el);
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            defaults: { ease: EASE },
          })
          .from(eq(".eureka-card"), {
            y: 32,
            autoAlpha: 0,
            duration: DUR.enter,
            ease: EASE_EMPHASIS,
          })
          .from(
            eq(".eureka-header > *"),
            { y: 20, autoAlpha: 0, duration: DUR.fast, stagger: 0.1 },
            "-=0.4"
          )
          .from(
            eq(".eureka-main > *"),
            { y: 20, autoAlpha: 0, duration: DUR.fast, stagger: 0.1 },
            "-=0.25"
          )
          .from(
            eq(".eureka-comment-card"),
            { y: 20, autoAlpha: 0, duration: DUR.fast, stagger: 0.12 },
            "-=0.2"
          )
          .from(
            eq(".eureka-quote-wrap > *"),
            { y: 16, autoAlpha: 0, duration: DUR.fast, stagger: 0.1 },
            "-=0.15"
          );
      });

      q(".oxy-slide[data-project]").forEach((el) => {
        const sq = gsap.utils.selector(el);
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            defaults: { ease: EASE },
          })
          .from(sq(".oxy-slide-card"), {
            y: 32,
            autoAlpha: 0,
            duration: DUR.enter,
            ease: EASE_EMPHASIS,
          })
          .from(
            sq(".oxy-slide-heading, .oxy-slide-tagline-title, .oxy-slide-why-title, .oxy-slide-plan-kicker, .oxy-slide-big-idea-label"),
            { y: 20, autoAlpha: 0, duration: DUR.fast, stagger: 0.08 },
            "-=0.35"
          )
          .from(
            sq(".oxy-slide-body, .oxy-slide-reframe-text > p, .oxy-slide-big-idea-desc, .oxy-slide-tagline-box, .oxy-slide-tagline-note-text, .oxy-slide-plan-card, .oxy-slide-why-pillar"),
            { y: 18, autoAlpha: 0, duration: DUR.fast, stagger: 0.08 },
            "-=0.25"
          )
          .from(
            sq(".oxy-slide-insight-products, .oxy-slide-reframe-backdrop-img, .oxy-slide-reframe-portrait, .oxy-slide-big-idea-img, .oxy-slide-tagline-char, .oxy-slide-plan-quote-wrap, .oxy-slide-why-banner"),
            { y: 20, autoAlpha: 0, duration: DUR.fast, stagger: 0.1 },
            "-=0.2"
          )
          .from(
            sq(".oxy-visual > *"),
            { y: 24, autoAlpha: 0, duration: DUR.fast, stagger: 0.08 },
            "-=0.25"
          );
      });
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!isOxyExpanded && !isBxvExpanded) return;

    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(refreshId);
  }, [isOxyExpanded, isBxvExpanded]);

  return (
    <section className="featured" ref={sectionRef}>
      <div className="featured-block">
        <SectionHeader
          sectionNo="01"
          line1="Real-world"
          line2="Experience"
        />

        <div className="xp-list">
          {experiences.map((xp) => (
            <Fragment key={xp.no}>
              <article className="xp" data-xp>
                <div className="xp-index">{xp.no}</div>
                <div className="xp-body">
                  <div className="xp-head">
                    <span className="xp-co">{xp.company}</span>
                    <span className="xp-role">
                      {xp.role} · {xp.period}
                    </span>
                  </div>
                  {xp.summary ? <p className="xp-sum">{xp.summary}</p> : null}
                  {xp.points.length > 0 ? (
                    <ul className="xp-points">
                      {xp.points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="xp-stats">
                    {xp.stats.map((s, i) => (
                      <div className="stat" key={i}>
                        <b>{s.v}</b>
                        <span>{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
              {xp.no === "01" && (
                <>
                  <MoMatContentPlan />
                  <MoMatMediaBooking />
                </>
              )}
              {xp.no === "02" && (
                <>
                  <ThFoodInternalEvent />
                  <ThFoodPRWriting />
                  <ThFoodSponsorshipActivation />
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="featured-block">
        <SectionHeader sectionNo="02" line1="Featured" line2="Projects" />

        <div className="project-list">
          <OxyStrategyCard
            expanded={isOxyExpanded}
            onToggleExpanded={() => setIsOxyExpanded((prev) => !prev)}
          />
          <div
            id="oxy-ad-more"
            className={`oxy-ad-more${isOxyExpanded ? " is-expanded" : ""}`}
            aria-hidden={!isOxyExpanded}
          >
            <EurekaMomentCard />
            <InsightSlideCard />
            <ReframeSlideCard />
            <BigIdeaSlideCard />
            <TaglineSlideCard />
            <PlanSlideCard />
            <WhyItWorksSlideCard />
          </div>

          <ProjectPortfolioSlide
            expanded={isBxvExpanded}
            onToggleExpanded={() => setIsBxvExpanded((prev) => !prev)}
          />
          <div
            id="bxv-ad-more"
            className={`bxv-ad-more${isBxvExpanded ? " is-expanded" : ""}`}
            aria-hidden={!isBxvExpanded}
          >
            <ResearchFocusSlide />
            <ResearchApproachSlide />
            <KeyInsightConvenienceSlide />
            <KeyInsightFiveSecondsSlide />
            <ContentImplicationsSlide />
          </div>

          {projects.map((prj) => (
            <article className="project-card" data-project key={prj.no}>
              <div
                className="img img--logo"
                style={{ backgroundImage: `url('${prj.image}')` }}
                role="img"
                aria-label={prj.title}
              />
              <div className="info">
                <div>
                  <div className="ptitle">{prj.title}</div>
                  <div className="psub">{prj.subtitle}</div>
                  <p className="prj-sum">{prj.summary}</p>
                  <div className="prj-stats">
                    {prj.stats.map((s, i) => (
                      <div className="prj-stat stat" key={i}>
                        <b>{s.v}</b>
                        <span>{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="meta">
                  <div>
                    Client / Organization: <b>{prj.client}</b>
                  </div>
                  <div>
                    Role: <b>{prj.role}</b>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
