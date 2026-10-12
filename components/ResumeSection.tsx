"use client";

import Image from "next/image";
import { useState } from "react";
import { resumeItems } from "@/lib/data";
import { Lightbox } from "@/components/Lightbox";

export function ResumeSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="panel active" id="resume">
      <h2>Resume</h2>

      <div className="resume-grid">
        {/* CV Card */}
        <button
          type="button"
          className="resume-card"
          style={{ "--doc-ch": "var(--purple)", background: "none", border: "none", cursor: "pointer", padding: 0 } as React.CSSProperties}
          onClick={() => handleOpen(0)}
          aria-label="View CV full size"
        >
          <span
            className="resume-frame spotlight cv-preview"
            style={{ overflow: "hidden", background: "#fff", position: "relative" }}
          >
            <iframe
              src="/images/CV.pdf#page=1&zoom=fit&toolbar=0&navpanes=0&scrollbar=0"
              title="Basma Gado CV"
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                minHeight: "500px",
                border: 0,
                background: "#fff",
                pointerEvents: "none",
              }}
            />
          </span>
          <span className="resume-open">
            VIEW FULL SIZE <span>↗</span>
          </span>
        </button>

        {/* Diploma Card */}
        <button
          type="button"
          className="resume-card"
          style={{ "--doc-ch": "var(--purple)", background: "none", border: "none", cursor: "pointer", padding: 0 } as React.CSSProperties}
          onClick={() => handleOpen(1)}
          aria-label="View Diploma full size"
        >
          <span className="resume-frame spotlight">
            <Image
              src="/images/diploma.jpg"
              alt="Basma Gado Diploma"
              width={1400}
              height={1065}
              quality={90}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </span>
          <span className="resume-open">
            VIEW FULL SIZE <span>↗</span>
          </span>
        </button>
      </div>

      <Lightbox
        items={resumeItems}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />
    </section>
  );
}
