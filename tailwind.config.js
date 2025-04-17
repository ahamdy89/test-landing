const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const typographyConfig = require("./tailwind-typography.config");

module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx", "./lib/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        ESRebondGrotesque: ["var(--font-es-rebond-grotesque)"],
        AvenirArabic: ["var(--font-avenir-arabic)"],
      },
      animation: {
        "linear-loader": "infinite-linear-loader 1s linear infinite",
        "scale-in": "scale-in 200ms ease",
        "scale-out": "scale-out 200ms ease",
        "fade-in": "fade-in 300ms ease",
        "fade-out": "fade-out 300ms ease",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both;",
      },
      keyframes: {
        "infinite-linear-loader": {
          from: { "background-position-x": "150%" },
          to: { "background-position-x": "-50%" },
        },
        "scale-in": {
          from: {
            transform: "rotateX(-30deg) scale(0.9)",
            opacity: 0,
          },
          to: {
            transform: "rotateX(0deg) scale(1)",
            opacity: 1,
          },
        },
        "scale-out": {
          from: {
            transform: "rotateX(0deg) scale(1)",
            opacity: 1,
          },
          to: {
            transform: "rotateX(-10deg) scale(0.95)",
            opacity: 0,
          },
        },
        "fade-in": {
          from: {
            opacity: 0,
          },
        },
        "fade-out": {
          to: {
            opacity: 0,
          },
        },
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      red: colors.red,
      "off-white": {
        DEFAULT: "rgb(var(--off-white) / <alpha-value>)",
        card: "#D3D2D263",
        footer: "#D9D9D938",
        text: "#878585",
      },
      "brand-primary": {
        light: "rgb(var(--brand-primary-light) / <alpha-value>)",
        DEFAULT: "rgb(var(--brand-primary) / <alpha-value>)",
        dark: "rgb(var(--brand-primary-dark) / <alpha-value>)",
        darkest: "rgb(var(--brand-primary-darkest) / <alpha-value>)",
      },
      bronze: {
        light: "rgb(var(--bronze-light) / <alpha-value>)",
        DEFAULT: "rgb(var(--bronze) / <alpha-value>)",
        dark: "rgb(var(--bronze-dark) / <alpha-value>)",
      },
      blue: {
        light: "rgb(var(--blue-light) / <alpha-value>)",
        DEFAULT: "rgb(var(--blue) / <alpha-value>)",
        dark: "rgb(var(--blue-dark) / <alpha-value>)",
      },
      pink: {
        light: "rgb(var(--pink-light) / <alpha-value>)",
        DEFAULT: "rgb(var(--pink) / <alpha-value>)",
        dark: "rgb(var(--pink-dark) / <alpha-value>)",
      },
    },
    screens: {
      mobile: "768",
      tablet: "834px",
      laptop: "1080px",
    },
    backgroundImage: {
      "main-background-gradient": "linear-gradient(90deg, #3fbca0, #16b8d2);",
      "revers-background-gradient":
        "radial-gradient(87.17% 201.34% at 8.5% 50%, rgba(13, 173, 197, 0.945) 0%, #41BCA0 89%);",
    },
    typography: typographyConfig,
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")({ target: "modern" }),
    plugin(function ({ matchUtilities, theme }) {
      // bg-bleed utility classes
      matchUtilities(
        {
          "bg-bleed": (valueOrFunction) => {
            const value =
              typeof valueOrFunction == "function"
                ? valueOrFunction({})
                : valueOrFunction;

            return {
              borderImageSource: `linear-gradient(${value}, ${value})`,
              borderImageSlice: "0 fill",
              borderImageOutset: "0 100vw",
            };
          },
        },
        {
          values: flattenColorPalette(theme("colors")),
          type: "color",
        }
      );

      // solid-shadow utility classes
      matchUtilities(
        {
          "solid-shadow": (valueOrFunction) => {
            const value =
              typeof valueOrFunction == "function"
                ? valueOrFunction({})
                : valueOrFunction;

            return {
              "--tw-shadow": `7px 6px 0 0 ${value}`,
              "--tw-shadow-colored": `7px 6px 0 0 ${value}`,
              "box-shadow":
                "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
            };
          },
        },
        {
          values: flattenColorPalette(theme("colors")),
          type: "color",
        }
      );
    }),
  ],
};
