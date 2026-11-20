import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  Home,
  Images,
  Landmark,
  Mail,
  Quote,
  Sparkles,
  Workflow,
} from "lucide-react";

export type SectionKey =
  | "home"
  | "about"
  | "structures"
  | "services"
  | "gallery"
  | "process"
  | "testimonials"
  | "contact"
  | "cta";

export type SectionMeta = {
  key: SectionKey;
  id: string;
  number: string;
  label: string;
  href: string;
  icon: LucideIcon;
  identity: string;
};

export const sections: Record<SectionKey, SectionMeta> = {
  home: {
    key: "home",
    id: "top",
    number: "01",
    label: "Home",
    href: "/",
    icon: Home,
    identity: "identity-home",
  },
  about: {
    key: "about",
    id: "house",
    number: "02",
    label: "Our Story",
    href: "/about/",
    icon: Landmark,
    identity: "identity-about",
  },
  structures: {
    key: "structures",
    id: "residences",
    number: "03",
    label: "Signature Structures",
    href: "/structures/",
    icon: Building2,
    identity: "identity-structures",
  },
  services: {
    key: "services",
    id: "services",
    number: "04",
    label: "Our Services",
    href: "/services/",
    icon: Briefcase,
    identity: "identity-services",
  },
  gallery: {
    key: "gallery",
    id: "gallery",
    number: "05",
    label: "Gallery",
    href: "/gallery/",
    icon: Images,
    identity: "identity-gallery",
  },
  process: {
    key: "process",
    id: "process",
    number: "06",
    label: "Our Process",
    href: "/#process",
    icon: Workflow,
    identity: "identity-process",
  },
  testimonials: {
    key: "testimonials",
    id: "clients",
    number: "07",
    label: "Client Stories",
    href: "/#clients",
    icon: Quote,
    identity: "identity-testimonials",
  },
  contact: {
    key: "contact",
    id: "contact",
    number: "08",
    label: "Get in Touch",
    href: "/contact/",
    icon: Mail,
    identity: "identity-contact",
  },
  cta: {
    key: "cta",
    id: "close",
    number: "09",
    label: "By Appointment",
    href: "/contact/",
    icon: Sparkles,
    identity: "identity-cta",
  },
};

export const navLinks = [
  sections.home,
  sections.about,
  sections.structures,
  sections.services,
  sections.gallery,
  sections.contact,
] as const;

export function normalizePath(path: string | null | undefined) {
  if (!path) return "/";
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}
