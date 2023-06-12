import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ja from "./ja.json";
import vi from "./vi.json";

const resources = {
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
  vi: {
    translation: vi,
  },
};

export const initLanguage: I18nType.Language = (localStorage.getItem(
  "language"
) || "ja") as I18nType.Language;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: initLanguage,
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    returnNull: false,
  });

export default i18n;
