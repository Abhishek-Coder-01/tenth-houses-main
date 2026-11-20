import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery — Tenth House",
  description: "Visual storytelling from Tenth House events and structures.",
};

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        section="gallery"
        title={
          <>
            Work that looks like a <em>memory</em>
          </>
        }
      >
        <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-mute">
          Champagne light, navy dusk, and the structures in between. A visual ledger of evenings we have placed.
        </p>
      </PageHero>
      <Gallery mark={false} />
    </main>
  );
}
