"use client";

export function LayoutEditorResizeHandle({
  onPointerDown,
}: {
  onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      className="layout-editor-resize-handle"
      aria-label="Kéo để phóng to hoặc thu nhỏ"
      onPointerDown={onPointerDown}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
        <path d="M14 5h5v5M10 19H5v-5M19 5l-7 7M5 19l7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
