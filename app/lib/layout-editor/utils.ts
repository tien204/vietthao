import type { CSSProperties } from "react";
import type { LayerLayout, LayerTransform } from "./types";

export function roundLayout(n: number) {
  return Math.round(n * 100) / 100;
}

export function clampScale(n: number, min: number, max: number) {
  return roundLayout(Math.min(max, Math.max(min, n)));
}

export function mergeLayout<T extends string>(
  defaults: LayerLayout<T>,
  partial?: Partial<Record<T, Partial<LayerTransform>>>
): LayerLayout<T> {
  return (Object.keys(defaults) as T[]).reduce<LayerLayout<T>>(
    (acc, id) => {
      acc[id] = { ...defaults[id], ...partial?.[id] };
      return acc;
    },
    { ...defaults }
  );
}

export function loadLayoutFromStorage<T extends string>(
  storageKey: string,
  defaults: LayerLayout<T>
): LayerLayout<T> {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<Record<T, Partial<LayerTransform>>>;
    return mergeLayout(defaults, parsed);
  } catch {
    return defaults;
  }
}

export function layoutToCssVars<T extends string>(
  layout: LayerLayout<T>,
  prefix: string
): CSSProperties {
  const vars: Record<string, string> = {};
  (Object.keys(layout) as T[]).forEach((id) => {
    const t = layout[id];
    vars[`--${prefix}-${id}-x`] = `${t.x}px`;
    vars[`--${prefix}-${id}-y`] = `${t.y}px`;
    vars[`--${prefix}-${id}-scale`] = String(t.scale);
    vars[`--${prefix}-${id}-rotate`] = `${t.rotate}deg`;
  });
  return vars as CSSProperties;
}

export function layoutToCssText<T extends string>(layout: LayerLayout<T>, prefix: string) {
  return (Object.keys(layout) as T[])
    .map((id) => {
      const t = layout[id];
      return `  --${prefix}-${id}-x: ${t.x}px;\n  --${prefix}-${id}-y: ${t.y}px;\n  --${prefix}-${id}-scale: ${t.scale};\n  --${prefix}-${id}-rotate: ${t.rotate}deg;`;
    })
    .join("\n");
}

export function layoutToCssBlock<T extends string>(
  layout: LayerLayout<T>,
  selector: string,
  prefix: string
) {
  return `${selector} {\n${layoutToCssText(layout, prefix)}\n}`;
}
