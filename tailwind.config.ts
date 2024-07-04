import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vsvBlueDark: "#1C1E3D",
        vsvBlueLight: "#008CFF",
        vsvGray: "#959596",
        vsvGrayLight: "#F8F8F8",
      },
    },
  },
  plugins: [],
};
export default config;
