import "i18next";
import type common from "../public/locales/en/common.json";
import type business from "../public/locales/en/business.json";
import type personal from "../public/locales/en/personal.json";
import type joinUs from "../public/locales/en/join-us.json";
import type jobsBoard from "../public/locales/en/jobs-board.json";
import type blog from "../public/locales/en/blog.json";
import type faq from "../public/locales/en/faq.json";
import type privacyPolicy from "../public/locales/en/privacy-policy.json";
import type termsAndConditions from "../public/locales/en/terms-and-conditions.json";
import type howTo from "../public/locales/en/how-to.json";
import type contactUs from "../public/locales/en/contact-us.json";
import type contactSupport from "../public/locales/en/contact-support.json";

interface I18nNamespaces {
  common: typeof common;
  business: typeof business;
  personal: typeof personal;
  "join-us": typeof joinUs;
  "jobs-board": typeof jobsBoard;
  blog: typeof blog;
  faq: typeof faq;
  "privacy-policy": typeof privacyPolicy;
  "terms-and-conditions": typeof termsAndConditions;
  "how-to": typeof howTo;
  "contact-us": typeof contactUs;
  "contact-support": typeof contactSupport;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: I18nNamespaces;
  }
}
