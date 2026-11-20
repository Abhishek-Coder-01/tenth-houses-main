import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import "./experience.css";
import { ThemeProvider } from "@/components/Theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import ScrollExperience from "@/components/ScrollExperience";

export const metadata: Metadata = {
  title: "Tenth House — Private Estates, Marquees & Tented Architecture",
  icons: {
    icon: "/msg-group-logo.svg",
  },
  description:
    "Tenth House designs, engineers and builds private marquees, pavilions and open-air venues. Fewer than forty structures a year, by appointment.",
  keywords: [
    "marquee hire",
    "luxury tent",
    "shamiana",
    "wedding marquee",
    "glamping tents",
    "Tenth House",
  ],
  openGraph: {
    title: "Tenth House — Private Estates & Marquees",
    description:
      "Tented architecture for the considered occasion. Designed, engineered and built by our own crews.",
    type: "website",
  },
};

/* Runs before paint so the correct theme is applied with no flash. */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("th-theme");
    var theme = stored === "light" || stored === "dark" ? stored : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = stored === "light" || stored === "dark" ? stored : "system";
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ScrollExperience />
          <Navbar />
          {children}
          <Footer />
          <ScrollTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
