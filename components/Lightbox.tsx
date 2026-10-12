"use client";

import Image from "next/image";
import { useEffect } from "react";
import { LightboxItem } from "@/lib/data";

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (currentIndex - 1 + items.length) % items.length;
        onNavigate?.(prev);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (currentIndex + 1) % items.length;
        onNavigate?.(next);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !items.length) return null;

  const currentItem = items[currentIndex] || items[0];
  const isPdf = currentItem.type === "pdf" || currentItem.src.endsWith(".pdf");
  const hasMultiple = items.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + items.length) % items.length;
    onNavigate?.(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % items.length;
    onNavigate?.(next);
  };

  return (
    <div
      className="lightbox"
      id="imgLightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      onClick={onClose}
    >
      <button
        className="lightbox-close"
        type="button"
        aria-label="Close"
        onClick={onClose}
      >
        &times;
      </button>

      {hasMultiple && (
        <button
          className="lightbox-arrow prev"
          type="button"
          aria-label="Previous item"
          onClick={handlePrev}
        >
          &#8249;
        </button>
      )}

      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        {isPdf ? (
          <iframe
            src={currentItem.src}
            title={currentItem.title || "PDF document"}
            style={{
              width: "90vw",
              height: "85vh",
              maxWidth: "1200px",
              border: "none",
              background: "#fff",
              borderRadius: "8px",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "78vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={currentItem.src}
              alt={currentItem.alt || currentItem.title || "Basma Gado Portfolio"}
              width={1600}
              height={1200}
              quality={90}
              priority
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "78vh",
                borderRadius: "8px",
                objectFit: "contain",
                boxShadow: "0 50px 120px -30px rgba(81,27,138,0.55), 0 0 0 1px rgba(239,234,224,0.1)",
              }}
            />
          </div>
        )}

        {(currentItem.title || currentItem.cap) && (
          <div className="lightbox-caption">
            {currentItem.title && (
              <p className="lightbox-caption-title">{currentItem.title}</p>
            )}
            {currentItem.cap && (
              <p className="lightbox-caption-desc">{currentItem.cap}</p>
            )}
          </div>
        )}
      </div>

      {hasMultiple && (
        <button
          className="lightbox-arrow next"
          type="button"
          aria-label="Next item"
          onClick={handleNext}
        >
          &#8250;
        </button>
      )}
    </div>
  );
}
