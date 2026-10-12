"use client";

import { useRef, useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/data";
import { burstConfetti } from "@/components/Confetti";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setNoteColor("");
    setNoteText("Sending…");

    try {
      const formData = new FormData(form);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        form.reset();
        setNoteText(
          "Got it! Thanks so much for dropping a line. I’m thrilled you reached out and will get back to you soon."
        );
        setNoteColor("var(--emerald)");

        if (buttonRef.current) {
          const br = buttonRef.current.getBoundingClientRect();
          burstConfetti(br.left + br.width / 2, br.top + br.height / 2, 30);
        }
      } else {
        let msg =
          "Something went wrong — please try again, or email gadobasma@gmail.com directly.";
        try {
          const data = await res.json();
          if (data && Array.isArray(data.errors) && data.errors.length) {
            msg = data.errors.map((er: { message: string }) => er.message).join(", ");
          }
        } catch {}
        setNoteText(msg);
        setNoteColor("var(--raspberry)");
      }
    } catch {
      setNoteText(
        "Network error — please try again, or email gadobasma@gmail.com directly."
      );
      setNoteColor("var(--raspberry)");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer:fine)").matches)
      return;
    const btn = buttonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const mx = e.clientX - r.left - r.width / 2;
    const my = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${mx * 0.18}px, ${my * 0.35}px)`;
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (btn) btn.style.transform = "";
  };

  return (
    <form id="contactForm" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="contact-name">Name *</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          placeholder="Your name"
        />
      </div>

      <div className="field">
        <label htmlFor="contact-email">Email address *</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          placeholder="your.email@example.com"
        />
      </div>

      <div className="field">
        <label htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          placeholder="Tell me about your project, collaboration, or question..."
        />
      </div>

      <button
        ref={buttonRef}
        className="send-btn"
        type="submit"
        disabled={isSubmitting}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {isSubmitting ? "SENDING…" : "SEND"}
      </button>

      {noteText && (
        <p className="send-note" id="sendNote" style={{ color: noteColor }}>
          {noteText}
        </p>
      )}
    </form>
  );
}
