import Image from "next/image";
import { Briefcase, Linkedin, Mail, Phone } from "lucide-react";
import { forwardRef } from "react";

const CONTACT_EMAIL = "phuongthao16002@gmail.com";
  // process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "phuongthao16002@gmail.com";

const CONTACT_ITEMS = [
  {
    label: "Phone",
    value: "0399 814 954",
    href: "tel:0399814954",
    icon: Phone,
  },
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tranthao1602",
    href: "https://www.linkedin.com/in/tranthao1602/",
    icon: Linkedin,
  },
] as const;

const ROLES = [
  "Branding Planner",
  "Social Media Executive",
  "Marketing",
] as const;

export const ContactInfoPanel = forwardRef<HTMLElement>(
  function ContactInfoPanel(_props, ref) {
    return (
      <aside
        ref={ref}
        aria-label="Direct contact information"
        className="work-contact-panel profile-reveal profile-reveal-delay-1"
      >
        <div className="work-contact-panel-head">
          <div className="work-contact-panel-glow" aria-hidden />
          <div className="work-contact-panel-identity">
            <div className="work-contact-panel-avatar">
              <Image
                src="/avatar.png"
                alt="Portrait of Thao Tran"
                fill
                className="work-contact-panel-avatar-img"
                sizes="56px"
              />
            </div>
            <div className="work-contact-panel-title-wrap">
              <p className="work-contact-panel-kicker">
                Direct Contact
              </p>
              <h3 className="work-contact-panel-title">
                Thao Tran
              </h3>
            </div>
          </div>
        </div>

        <div className="work-contact-panel-body">
          <ul className="work-contact-list">
            {CONTACT_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="work-contact-item"
                >
                  <span className="work-contact-item-icon">
                    <item.icon />
                  </span>
                  <span className="work-contact-item-copy">
                    <span className="work-contact-item-label">
                      {item.label}
                    </span>
                    <span className="work-contact-item-value">
                      {item.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="work-contact-block">
            <div className="work-contact-block-head">
              <span className="work-contact-block-icon">
                <Briefcase size={18} />
              </span>
              <p className="work-contact-block-label">
                Roles of Interest
              </p>
            </div>
            <ul className="work-contact-role-list">
              {ROLES.map((role) => (
                <li key={role} className="work-contact-role-item">
                  <span className="work-contact-role-dot" aria-hidden />
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="work-contact-block">
            <a
              href="#profile"
              className="work-contact-cta"
            >
              View Full Profile
            </a>
          </div>
        </div>
      </aside>
    );
  },
);
