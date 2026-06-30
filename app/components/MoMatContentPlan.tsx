const contentImages = [
  { src: "/momatcafe/content/1.png", alt: "Kế hoạch đăng tải fanpage Mở Mắt Coffee — tháng 11 và 12", layer: "back" },
  { src: "/momatcafe/content/2.png", alt: "Kế hoạch đăng tải fanpage Mở Mắt Coffee — tháng 12", layer: "front" },
] as const;

const roleIntro =
  "Vận hành thương hiệu từ con số 0: xây hệ thống nội dung, tự sản xuất hình ảnh/video và hợp tác KOC để kéo nhận diện đi lên nhanh.";

const rolePoints = [
  "Quản lý fanpage với lịch nội dung 24 bài/tháng, ứng dụng AI giữ giọng điệu thương hiệu nhất quán.",
  "Tự sản xuất ảnh sản phẩm, ảnh sự kiện/trang trí và video ngắn.",
  "Đặt lịch & điều phối booking KOC (@traivanphongthichreview).",
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
