import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Get in Touch — Tenth House",
  description: "Private enquiry for marquees, pavilions and tented architecture.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        section="contact"
        title="A considered first conversation"
      >
        <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-mute">
          Share the site, the date and the feeling. The desk replies within one working day — never a newsletter.
        </p>
      </PageHero>
      <Contact mark={false} />
    </main>
  );
}
