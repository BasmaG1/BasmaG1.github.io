"use client";

import { useState } from "react";
import { CH, reelVideos, videos } from "@/lib/data";
import { ReelStrip } from "@/components/ReelStrip";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";

export function VideosSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const handleOpenModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  return (
    <div className="videos-page-wrap">
      <h2>Videos</h2>

      {/* Looping vertical reels strip */}
      <ReelStrip reels={reelVideos} />

      {/* Stacked video projects */}
      <div
        className="video-scroll-list"
        id="videoGrid"
        role="list"
        aria-label="Video projects"
      >
        {videos.map((v, i) => {
          const ch = CH[i % CH.length];
          return (
            <VideoCard
              key={`${v.title}-${i}`}
              video={v}
              index={i}
              total={videos.length}
              accentColor={ch}
              onClick={() => handleOpenModal(i)}
            />
          );
        })}
      </div>

      <VideoModal
        videos={videos}
        currentIndex={modalIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={(idx) => setModalIndex(idx)}
      />
    </div>
  );
}
