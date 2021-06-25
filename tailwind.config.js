module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        sidebarColor: "rgba(0, 0, 0, 0.85)",
        headerColor: "#30475e",
        siteLinkColor: "rgba(255, 255, 255, 1)",
        skillTextColor: "#ddd",
        formColor: "#b8502a",
      },
      fontFamily: {
        sidebarText: ["Arial", "sans-serif"],
        introText: ["Barlow", "sans-serif"],
        skillText: ["Noto Sans JP", "sans-serif"],
      },
      lineHeight: {
        tall: "11vh",
      },
      padding: {
        8.5: "2.1rem",
      },
      fontSize: {
        mobile: "3.5vw",
        wide: "2.5vw",
        experienceOverflowSmall: ".8rem",
        experienceOverflowBig: "1.1rem",
      },
      margin: {
        128: "32rem",
      },
      scale: {
        115: "1.15",
      },
      backgroundImage: () => ({
        bodyImage: "url('/src/background.png')",
      }),
    },
    variants: {
      extend: {
        borderWidth: ["group-hover", "hover"],
        transform: ["hover"],
        scale: ["group-hover", "hover"],
      },
    },
    plugins: [require("tailwindcss"), require("autoprefixer")],
  },
};
