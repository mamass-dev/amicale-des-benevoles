import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amicale des Bénévoles",
    short_name: "Amicale",
    description:
      "Association loi 1901 pour la promotion du bénévolat événementiel sportif et culturel.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfaf5",
    theme_color: "#1e3a5f",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
