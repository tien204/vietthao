"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ClaudeChatInput from "@/app/components/ui/claude-style-chat-input";
import { ContactInfoPanel } from "@/app/components/contact/ContactInfoPanel";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type ContactForm = {
  recruiterName: string;
  jobDescription: string;
  phone: string;
  email: string;
};

type ContactStep = "name" | "jd" | "phone" | "email" | "done";
type EmailSendState = "idle" | "sending" | "sent" | "error";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "intro",
    role: "assistant",
    content:
      "Chào anh/chị! Mình là trợ lý của Hương. Anh/chị cho mình biết họ tên của anh/chị được không?",
  },
];

const STEP_PLACEHOLDERS: Record<Exclude<ContactStep, "done">, string> = {
  name: "Ví dụ: Nguyễn Văn A",
  jd: "Link JD hoặc mô tả ngắn về vị trí",
  phone: "Ví dụ: 0901 234 567",
  email: "Ví dụ: hr@congty.com",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 11;
}

function getGreeting(date = new Date()) {
  const hour = date.getHours();

  if (hour >= 5 && hour < 11) return "Chào buổi sáng";
  if (hour >= 11 && hour < 13) return "Chào buổi trưa";
  if (hour >= 13 && hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

async function sendContactEmail(form: ContactForm) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error ?? "Không thể gửi email.");
  }
}

function TypingIndicator() {
  return (
    <div className="work-contact-message-row is-assistant chat-message-enter">
      <div className="work-contact-message is-assistant" role="status" aria-label="Đang nhập">
        <div className="chat-typing-indicator">
          <span className="chat-typing-dot" />
          <span className="chat-typing-dot" />
          <span className="chat-typing-dot" />
        </div>
      </div>
    </div>
  );
}

