"use client";

import type { LayerTransform } from "@/app/lib/layout-editor";

type LayoutEditorPanelProps<T extends string> = {
  layerOrder: readonly T[];
  layerLabels: Record<T, string>;
  activeLayer: T;
  setActiveLayer: (id: T) => void;
  activeTransform: LayerTransform;
  onReset: () => void;
  onCopyCss: () => void;
  hint?: string;
  ariaLabel?: string;
};

export function LayoutEditorPanel<T extends string>({
  layerOrder,
  layerLabels,
  activeLayer,
  setActiveLayer,
  activeTransform,
  onReset,
  onCopyCss,
  hint = "Drag layer to move · Drag corner arrow to scale",
  ariaLabel = "Layout editor panel",
}: LayoutEditorPanelProps<T>) {
  const { x, y, scale, rotate } = activeTransform;

  return (
    <aside className="layout-editor-panel" aria-label={ariaLabel}>
      <p className="layout-editor-hint">{hint}</p>
      <div className="layout-editor-tabs" role="tablist" aria-label="Layout layers">
        {layerOrder.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeLayer === id}
            className={activeLayer === id ? "is-active" : ""}
            onClick={() => setActiveLayer(id)}
          >
            {layerLabels[id]}
          </button>
        ))}
      </div>
      <div className="layout-editor-readout">
        <span>
          x: {x}px · y: {y}px · scale: {scale} · rotate: {rotate}°
        </span>
      </div>
      <div className="layout-editor-actions">
        <button type="button" onClick={onReset}>
          Reset
        </button>
        <button type="button" onClick={() => void onCopyCss()}>
          Copy CSS
        </button>
      </div>
    </aside>
  );
}
