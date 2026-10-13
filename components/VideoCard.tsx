"use client";

import Image from "next/image";
import { VideoProject } from "@/lib/data";

interface VideoCardProps {
  video: VideoProject;
  index: number;
  total: number;
  accentColor: string;
  onClick: () => void;
}

export function VideoCard({
  video,
  index,
  total,
  accentColor,
  onClick,
}: VideoCardProps) {
  const thumbSrc =
    video.poster ||
    (video.id ? `/images/thumbnails/${video.id}.jpg` : undefined);

  const num = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      className={`vscroll-card ${!thumbSrc ? "no-thumb" : ""}`}
      style={
        {
          "--card-ch": accentColor,
          zIndex: index + 1,
        } as React.CSSProperties
      }
      role="listitem"
      aria-label={`Play ${video.title} — video ${num} of ${total}`}
      onClick={onClick}
    >
      <span className="vscroll-thumb">
        {thumbSrc && (
          <Image
            src={thumbSrc}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            quality={95}
            priority={index === 0}
            style={{ objectFit: "cover" }}
          />
        )}
      </span>
      <span className="vscroll-content">
        <span className="vscroll-title">{video.title}</span>
        <span className="vscroll-tags">
          {video.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
          <span className="vscroll-play-pill">▶ Play</span>
        </span>
      </span>
    </button>
  );
}