export function WorkContactSection() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [step, setStep] = useState<ContactStep>("name");
  const [form, setForm] = useState<ContactForm>({
    recruiterName: "",
    jobDescription: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [emailSendState, setEmailSendState] = useState<EmailSendState>("idle");
  const [isTyping, setIsTyping] = useState(false);
  const [greeting, setGreeting] = useState(() => getGreeting());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contactPanelRef = useRef<HTMLElement>(null);
  const [chatHeight, setChatHeight] = useState<number | null>(null);

  useEffect(() => {
    const syncGreeting = () => setGreeting(getGreeting());

    syncGreeting();
    const interval = window.setInterval(syncGreeting, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const panel = contactPanelRef.current;
    if (!panel) return;

    const syncChatHeight = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (!isDesktop) {
        setChatHeight(null);
        return;
      }

      setChatHeight(panel.getBoundingClientRect().height);
    };

    syncChatHeight();

    const observer = new ResizeObserver(syncChatHeight);
    observer.observe(panel);
    window.addEventListener("resize", syncChatHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncChatHeight);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const shouldSmoothScroll = messages.length > 1 || isTyping;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: shouldSmoothScroll ? "smooth" : "auto",
    });
  }, [messages, isTyping, error]);

  const pushMessage = (role: ChatMessage["role"], content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${role}-${prev.length}`, role, content },
    ]);
  };

  const advanceConversation = (
    nextStep: ContactStep,
    assistantReply: string,
    delay = 500,
    onComplete?: () => void,
  ) => {
    setIsTyping(true);
    window.setTimeout(() => {
      pushMessage("assistant", assistantReply);
      setStep(nextStep);
      setIsTyping(false);
      onComplete?.();
    }, delay);
  };

  const submitContactForm = async (finalForm: ContactForm) => {
    setEmailSendState("sending");
    setIsTyping(true);

    try {
      await sendContactEmail(finalForm);
      setEmailSendState("sent");
      advanceConversation(
        "done",
        `Cảm ơn ${finalForm.recruiterName}! Mình đã gửi thông tin cho Hương. Hương sẽ liên hệ lại sớm qua ${finalForm.phone} hoặc ${finalForm.email}.`,
        600,
      );
    } catch (sendError) {
      setEmailSendState("error");
      setStep("done");
      const message =
        sendError instanceof Error
          ? sendError.message
          : "Không thể gửi email.";
      setError(message);
      advanceConversation(
        "done",
        `Cảm ơn ${finalForm.recruiterName}! Mình đã ghi nhận thông tin nhưng chưa gửi được email tự động. Anh/chị vui lòng liên hệ trực tiếp qua email hoặc số điện thoại bên phải.`,
        600,
      );
    }
  };

  const handleSendMessage = (message: string) => {
    const value = message.trim();
    if (!value || step === "done") return;

    setError(null);
    pushMessage("user", value);

    if (step === "name") {
      if (value.length < 2) {
        setError("Vui lòng nhập họ tên đầy đủ.");
        return;
      }

      setForm((prev) => ({ ...prev, recruiterName: value }));
      advanceConversation(
        "jd",
        `Cảm ơn ${value}! Anh/chị vui lòng gửi link JD hoặc mô tả ngắn về vị trí tuyển dụng ạ.`,
      );
      return;
    }

    if (step === "jd") {
      if (value.length < 5) {
        setError("Vui lòng nhập link JD hoặc mô tả vị trí (ít nhất 5 ký tự).");
        return;
      }

      setForm((prev) => ({
        ...prev,
        jobDescription: value,
      }));
      advanceConversation(
        "phone",
        "Số điện thoại để Hương liên hệ lại là gì ạ?",
      );
      return;
    }

    if (step === "phone") {
      if (!isValidPhone(value)) {
        setError("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
        return;
      }

      setForm((prev) => ({ ...prev, phone: value }));
      advanceConversation("email", "Email của anh/chị là gì ạ?");
      return;
    }

    if (step === "email") {
      if (!isValidEmail(value)) {
        setError("Email không hợp lệ. Vui lòng nhập lại.");
        return;
      }

      const finalForm = { ...form, email: value };
      setForm(finalForm);
      void submitContactForm(finalForm);
      return;
    }
  };

  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "dinhthuyhuong11@gmail.com";

  return (
    <section id="work-contact" className="work-contact-section">
      <div className="work-contact-shell">
        <div className="work-contact-intro profile-reveal">
          <div className="featured-header work-contact-featured-header">
            <div className="title">
              Liên hệ
              <br />
              <span className="line2-indent" aria-hidden="true" />
              công việc
            </div>

            <div className="retro-device work-contact-retro-device" aria-hidden="true">
              <div className="screen">
                <span>03</span>
              </div>
              <div className="buttons">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>

        <div className="work-contact-layout">
          <div
            className="work-contact-chat profile-reveal"
            style={chatHeight ? { height: chatHeight } : undefined}
          >
            <header className="work-contact-chat-head">
              <div className="work-contact-chat-identity">
                <div className="work-contact-chat-avatar">
                <Image
                  src="/avatar.png"
                  alt="Avatar Đinh Thị Thủy Hương"
                  fill
                  className="work-contact-chat-avatar-img"
                  sizes="56px"
                />
                </div>

                <div className="work-contact-chat-copy">
                  <p className="work-contact-chat-kicker">
                  Trợ lý liên hệ
                  </p>
                  <h2 lang="vi" className="work-contact-chat-title">
                    {greeting}, anh/chị
                  </h2>
                  <p className="work-contact-chat-meta">
                  Liên hệ công việc với Hương — chỉ mất vài phút
                  </p>
                </div>
              </div>
            </header>

            <div
              ref={scrollContainerRef}
              className="work-contact-messages"
              aria-label="Lịch sử trò chuyện"
            >
              <div className="work-contact-messages-stack">
              {messages.map((message, index) => {
                const isLatest = index === messages.length - 1;

                return (
                  <div
                    key={message.id}
                    className={`work-contact-message-row ${
                      message.role === "user" ? "is-user" : "is-assistant"
                    }${isLatest ? " chat-message-enter" : ""}`}
                    style={
                      isLatest
                        ? { animationDelay: `${Math.min(index, 10) * 55}ms` }
                        : undefined
                    }
                  >
                    <div
                      className={`work-contact-message ${
                        message.role === "user" ? "is-user" : "is-assistant"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              })}

              {isTyping ? <TypingIndicator /> : null}
              </div>
            </div>

            <footer className="work-contact-chat-foot">
            {error ? (
                <p className="work-contact-error">
                {error}
              </p>
            ) : null}

            <ClaudeChatInput
              placeholder={
                step === "done"
                  ? "Đã hoàn tất — cảm ơn anh/chị!"
                  : STEP_PLACEHOLDERS[step]
              }
              disabled={step === "done" || isTyping || emailSendState === "sending"}
              onSendMessage={handleSendMessage}
            />

            {step === "done" ? (
                <div className="work-contact-done">
                  <p className="work-contact-done-text">
                    {emailSendState === "sending"
                      ? "Đang gửi thông tin liên hệ..."
                      : emailSendState === "sent"
                        ? "Đã gửi thông tin thành công. Hương sẽ phản hồi trong 24–48 giờ làm việc."
                        : emailSendState === "error"
                          ? "Thông tin đã được ghi nhận. Anh/chị có thể liên hệ trực tiếp qua email bên dưới."
                          : "Đã ghi nhận thông tin liên hệ."}
                  </p>
                  {emailSendState === "error" ? (
                    <div className="work-contact-done-actions">
                      <a
                        href={`mailto:${contactEmail}`}
                        className="work-contact-button primary"
                      >
                        Liên hệ qua email
                      </a>
                    </div>
                  ) : null}
                </div>
            ) : null}
            </footer>
          </div>

          <ContactInfoPanel ref={contactPanelRef} />
        </div>
      </div>
    </section>
  );
}
