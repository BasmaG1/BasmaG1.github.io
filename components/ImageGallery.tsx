"use client";

import Image from "next/image";
import { useState } from "react";
import { CH, GalleryImage } from "@/lib/data";
import { Lightbox } from "@/components/Lightbox";

interface ImageGalleryProps {
  images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="image-grid" id="imageGrid" role="list" aria-label="Image gallery">
        {images.map((im, i) => {
          const ch = CH[i % CH.length];
          const altText = im.title
            ? im.cap
              ? `${im.title} — ${im.cap}`
              : im.title
            : im.cap || "";

          return (
            <button
              key={im.src}
              type="button"
              className="image-card"
              style={{ "--card-ch": ch } as React.CSSProperties}
              role="listitem"
              aria-label={`View ${im.title || "image"} full size`}
              onClick={() => openLightbox(i)}
            >
              <span className="image-frame">
                <Image
                  src={im.src}
                  alt={altText}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                  quality={90}
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{ objectFit: "cover" }}
                />
              </span>
              {im.title && <span className="image-title">{im.title}</span>}
              {im.cap && <span className="image-cap">{im.cap}</span>}
            </button>
          );
        })}
      </div>

      <Lightbox
        items={images.map((im) => ({
          src: im.src,
          title: im.title,
          cap: im.cap,
          alt: im.title,
        }))}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />
    </>
  );
}
