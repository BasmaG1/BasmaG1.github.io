"use client";

import Image from "next/image";
import { useState } from "react";
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
  const isRealYoutubeId = video.id && !String(video.id).startsWith("PASTE-");

  // Fix 2: Request maxresdefault.jpg (1280x720) for YouTube instead of 480x360 hqdefault.jpg
  const defaultThumb =
    video.type === "youtube"
      ? isRealYoutubeId
        ? `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
        : video.poster
      : video.poster;

  const [imgSrc, setImgSrc] = useState<string | undefined>(defaultThumb);
  const num = String(index + 1).padStart(2, "0");

  const handleError = () => {
    // If maxresdefault is not available for a YouTube video, fall back to hqdefault
    if (video.type === "youtube" && video.id && imgSrc?.includes("maxresdefault")) {
      setImgSrc(`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`);
    }
  };

  return (
    <button
      type="button"
      className={`vscroll-card ${!imgSrc ? "no-thumb" : ""}`}
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
        {imgSrc && (
          <Image
            src={imgSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            quality={90}
            priority={index === 0}
            style={{ objectFit: "cover" }}
            onError={handleError}
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
