import { LanguageContext } from "@/contexts/language";
import { PropsWithChildren, useState } from "react";

function LanguageProvider(props: PropsWithChildren) {
  const [language, setLanguage] = useState<I18nType.Language>("en-US");

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
