import { LanguageContext } from "@/contexts/language";
import { Select } from "antd";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export const languageText: Record<I18nType.Language, string> = {
  "en-US": "English",
  "ja-JP": "日本語",
  "vi-VN": "Tiếng Việt",
};

export const languageOptions = Object.values([
  "en-US",
  "ja-JP",
  "vi-VN",
] as I18nType.Language[]).map((item) => ({
  value: item,
  label: languageText[item],
}));

function ChangeLanguage() {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);

  const options = Object.values([
    "en-US",
    "ja-JP",
    "vi-VN",
  ] as I18nType.Language[]).map((item) => ({
    value: item,
    label: languageText[item],
  }));

  function handleChangeLanguage(val: I18nType.Language) {
    i18n.changeLanguage(val);
    changeLanguage(val);
  }
  return (
    <Select
      value={language}
      onChange={handleChangeLanguage}
      options={options}
      className="min-w-[120px]"
    ></Select>
  );
}

export default ChangeLanguage;
