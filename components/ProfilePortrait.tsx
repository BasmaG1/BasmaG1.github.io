"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";

/**
 * Fix 3: Dedicated formal portrait slot.
 * To swap for a new business headshot, simply update this path or pass `src` as a prop!
 */
export const PORTRAIT_IMAGE_PATH = "/images/about.jpg";

interface ProfilePortraitProps {
  src?: string;
  alt?: string;
}

export function ProfilePortrait({
  src = PORTRAIT_IMAGE_PATH,
  alt = "Basma Gado — Professional Portrait",
}: ProfilePortraitProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="about-photo-col">
        <button
          className="about-photo-frame"
          type="button"
          aria-label="View portrait full screen"
          onClick={() => setLightboxOpen(true)}
        >
          <div className="about-photo-inner spotlight" id="aboutPhotoInner">
            <Image
              id="aboutPhoto"
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 720px) 100vw, 420px"
              quality={90}
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </button>
      </div>

      <Lightbox
        items={[
          {
            src,
            alt,
            title: "Basma Gado",
            cap: "Cinema & Media Arts Graduate — New Media Artist",
          },
        ]}
        currentIndex={0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
