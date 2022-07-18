const { screens, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  darkMode: "class",
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        dark: "#1C1D25",
        light: "#FFFFF5"
      },
      colors: {
        dark: "#1C1D25",
        light: "#FFFFF5"
      },
      fontFamily: {
        sans: ["IBM Plex Sans", ...fontFamily.sans]
      },
      screens: {
        ...screens,
        big: "850px"
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.dark"),
            a: {
              color: theme("colors.dark"),
              "&:hover": {
                color: "rgba(28,29,37,0.8)"
              }
            },
            blockquote: {
              borderLeftColor: "rgba(28,29,37,0.75)",
              color: theme("colors.dark")
            },
            "h2,h3,h4": {
              color: theme("colors.dark")
            },
            ol: {
              li: {
                color: theme("colors.dark"),
                "&::marker": {
                  color: "rgba(28,29,37,0.85)"
                }
              }
            },
            ul: {
              li: {
                color: theme("colors.dark"),
                "&::marker": {
                  color: "rgba(28,29,37,0.85)"
                }
              }
            },
            strong: { color: theme("colors.dark") },
            // disabled
            "code::before": false,
            "code::after": false,
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
            pre: false,
            code: false,
            "pre code": false
          }
        },
        dark: {
          css: {
            color: theme("colors.light"),
            a: {
              color: theme("colors.light"),
              "&:hover": {
                color: "rgba(255,255,245,0.8)"
              }
            },
            blockquote: {
              borderLeftColor: "rgba(255,255,245,0.75)",
              color: theme("colors.light")
            },
            "h2,h3,h4": {
              color: theme("colors.light")
            },
            ol: {
              li: {
                color: theme("colors.light"),
                "&::marker": {
                  color: "rgba(255,255,245,0.85)"
                }
              }
            },
            ul: {
              li: {
                color: theme("colors.light"),
                "&::marker": {
                  color: "rgba(255,255,245,0.85)"
                }
              }
            },
            strong: { color: theme("colors.light") },
            // disabled
            "code::before": false,
            "code::after": false,
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
            pre: false,
            code: false,
            "pre code": false
          }
        }
      })
    }
  },
  variants: {
    typography: ["dark"]
  },
  plugins: [require("@tailwindcss/typography")]
};
