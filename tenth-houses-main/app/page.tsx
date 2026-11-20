import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Residences from "@/components/Residences";
import House from "@/components/House";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import Process from "@/components/Process";
import SectionMark from "@/components/SectionMark";
import { ArrowIcon } from "@/components/icons";
import { sections } from "@/lib/sections";

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Residences />
      <House />
      <Services />
      <Gallery compact />
      <Process />
      <Clients />
      <Contact />

    </main>
  );
}
