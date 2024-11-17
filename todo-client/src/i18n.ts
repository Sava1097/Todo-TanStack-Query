import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// import translation 
import en from "../public/locales/en/translation.json";
import ru from "../public/locales/ru/translation.json";

// create resources object
const resources = {
  en: { translation: en },
  ru: { translation: ru },
} as const;

// initialization
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export type DefaultResources = typeof resources;
declare module "i18next" {
  interface CustomTypeOptions {
    resources: DefaultResources["en"];
  }
}

export default i18next;
