// Deterministic QR placeholder grid (5×5), ported from the inline script.
const PATTERN = [
  1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
];

export default function QrCode() {
  return (
    <div className="qr" id="qr">
      {PATTERN.map((on, i) => (
        <i key={i} className={on ? undefined : "off"} />
      ))}
    </div>
  );
}
