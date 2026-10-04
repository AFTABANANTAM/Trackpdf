import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { bubble: "#FF8FC7", bubbledeep: "#FF5CAA", sunny: "#FFE14D", ink: "#000000", cream: "#FFF6FB" },
    fontFamily: { display: ["'Arial Black'", "Impact", "sans-serif"], sans: ["ui-rounded", "'Trebuchet MS'", "system-ui", "sans-serif"] },
    boxShadow: { pop: "4px 4px 0 #000", popl: "7px 7px 0 #000" },
  } },
} satisfies Config;
