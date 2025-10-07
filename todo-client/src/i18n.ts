import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HTTPBackend from "i18next-http-backend"

const savedLang = localStorage.getItem("lang") || "en"
// initialization
i18next
  .use(HTTPBackend)
  .use(initReactI18next)
  .init({
    lng: savedLang,
    fallbackLng: "en",
    ns: ["__root", "todos", "about"],
    defaultNS: "todos",
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true
    }
  });

export default i18next;
