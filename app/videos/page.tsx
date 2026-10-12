import type { Metadata } from "next";
import { VideosSection } from "@/components/VideosSection";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Explore 3D animations, 360° virtual production, VFX composites, live visuals, and motion experiments by Basma Gado.",
};

export default function VideosPage() {
  return (
    <main style={{ maxWidth: "1280px", padding: "48px 0 100px" }}>
      <VideosSection />
    </main>
  );
}
