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
      "Hi there! I'm Thao's contact assistant. Could you share your full name?",
  },
];

const STEP_PLACEHOLDERS: Record<Exclude<ContactStep, "done">, string> = {
  name: "e.g. John Smith",
  jd: "Job posting link or a brief role description",
  phone: "e.g. 0901 234 567",
  email: "e.g. hr@company.com",
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

  if (hour >= 5 && hour < 11) return "Good morning";
  if (hour >= 11 && hour < 13) return "Good afternoon";
  if (hour >= 13 && hour < 18) return "Good afternoon";
  return "Good evening";
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
    throw new Error(data?.error ?? "Unable to send email.");
  }
}

function TypingIndicator() {
  return (
    <div className="work-contact-message-row is-assistant chat-message-enter">
      <div className="work-contact-message is-assistant" role="status" aria-label="Typing">
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
        `Thanks, ${finalForm.recruiterName}! I've sent your details to Thao. She'll follow up soon at ${finalForm.phone} or ${finalForm.email}.`,
        600,
      );
    } catch (sendError) {
      setEmailSendState("error");
      setStep("done");
      const message =
        sendError instanceof Error
          ? sendError.message
          : "Unable to send email.";
      setError(message);
      advanceConversation(
        "done",
        `Thanks, ${finalForm.recruiterName}! I've saved your details, but the automatic email didn't go through. Please reach out directly using the email or phone number on the right.`,
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
        setError("Please enter your full name.");
        return;
      }

      setForm((prev) => ({ ...prev, recruiterName: value }));
      advanceConversation(
        "jd",
        `Thanks, ${value}! Please share the job posting link or a brief description of the role.`,
      );
      return;
    }

    if (step === "jd") {
      if (value.length < 5) {
        setError("Please enter a job posting link or role description (at least 5 characters).");
        return;
      }

      setForm((prev) => ({
        ...prev,
        jobDescription: value,
      }));
      advanceConversation(
        "phone",
        "What's the best phone number for Thao to reach you?",
      );
      return;
    }

    if (step === "phone") {
      if (!isValidPhone(value)) {
        setError("That phone number doesn't look valid. Please try again.");
        return;
      }

      setForm((prev) => ({ ...prev, phone: value }));
      advanceConversation("email", "What's your email address?");
      return;
    }

    if (step === "email") {
      if (!isValidEmail(value)) {
        setError("That email doesn't look valid. Please try again.");
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
              Work
              <br />
              <span className="line2-indent" aria-hidden="true" />
              Contact
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
                  alt="Avatar of Thao Tran"
                  fill
                  className="work-contact-chat-avatar-img"
                  sizes="56px"
                />
                </div>

                <div className="work-contact-chat-copy">
                  <p className="work-contact-chat-kicker">
                  Contact Assistant
                  </p>
                  <h2 lang="en" className="work-contact-chat-title">
                    {greeting}
                  </h2>
                  <p className="work-contact-chat-meta">
                  Get in touch with Thao — takes just a few minutes
                  </p>
                </div>
              </div>
            </header>

            <div
              ref={scrollContainerRef}
              className="work-contact-messages"
              aria-label="Conversation history"
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
                  ? "All done — thank you!"
                  : STEP_PLACEHOLDERS[step]
              }
              disabled={step === "done" || isTyping || emailSendState === "sending"}
              onSendMessage={handleSendMessage}
            />

            {step === "done" ? (
                <div className="work-contact-done">
                  <p className="work-contact-done-text">
                    {emailSendState === "sending"
                      ? "Sending your contact details..."
                      : emailSendState === "sent"
                        ? "Your details were sent successfully. Thao will respond within 24–48 business hours."
                        : emailSendState === "error"
                          ? "Your details were saved. You can also reach out directly via the email below."
                          : "Your contact details have been recorded."}
                  </p>
                  {emailSendState === "error" ? (
                    <div className="work-contact-done-actions">
                      <a
                        href={`mailto:${contactEmail}`}
                        className="work-contact-button primary"
                      >
                        Contact via email
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
