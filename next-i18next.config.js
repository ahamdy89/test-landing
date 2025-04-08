const path = require("path");

/**
 * @type import('next-i18next').UserConfig
 */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
  },
  fallbackLng: false,
  reloadOnPrerender: process.env.NODE_ENV != "production",
  localePath: path.resolve("./public/locales"),
  localeStructure: "{lng}/{ns}",
  interpolation: {
    prefix: "{",
    suffix: "}",
  },
};
