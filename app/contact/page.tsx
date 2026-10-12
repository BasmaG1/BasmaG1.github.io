import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Basma Gado for collaborations, commissions, and new media inquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="panel active" id="contact">
        <h2>Contact</h2>
        <div className="contact-wrap">
          {/* Fix 4: Restyled form with light/neutral inputs and visible borders */}
          <ContactForm />

          <div>
            <p className="kicker">SOCIAL</p>
            <div className="social-list">
              <a
                href="https://www.linkedin.com/in/basma-gado-62605a233"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in a new tab)"
                style={{ "--icon-ch": "var(--purple)" } as React.CSSProperties}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
                  <line x1="7.5" y1="10" x2="7.5" y2="17" />
                  <line x1="11.6" y1="10.3" x2="11.6" y2="17" />
                  <path d="M11.6 13.1c0-1.7 1-2.7 2.4-2.7 1.4 0 2.1 1 2.1 2.7V17" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/basmag.png/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in a new tab)"
                style={{ "--icon-ch": "var(--magenta)" } as React.CSSProperties}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5.5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@basmagado1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube (opens in a new tab)"
                style={{ "--icon-ch": "var(--raspberry)" } as React.CSSProperties}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                  <path d="M10.3 9.1v5.8l5.1-2.9-5.1-2.9z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
