"use client";

import { useRef, useState } from "react";
import { CH, ReelVideo } from "@/lib/data";

const MUTE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z" />
    <line x1="16" y1="9" x2="21" y2="14" />
    <line x1="21" y1="9" x2="16" y2="14" />
  </svg>
);

const UNMUTE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z" />
    <path d="M16.3 8.7a5 5 0 0 1 0 6.6" />
    <path d="M18.8 6.2a8.5 8.5 0 0 1 0 11.6" />
  </svg>
);

const FULLSCREEN_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 4H4v4" />
    <path d="M16 4h4v4" />
    <path d="M8 20H4v-4" />
    <path d="M16 20h4v-4" />
  </svg>
);

interface ReelStripProps {
  reels: ReelVideo[];
}

export function ReelStrip({ reels }: ReelStripProps) {
  const [mutedStates, setMutedStates] = useState<boolean[]>(
    reels.map(() => true)
  );
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleMute = (index: number) => {
    const willUnmute = mutedStates[index];
    const newStates = reels.map((_, i) => (i === index ? !willUnmute : true));
    setMutedStates(newStates);

    videoRefs.current.forEach((vid, i) => {
      if (vid) {
        vid.muted = newStates[i];
      }
    });
  };

  const handleFullscreen = (index: number) => {
    const vid = videoRefs.current[index];
    if (!vid) return;
    const req =
      vid.requestFullscreen ||
      (vid as unknown as { webkitRequestFullscreen?: () => Promise<void> })
        .webkitRequestFullscreen;
    if (req) {
      req.call(vid).catch(() => {});
    }
  };

  return (
    <div
      className="reel-strip"
      id="reelStrip"
      aria-label="Vertical video reels — playing on loop, muted"
    >
      {reels.map((reel, i) => {
        const ch = CH[i % CH.length];
        const isMuted = mutedStates[i];

        return (
          <div
            key={reel.title}
            className="reel-card"
            style={{ "--card-ch": ch } as React.CSSProperties}
          >
            <div className="reel-frame">
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={`/videos/${reel.file}`}
                poster={reel.poster}
                preload="metadata"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                aria-label={reel.title}
              />

              <div className="reel-controls">
                <button
                  type="button"
                  className="reel-btn reel-mute"
                  aria-label={`${isMuted ? "Unmute" : "Mute"} ${reel.title}`}
                  onClick={() => toggleMute(i)}
                >
                  {isMuted ? MUTE_ICON : UNMUTE_ICON}
                </button>
                <button
                  type="button"
                  className="reel-btn reel-fullscreen"
                  aria-label={`View ${reel.title} full screen`}
                  onClick={() => handleFullscreen(i)}
                >
                  {FULLSCREEN_ICON}
                </button>
              </div>
            </div>

            <span className="reel-title">{reel.title}</span>
            <span className="reel-tags">
              {reel.tags.slice(0, 2).map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}
