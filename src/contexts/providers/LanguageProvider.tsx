import { PropsWithChildren, useState } from "react";
import { LanguageContext } from "../language";
import { initLanguage } from "@/locales";

function LanguageProvider(props: PropsWithChildren) {
  const [language, setLanguage] = useState<I18nType.Language>(initLanguage);

  function changeLanguage(val: I18nType.Language) {
    setLanguage(val);
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
