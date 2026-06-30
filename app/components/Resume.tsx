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
    title: "Đại học Văn Lang",
    sub: "Cử nhân Quan hệ Công chúng · GPA 3.5/4.0",
  },
  { date: "Chứng chỉ", title: "VSTEP 7.5", sub: "Tiếng Anh" },
  {
    date: "Chứng chỉ",
    title: "AIM Academy",
    sub: "Creative Ideas, Real Project",
  },
  {
    date: "Chứng chỉ",
    title: "Design Anthropology School",
    sub: "AI Illustrator Foundation",
  },
];

const career: TimelineItem[] = [
  {
    date: "11/2023 – 10/2024",
    title: "Mở Mắt Coffee",
    sub: "Đồng sáng lập & Trưởng nhóm Nội dung",
  },
  {
    date: "2024",
    title: "TH Food Chain JSC",
    sub: "Thực tập sinh Vận hành Marketing",
  },
  {
    date: "2022",
    title: "ECO Vietnam Group",
    sub: "Điều phối viên — “Gieo mầm tương lai”",
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
  "Lên kế hoạch nội dung",
  "Điều phối sự kiện",
  "Viết PR",
  "Nghiên cứu",
  "Nhiếp ảnh",
];

const capabilitiesRight = [
  "Tư duy phản biện",
  "Quản lý thời gian",
  "Làm việc nhóm",
  "Chịu áp lực tốt",
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
        {/* ---- Hồ sơ ---- */}
        <div className="profile-row" data-reveal>
          <div className="left">
            <h2 className="h-section lg">Giới thiệu bản thân</h2>
            <div className="bio">
              <p>
                Mình là Thảo, một philosoraptor chính hiệu. Câu cửa miệng của mình là
                &ldquo;Cho tui hỏi xíu&rdquo;, nhưng thật ra là để lần ra cái &ldquo;cấn&rdquo;
                trong câu chuyện.
              </p>
              <p>
                Có lẽ vì vậy mà mình luôn bị thu hút bởi truyền thông — không chỉ ở sản phẩm
                cuối cùng, mà ở cả cách một ý tưởng được suy nghĩ, phân tích và hình thành
                phía sau. Mình thích hiểu con người, nhận ra những pattern nhỏ, và tìm xem
                thật ra bên dưới vấn đề đang có điều gì diễn ra.
              </p>
              <p>
                Phần lớn dự án trong portfolio này bắt đầu khá đơn giản: một brief ở trường,
                một task nhỏ ở nơi làm việc, hoặc một thử thách mình tự đặt ra. Portfolio này
                là cách mình cho thấy quá trình mình quan sát, đặt câu hỏi, nối các điểm lại
                với nhau, và cố gắng làm cho sản phẩm cuối cùng hợp lý hơn một chút — vừa học
                thuật, vừa thực chiến, và vẫn đang hoàn thiện.
              </p>
            </div>
            <h3 className="h-section md">Kết nối</h3>
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
                  <span>Bình Thạnh, HCMC</span>
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
                  alt="Chân dung Trần Việt Phương Thảo"
                />
              </div>
              <div className="bname">Trần Việt Phương Thảo</div>
              <div className="bsub">Thực tập sinh Marketing</div>
              <div className="brow">
                <div className="bdate">TP. Hồ Chí Minh</div>
                <QrCode />
              </div>
            </div>
            <i className="cursor-ico">
              <MousePointer2 size={24} />
            </i>
          </div>
        </div>

        {/* ---- Học vấn / Kinh nghiệm ---- */}
        <div className="two-col">
          {/* Cột trái */}
          <div className="col section-gap">
            <h3 className="h-section" style={{ fontSize: 28 }} data-reveal>
              Học vấn
            </h3>
            <div data-reveal>
              <Timeline items={education} />
            </div>

            <h3 className="h-section" style={{ fontSize: 28 }} data-reveal>
              Công cụ
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

          {/* Cột phải */}
          <div className="col section-gap">
            <h3 className="h-section" style={{ fontSize: 28 }} data-reveal>
              Kinh nghiệm
            </h3>
            <div data-reveal>
              <Timeline items={career} />
            </div>

            <h3 className="h-section" style={{ fontSize: 28 }} data-reveal>
              Năng lực
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
