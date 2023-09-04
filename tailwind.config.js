/** @type {import('tailwindcss').Config} */
import animated from "tailwindcss-animated";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    ui: {
      primary: "green",
      gray: "cool",
    },
  },
  plugins: [animated],
};
