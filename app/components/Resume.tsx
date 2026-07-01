import { Mail, Phone, MapPin, Linkedin, MousePointer2 } from "lucide-react";
import QrCode from "./QrCode";

type TimelineItem = {
  date: string;
  title: string;
  sub: string;
};

const education: TimelineItem[] = [
  {
    date: "2025 / 2021",
    title: "Van Lang University",
    sub: "Bachelor of Public Relations · GPA 3.5/4.0",
  },
  { date: "Certificate", title: "VSTEP 7.5", sub: "English" },
  {
    date: "Certificate",
    title: "AIM Academy",
    sub: "Creative Ideas, Real Project",
  },
  {
    date: "Certificate",
    title: "Design Anthropology School",
    sub: "AI Illustrator Foundation",
  },
];

const career: TimelineItem[] = [
  {
    date: "11/2023 – 10/2024",
    title: "Mo Mat Coffee",
    sub: "Co-founder & Content Team Lead",
  },
  {
    date: "2024",
    title: "TH Food Chain JSC",
    sub: "Marketing Operations Intern",
  },
  {
    date: "2022",
    title: "ECO Vietnam Group",
    sub: "Coordinator — \u201cPlanting Seeds for the Future\u201d",
  },
];

const tools: Array<{ name: string; src: string }> = [
  { name: "ChatGPT", src: "/logos/openai.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "MidJourney", src: "/logos/midjourney.svg" },
  { name: "Canva", src: "/logos/canva.svg" },
  { name: "Photoshop", src: "/logos/adobephotoshop.svg" },
  { name: "Premiere Pro", src: "/logos/adobepremierepro.svg" },
];

const capabilitiesLeft = [
  "Content planning",
  "Event coordination",
  "PR writing",
  "Research",
  "Photography",
];

const capabilitiesRight = [
  "Critical thinking",
  "Time management",
  "Teamwork",
  "Works well under pressure",
];

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div className="tl-item" key={i}>
          <span className="dot" />
          <div className="content">
            <div className="date">{item.date}</div>
            <div className="ttitle">{item.title}</div>
            <div className="tsub">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Resume() {
  return (
    <section className="resume about">
      <div className="card combined-card">
        {/* ---- Profile ---- */}
        <div className="profile-row" data-reveal>
          <div className="left">
            <h2 className="h-section lg">About Me</h2>
            <div className="bio">
              <p>
                I&apos;m Thao, a true philosoraptor at heart. My catchphrase is
                &ldquo;Let me ask you something real quick,&rdquo; but what I really mean is
                finding the friction in the story.
              </p>
              <p>
                Maybe that&apos;s why I&apos;m always drawn to communications — not just the
                finished product, but the thinking, analysis, and shaping behind every idea.
                I love understanding people, spotting small patterns, and digging into what
                is actually happening beneath the surface.
              </p>
              <p>
                Most projects in this portfolio started pretty simply: a school brief, a small
                task at work, or a challenge I set for myself. This portfolio is how I show the
                process of observing, asking questions, connecting the dots, and trying to make
                the final output a little more coherent — part academic, part hands-on, and still
                a work in progress.
              </p>
            </div>
            <h3 className="h-section md">Connect</h3>
            <div className="contact-grid">
              <div className="contact-col">
                <div className="contact-row">
                  <span className="chip-ico">
                    <Mail size={18} />
                  </span>
                  <a href="mailto:phuongthao16002@gmail.com">phuongthao16002@gmail.com</a>
                </div>
                <div className="contact-row">
                  <span className="chip-ico">
                    <Phone size={18} />
                  </span>
                  <a href="tel:+84916958757">0916 958 757</a>
                </div>
              </div>
              <div className="contact-col">
                <div className="contact-row">
                  <span className="chip-ico">
                    <MapPin size={18} />
                  </span>
                  <span>Binh Thanh District, HCMC</span>
                </div>
                <div className="contact-row">
                  <span className="chip-ico">
                    <Linkedin size={18} />
                  </span>
                  <a
                    href="https://www.linkedin.com/in/tranthao1602/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/tranthao1602
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="badge-area">
            <svg className="starburst" viewBox="0 0 100 100" aria-hidden="true">
              <polygon
                fill="#F5C518"
                points="50,0 60,32 92,20 70,46 100,58 66,60 76,94 50,72 24,94 34,60 0,58 30,46 8,20 40,32"
              />
            </svg>
            <div className="id-badge">
              <div className="photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/avatar.png"
                  alt="Portrait of Thao Tran"
                />
              </div>
              <div className="bname">Thao Tran</div>
              <div className="bsub">Marketing Intern</div>
              <div className="brow">
                <div className="bdate">Ho Chi Minh City</div>
                <QrCode />
              </div>
            </div>
            <i className="cursor-ico">
              <MousePointer2 size={24} />
            </i>
          </div>
        </div>

        {/* ---- Education / Experience ---- */}
        <div className="two-col">
          {/* Left column */}
          <div className="col section-gap">
            <h3 className="h-section" style={{ fontSize: 28 }} data-reveal>
              Education
            </h3>
            <div data-reveal>
              <Timeline items={education} />
            </div>

            <h3 className="h-section" style={{ fontSize: 28 }} data-reveal>
              Tools
            </h3>
            <div className="toolkit-grid" data-reveal>
              <div className="toolkit-row">
                {tools.slice(0, 3).map((t) => (
                  <div className="tool-tile logo" key={t.name} title={t.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.src} alt={t.name} />
                    <span className="tool-name">{t.name}</span>
                  </div>
                ))}
              </div>
              <div className="toolkit-row">
                {tools.slice(3).map((t) => (
                  <div className="tool-tile logo" key={t.name} title={t.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.src} alt={t.name} />
                    <span className="tool-name">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col section-gap">
            <h3 className="h-section" style={{ fontSize: 28 }} data-reveal>
              Experience
            </h3>
            <div data-reveal>
              <Timeline items={career} />
            </div>

            <h3 className="h-section" style={{ fontSize: 28 }} data-reveal>
              Capabilities
            </h3>
            <div className="cap-grid" data-reveal>
              <div className="cap-col">
                {capabilitiesLeft.map((c) => (
                  <div className="cap-row" key={c}>
                    <i />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
              <div className="cap-col">
                {capabilitiesRight.map((c) => (
                  <div className="cap-row" key={c}>
                    <i />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
