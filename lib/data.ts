export type Structure = {
  id: string;
  name: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  category: "Marquees" | "Pavilions" | "Glamping" | "Venues";
  image: string;
  blurb: string;
  status: string;
};

/* TENTH HOUSE — Indian Shaadi Tent House, mandaps, marquees and open-air venues.
   `beds / baths / area` keep their keys so layout stays intact:
   they read as guest capacity, staff count and footprint. */
export const structures: Structure[] = [
  {
    id: "royal-shaadi-tent",
    name: "Royal Shaadi Tent",
    location: "Jaipur · Rajasthan",
    price: "₹85,000",
    beds: 500,
    baths: 8,
    area: "14,000 sq ft",
    category: "Marquees",
    image: "/images/res-1.jpg",
    blurb:
      "A grand German marquee draped in royal red and gold fabric, with a marigold-lined aisle and ornate chandelier canopy fit for a Rajasthani baraat.",
    status: "Popular",
  },
  {
    id: "mughal-mandap",
    name: "Mughal Mandap",
    location: "Delhi · NCR",
    price: "₹1,20,000",
    beds: 800,
    baths: 12,
    area: "22,000 sq ft",
    category: "Pavilions",
    image: "/images/res-2.jpg",
    blurb:
      "Inspired by Mughal architecture — arched pavilion pillars, silk draping in ivory and maroon, and a hand-carved wooden mandap at its heart.",
    status: "Premium",
  },
  {
    id: "garden-baraat-tent",
    name: "Garden Baraat Tent",
    location: "Mumbai · Maharashtra",
    price: "₹65,000",
    beds: 400,
    baths: 6,
    area: "10,500 sq ft",
    category: "Venues",
    image: "/images/res-3.jpg",
    blurb:
      "An open-sided shamiana tent set in lush garden grounds, adorned with jasmine strings, warm fairy lights and a floral phoolon ki chaadar canopy.",
    status: "New",
  },
  {
    id: "luxury-glamping-suite",
    name: "Luxury Glamping Suite",
    location: "Udaipur · Rajasthan",
    price: "₹2,50,000",
    beds: 50,
    baths: 50,
    area: "18,000 sq ft",
    category: "Glamping",
    image: "/images/res-4.jpg",
    blurb:
      "Fifty heritage-style luxury tents on the lakeside, each with hand-blocked Rajasthani fabrics, private sit-outs and butler service for a destination wedding retreat.",
    status: "Seasonal",
  },
  {
    id: "farmhouse-shaadi-tent",
    name: "Farmhouse Shaadi Tent",
    location: "Pune · Maharashtra",
    price: "₹95,000",
    beds: 600,
    baths: 10,
    area: "16,500 sq ft",
    category: "Marquees",
    image: "/images/res-5.jpg",
    blurb:
      "A sprawling clear-span marquee on farmhouse grounds, with terracotta-toned drapes, brass lanterns and a dedicated mehndi pavilion attached.",
    status: "Signature",
  },
  {
    id: "palace-lawn-pavilion",
    name: "Palace Lawn Pavilion",
    location: "Hyderabad · Telangana",
    price: "₹1,80,000",
    beds: 1000,
    baths: 16,
    area: "30,000 sq ft",
    category: "Pavilions",
    image: "/images/res-6.jpg",
    blurb:
      "An expansive palace-lawn pavilion with twin floral mandaps, a baraati reception archway, LED ceiling canopy and a dedicated pheras stage for 1,000 guests.",
    status: "Exclusive",
  },
];

export const testimonials = [
  {
    quote:
      "Tenth House made our daughter's wedding absolutely magical. The Royal Shaadi Tent was set up overnight and looked like a palace by morning — marigolds everywhere, chandeliers glowing, and not a single detail out of place. Our 500 guests couldn't stop talking about it.",
    name: "Priya Sharma",
    role: "Wedding, 500 guests",
    place: "Hosted in Jaipur",
  },
  {
    quote:
      "We hired Tenth House for our company's annual gala and the execution was flawless. The pavilion was erected in under 24 hours, the AV setup was world-class and the team managed everything from valet to strike without a single follow-up call needed.",
    name: "Ramesh Agarwal",
    role: "Corporate Event Director",
    place: "Hosted in Delhi",
  },
  {
    quote:
      "I've organised many family functions over the years but nothing compared to the effortless professionalism of Tenth House. The decoration, the lighting, the stage — every corner was picture-perfect and the crew was invisible throughout the entire evening.",
    name: "Sunita Patel",
    role: "Private client",
    place: "Hosted in Mumbai",
  },
];

export const amenities = [
  {
    title: "Tent & Mandap Setup",
    copy: "Marquees, German frame tents, traditional shamiana and ornate wooden mandaps — designed, delivered and installed by our own crew for every occasion.",
    icon: "key",
  },
  {
    title: "Decoration & Lighting",
    copy: "LED canopy lighting, marigold strings, rose petal aisles, fabric draping and floral centrepieces — sampled and approved before a single petal is placed.",
    icon: "plan",
  },
  {
    title: "Furniture & Furnishing",
    copy: "Banquet chairs, round tables, Rajasthani sofa sets, bridal stage, sweetheart table and throne chairs — styled and dressed from our own warehouse stock.",
    icon: "shield",
  },
  {
    title: "Catering Support",
    copy: "Dedicated kitchen tents, food counters, chafing-dish stands, service staff and water stations — planned for smooth service from starters to mithai.",
    icon: "sofa",
  },
  {
    title: "Sound & AV System",
    copy: "Professional DJ setup, line-array sound system, LED video wall, projector and screen — calibrated for every corner of the tent so the sangeet never misses a beat.",
    icon: "globe",
  },
  {
    title: "Event Management",
    copy: "Full on-ground coordination, valet parking, security personnel and a dedicated event manager from setup to strike — so your family stays in celebration mode.",
    icon: "chart",
  },
];

export const stats = [
  { value: "2,500+", label: "Events Completed" },
  { value: "50+", label: "Tent Structures" },
  { value: "15+", label: "Cities Served" },
  { value: "20+", label: "Years Experience" },
];

export const locations = [
  "Delhi",
  "Mumbai",
  "Jaipur",
  "Udaipur",
  "Pune",
  "Hyderabad",
  "Kolkata",
  "Chennai",
  "Bangalore",
  "Ahmedabad",
];

export const process = [
  {
    step: "01",
    title: "Site Visit & Planning",
    copy: "We walk the venue, measure the ground, finalize guest count and tent size — then give you a clear quote before anything is booked.",
    tone: "tile-navy",
  },
  {
    step: "02",
    title: "Design & Decoration",
    copy: "Fabric samples, flower boards, lighting plan — every detail is presented and approved by you before setup begins.",
    tone: "tile-gold",
  },
  {
    step: "03",
    title: "Setup & Strike",
    copy: "Full installation in 24 hours, our crew on-site throughout the event, and a clean site by the next morning.",
    tone: "tile-champagne",
  },
];

/* backward-compatible aliases so any older import keeps working */
export const properties = structures;
export type Property = Structure;
