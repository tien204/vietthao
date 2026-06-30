"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  clampScale,
  layoutToCssBlock,
  layoutToCssVars,
  loadLayoutFromStorage,
  roundLayout,
  type LayoutEditorConfig,
  type LayerLayout,
  type LayerTransform,
} from "@/app/lib/layout-editor";

export function useLayoutEditor<T extends string>(config: LayoutEditorConfig<T>) {
  const {
    defaultLayout,
    storageKey,
    cssVarPrefix,
    cssSelector,
    layerOrder,
    defaultActiveLayer,
    editQueryParam,
    minScale = 0.25,
    maxScale = 2.5,
  } = config;

  const initialActive = defaultActiveLayer ?? layerOrder[0];

  const [layout, setLayout] = useState<LayerLayout<T>>(defaultLayout);
  const [editMode, setEditMode] = useState(false);
  const [activeLayer, setActiveLayer] = useState<T>(initialActive);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (editQueryParam && new URLSearchParams(window.location.search).get(editQueryParam) === "1") {
      setEditMode(true);
      setLayout(loadLayoutFromStorage(storageKey, defaultLayout));
    }
    setHydrated(true);
  }, [defaultLayout, editQueryParam, storageKey]);

  useEffect(() => {
    if (!hydrated || !editMode) return;
    localStorage.setItem(storageKey, JSON.stringify(layout));
  }, [layout, hydrated, editMode, storageKey]);

  const updateLayer = useCallback((id: T, patch: Partial<LayerTransform>) => {
    setLayout((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }));
  }, []);

  const resetLayout = useCallback(() => {
    setLayout(defaultLayout);
    localStorage.removeItem(storageKey);
  }, [defaultLayout, storageKey]);

  const cssVars = useMemo(
    () => layoutToCssVars(layout, cssVarPrefix),
    [layout, cssVarPrefix]
  );

  const startDrag = useCallback(
    (id: T, startX: number, startY: number) => {
      const origin = layout[id];
      const onMove = (e: PointerEvent) => {
        updateLayer(id, {
          x: roundLayout(origin.x + (e.clientX - startX)),
          y: roundLayout(origin.y + (e.clientY - startY)),
        });
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [layout, updateLayer]
  );

  const startResize = useCallback(
    (id: T, startX: number, startY: number) => {
      const origin = layout[id];
      const onMove = (e: PointerEvent) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const delta = (dx + dy) / 100;
        updateLayer(id, { scale: clampScale(origin.scale + delta, minScale, maxScale) });
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [layout, maxScale, minScale, updateLayer]
  );

  const copyCss = useCallback(async () => {
    const text = layoutToCssBlock(layout, cssSelector, cssVarPrefix);
    await navigator.clipboard.writeText(text);
  }, [cssSelector, cssVarPrefix, layout]);

  const enterEditMode = useCallback(() => {
    setLayout(loadLayoutFromStorage(storageKey, defaultLayout));
    setEditMode(true);
  }, [defaultLayout, storageKey]);

  const exitEditMode = useCallback(() => {
    setEditMode(false);
  }, []);

  const handleMoveStart = useCallback(
    (id: T, e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      startDrag(id, e.clientX, e.clientY);
    },
    [startDrag]
  );

  const handleResizeStart = useCallback(
    (id: T, e: React.PointerEvent) => {
      startResize(id, e.clientX, e.clientY);
    },
    [startResize]
  );

  return {
    layout,
    editMode,
    enterEditMode,
    exitEditMode,
    activeLayer,
    setActiveLayer,
    cssVars,
    resetLayout,
    copyCss,
    startDrag,
    startResize,
    updateLayer,
    handleMoveStart,
    handleResizeStart,
    layerOrder,
    layerLabels: config.layerLabels,
  };
}
