"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ClaudeChatInputProps = {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  embedded?: boolean;
};

export default function ClaudeChatInput({
  onSendMessage,
  placeholder = "Nhập tin nhắn...",
  disabled = false,
}: ClaudeChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [message]);

  useEffect(() => {
    if (disabled) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const focusTextarea = () => {
      textarea.focus();
      const cursorPosition = textarea.value.length;
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    };

    focusTextarea();
    const frameId = window.requestAnimationFrame(focusTextarea);

    return () => window.cancelAnimationFrame(frameId);
  }, [disabled, placeholder]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setMessage("");
  };

  return (
    <div className={`chat-input-shell${disabled ? " is-disabled" : ""}`}>
      <div className="chat-input-main">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="chat-input-textarea"
        />

        <button
          type="button"
          className="chat-input-send"
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          aria-label="Gửi tin nhắn"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
}
