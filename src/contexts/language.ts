import { createContext } from "react";

interface LanguageState {
  language: I18nType.Language;
  changeLanguage: (val: I18nType.Language) => void;
}

export const LanguageContext = createContext<LanguageState>({
  language: (localStorage.getItem("language") || "en") as I18nType.Language,
  changeLanguage: () => {},
});
