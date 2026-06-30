export type LayerTransform = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
};

export type LayerLayout<T extends string> = Record<T, LayerTransform>;

export type LayoutEditorConfig<T extends string> = {
  defaultLayout: LayerLayout<T>;
  storageKey: string;
  /** CSS var prefix, e.g. "oxy" → --oxy-figure-x */
  cssVarPrefix: string;
  /** Selector for Copy CSS output, e.g. ".oxy-showcase" */
  cssSelector: string;
  layerOrder: readonly T[];
  layerLabels: Record<T, string>;
  defaultActiveLayer?: T;
  /** URL query param to auto-enter edit mode, e.g. "oxy-edit" */
  editQueryParam?: string;
  minScale?: number;
  maxScale?: number;
};
