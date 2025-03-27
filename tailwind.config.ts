import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.{tsx,jsx,js,ts,html}"],
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      textColor: ["disabled"],
    },
  },
  theme: {
    container: { center: true },
    colors: {
      blur: "hsla(0, 0%, 62.7%, .2)",
      white: "#fff",
      black: "#000",
      bronze: "#a18c60",
      brown: "#bea669",
      "black-opacity": "rgba(0 0 0 0.20)",
      "light-brown": "#F7F4ED",
      "medium-brown": "#E9DFC9",
      "medium-brown-opacity": "#E9DFC980",
      "bronze-opacity": "rgba(161,140,96,.6)",
    },
    backdropBlur: {
      xs: "2px",
    },
    extend: {
      boxShadow: {
        "custom-light": "0 0 5px 0 rgba(0, 0, 0, 0.07)",
      },
      screens: {
        "xs": "475px",
        "2xl": "1400px",
        "3xl": "1800px",
      },
      gridTemplateColumns: {
        header: "1fr auto 1fr",
      },
      fontFamily: {
        "source-sans": ["'Source Sans 3'"],
        "inter": ["Inter", "sans-serif"],
        "astralaga": ["Astralaga", "sans-serif"],
      },
      animation: {
        dropdown: "dropdown 2ms linear",
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        dropdown: {
          "0%": { maxHeight: "0px" },
          "100%": { maxHeight: "300px" },
        },
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
};
