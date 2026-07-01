"use client";

type LayoutEditorToggleProps = {
  editMode: boolean;
  onEnter: () => void;
  onExit: () => void;
  enterLabel?: string;
  exitLabel?: string;
};

export function LayoutEditorToggle({
  editMode,
  onEnter,
  onExit,
  enterLabel = "Adjust layout",
  exitLabel = "Done editing",
}: LayoutEditorToggleProps) {
  return (
    <button
      type="button"
      className="layout-editor-toggle"
      onClick={() => (editMode ? onExit() : onEnter())}
      aria-pressed={editMode}
    >
      {editMode ? exitLabel : enterLabel}
    </button>
  );
}
