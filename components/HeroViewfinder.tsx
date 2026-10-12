"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { REEL_YOUTUBE_ID } from "@/lib/data";

const PHRASES = [
  "Media Artist.",
  "3D Animation.",
  "Virtual Production.",
  "Motion Capture.",
  "Visual Storytelling.",
];

export function HeroViewfinder() {
  const [displayText, setDisplayText] = useState(PHRASES[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeoutId: NodeJS.Timeout;

    function tick() {
      const phrase = PHRASES[phraseIdx];
      if (!deleting) {
        charIdx++;
        setDisplayText(phrase.slice(0, charIdx));
        if (charIdx === phrase.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1500);
          return;
        }
        timeoutId = setTimeout(tick, 55 + Math.random() * 45);
      } else {
        charIdx--;
        setDisplayText(phrase.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          timeoutId = setTimeout(tick, 300);
          return;
        }
        timeoutId = setTimeout(tick, 28);
      }
    }

    timeoutId = setTimeout(tick, 400);
    return () => clearTimeout(timeoutId);
  }, []);

  const hasYouTubeReel =
    REEL_YOUTUBE_ID && !REEL_YOUTUBE_ID.startsWith("PASTE-");

  return (
    <section className="panel active" id="reel">
      <p className="kicker">New Media Artist</p>
      <h1 className="hero-tag" id="heroTag">
        {displayText}
      </h1>

      <div className="viewfinder" id="reelViewfinder">
        {hasYouTubeReel ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${REEL_YOUTUBE_ID}?rel=0&modestbranding=1`}
            title="Reel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src="/images/reel-poster.jpg"
              alt="Reel preview"
              fill
              priority
              quality={90}
              style={{ objectFit: "cover" }}
            />
            <div className="vf-pending" id="reelPending">
              Video coming soon
            </div>
          </>
        )}

        <div className="vf-corner tl" />
        <div className="vf-corner tr" />
        <div className="vf-corner bl" />
        <div className="vf-corner br" />
      </div>
    </section>
  );
}
