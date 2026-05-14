import localFont from "next/font/local";

const candara = localFont({
  src: [
    {
      path: "./Candara.woff2",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["sans-serif"],
  preload: true,
  variable: "--font-candara",
});
const neoteric = localFont({
  src: [
    {
      path: "./Neoteric.woff2",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["sans-serif"],
  preload: true,
  variable: "--font-neoteric",
});

export { candara, neoteric };
