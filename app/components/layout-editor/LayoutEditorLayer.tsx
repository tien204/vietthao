"use client";

import { LayoutEditorResizeHandle } from "./LayoutEditorResizeHandle";

type LayoutEditorLayerProps<T extends string> = {
  id: T;
  className: string;
  editMode: boolean;
  activeLayer: T;
  children: React.ReactNode;
  setActiveLayer: (id: T) => void;
  onMoveStart: (id: T, e: React.PointerEvent) => void;
  onResizeStart: (id: T, e: React.PointerEvent) => void;
  role?: string;
  ariaLabel?: string;
};

export function LayoutEditorLayer<T extends string>({
  id,
  className,
  editMode,
  activeLayer,
  children,
  setActiveLayer,
  onMoveStart,
  onResizeStart,
  role,
  ariaLabel,
}: LayoutEditorLayerProps<T>) {
  const isActive = editMode && activeLayer === id;

  return (
    <div
      className={`${className}${editMode ? " layout-editor-layer" : ""}${isActive ? " is-active" : ""}`}
      role={role}
      aria-label={ariaLabel}
      onPointerDown={
        editMode
          ? (e) => {
              if ((e.target as HTMLElement).closest(".layout-editor-resize-handle")) return;
              e.preventDefault();
              e.stopPropagation();
              setActiveLayer(id);
              onMoveStart(id, e);
            }
          : undefined
      }
    >
      {children}
      {isActive && (
        <LayoutEditorResizeHandle
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setActiveLayer(id);
            e.currentTarget.setPointerCapture(e.pointerId);
            onResizeStart(id, e);
          }}
        />
      )}
    </div>
  );
}
