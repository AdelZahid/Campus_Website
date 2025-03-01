module.exports = {
  content: ["./frontend/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        "green-600": "#21a663",
        "green-700": "#14643b",
        "green-800": "#0d4a2a",
        "green-500": "#2ebb74",
        "green-400": "#4acf89",
        "green-300": "#7adfa8",
        "green-200": "#a9eac6",
        "green-100": "#e0f7ea",
        primary: {
          DEFAULT: "#21a663",
          hover: "#14643b",
          dark: "#0d4a2a",
          light: "rgba(33, 166, 99, 0.1)",
          lighter: "#a9eac6",
          lightest: "#e0f7ea",
        },
      },
      animation: {
        gradientBG: "gradientBG 15s ease infinite",
        bounce: "bounce 0.5s",
        glow: "glow 1s infinite",
        rotate: "rotate 2s linear infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        pulse: "pulse 0.5s infinite",
        slideInLeft: "slideInLeft 0.5s ease-in-out",
        slideInRight: "slideInRight 0.5s ease-in-out",
      },
      keyframes: {
        gradientBG: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        bounce: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" },
        },
        glow: {
          "0%, 100%": { "box-shadow": "0 0 5px #21a663" },
          "50%": { "box-shadow": "0 0 20px #21a663" },
        },
        rotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        slideInLeft: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        slideInRight: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
