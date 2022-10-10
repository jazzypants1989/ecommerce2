module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "blue": "#0050C0",
      "orange": "#F77605",
      "Red": "#Cb2f03",
      "Black": "#000000",
      "Yellow": "#FEFBA8",
      "Green": "#34FAC5",
    },
    fontSize: {
      xs: "1.05rem",
      sm: "1.25rem",
      base: "1.5rem",
      lg: "1.75rem",
      xl: "2rem",
      "2xl": "2.25rem",
      "3xl": "2.5rem",
      "4xl": "3rem",
      "5xl": "4rem",
    },
    fontFamily: {
      sans: ["Bangers", "sans-serif"],
      serif: ["Bangers", "serif"],
    },
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
