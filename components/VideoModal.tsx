"use client";

import { useEffect, useRef } from "react";
import { CH, VideoProject } from "@/lib/data";

interface VideoModalProps {
  videos: VideoProject[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export function VideoModal({
  videos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (currentIndex - 1 + videos.length) % videos.length;
        onNavigate?.(prev);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (currentIndex + 1) % videos.length;
        onNavigate?.(next);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, videos.length, onClose, onNavigate]);

  if (!isOpen || !videos.length) return null;

  const v = videos[currentIndex] || videos[0];
  const ch = CH[currentIndex % CH.length];
  const isLocal = v.type === "local";

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + videos.length) % videos.length;
    onNavigate?.(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % videos.length;
    onNavigate?.(next);
  };

  const num = `${String(currentIndex + 1).padStart(2, "0")} / ${String(
    videos.length
  ).padStart(2, "0")} — ${v.title.toUpperCase()}`;

  const iframeSrc = v.src
    ? `${v.src}${v.src.includes("?") ? "&" : "?"}autoplay=1`
    : "";

  return (
    <div
      className="modal"
      id="modal"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      style={{ "--modal-ch": ch } as React.CSSProperties}
      onClick={onClose}
    >
      <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <span style={{ color: ch }}>{num}</span>
          <button
            className="modal-close-btn"
            id="modalClose"
            type="button"
            aria-label="Close video"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className={`modal-video ${isLocal ? "portrait" : ""}`} id="modalVideoBox">
          {isLocal ? (
            <video
              ref={videoRef}
              src={`/videos/${v.file}`}
              controls
              playsInline
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "contain",
                background: "#000",
              }}
            />
          ) : (
            <iframe
              src={iframeSrc}
              title={v.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}

          <button
            type="button"
            className="modal-nav prev"
            aria-label="Previous video"
            onClick={handlePrev}
          >
            &#8249;
          </button>
          <button
            type="button"
            className="modal-nav next"
            aria-label="Next video"
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>

        <p className="modal-desc" id="modalDesc">
          {v.desc}
        </p>
      </div>
    </div>
  );
}
