import type { Metadata } from "next";
import { images } from "@/lib/data";
import { ImageGallery } from "@/components/ImageGallery";

export const metadata: Metadata = {
  title: "Images",
  description:
    "Gallery of digital collages, reflective abstractions, 3D compositions, and street mural mixed-media artwork by Basma Gado.",
};

export default function ImagesPage() {
  return (
    <main>
      <section className="panel active" id="images">
        <h2>Images</h2>
        <ImageGallery images={images} />
      </section>
    </main>
  );
}
