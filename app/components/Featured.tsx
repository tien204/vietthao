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
    company: "Mở Mắt Coffee",
    role: "Đồng sáng lập & Trưởng nhóm Nội dung",
    period: "11/2023 – 10/2024",
    summary: "",
    points: [],
    stats: [
      { v: "+127%", l: "người theo dõi (2.200 → 5.000 / 6 tháng)" },
      { v: "293K", l: "lượt xem reels hiệu quả nhất" },
      { v: "141K", l: "views · ~4K likes từ chiến dịch KOC" },
    ],
  },
  {
    no: "02",
    company: "TH Food Chain JSC",
    role: "Thực tập sinh Vận hành Marketing",
    period: "2024",
    summary:
      "Tăng tốc nội dung & PR bằng AI, song song tổ chức sự kiện nội bộ, xử lý tài trợ – hậu cần và brand activation tại hiện trường.",
    points: [
      "Chấp bút & biên tập thông cáo báo chí S-Race 2024 và bài “Cháo tương TH true FOOD”.",
      "Chuẩn bị luồng sự kiện, kịch bản MC, ý tưởng hoạt động và điều phối hiện trường (Trung thu, 8/3…).",
      "Dùng SAP phối hợp kho, theo dõi số lượng – thời gian giao – tài liệu nhà tài trợ.",
      "Điều chỉnh backdrop, setup gian hàng, quản lý PG và chụp ảnh sự kiện.",
    ],
    stats: [
      { v: "-75%", l: "thời gian viết PR (~1 ngày → ~2 giờ)" },
      { v: "2", l: "sự kiện xử lý tài trợ sản phẩm" },
      { v: "~10", l: "hội thảo được nghiên cứu" },
    ],
  },
];

const projects: Project[] = [
  {
    no: "01",
    title: "Gieo mầm tương lai",
    subtitle: "ECO Vietnam Group — Điều phối viên Dự án · 2022",
    summary:
      "Điều phối hoạt động nội dung, gây quỹ và quyên góp; làm việc trực tiếp với các bên liên quan và bám sát tiến độ tới khi về đích.",
    client: "ECO Vietnam Group",
    role: "Điều phối viên Dự án",
    image: "/eco.png",
    stats: [
      { v: "5 triệu", l: "VNĐ gây quỹ chỉ trong 2 tuần" },
      { v: "40+", l: "cuốn sách giáo khoa quyên góp" },
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
          line1="Kinh nghiệm"
          line2="thực tế"
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
        <SectionHeader sectionNo="02" line1="Đồ án" line2="nổi bật" />

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
                    Khách hàng / Tổ chức: <b>{prj.client}</b>
                  </div>
                  <div>
                    Vai trò: <b>{prj.role}</b>
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
