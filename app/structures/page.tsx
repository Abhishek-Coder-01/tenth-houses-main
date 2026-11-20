import type { Metadata } from "next";
import Residences from "@/components/Residences";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Signature Structures — Tenth House",
  description: "Luxury architecture and event structures from the Tenth House collection.",
};

export default function StructuresPage() {
  return (
    <main>
      <PageHero
        section="structures"
        title={
          <>
            Luxury architecture, <em>quietly offered</em>
          </>
        }
      >
        <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-mute">
          Marquees, pavilions, glamping and venues — a rotating six from a much smaller register.
        </p>
      </PageHero>
      <Residences mark={false} />
    </main>
  );
}
