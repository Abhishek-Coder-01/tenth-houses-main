"use client";
import sizes from "./image-widths.json";

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const file = src.split("/").pop() as keyof typeof sizes;
  const candidates = sizes[file];
  if (!src.startsWith("/images/") || !candidates) return src;
  const available = candidates.find(size => size >= width) ?? candidates[candidates.length - 1];
  return `/images/optimized/${file.replace(/\.jpg$/, "")}-${available}.webp`;
}
