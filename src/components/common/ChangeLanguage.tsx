import { IconLanguageHiragana } from "@tabler/icons-react";
import { Button, Dropdown } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
export const languageText: Record<I18nType.Language, string> = {
  en: "English",
  ja: "日本語",
  vi: "Tiếng Việt",
};

export const languageOptions = Object.values([
  "en",
  "ja",
  "vi",
] as I18nType.Language[]).map((item) => ({
  value: item,
  label: languageText[item],
}));

function ChangeLanguage() {
  const { i18n } = useTranslation();

  const options = Object.values(["en", "ja", "vi"] as I18nType.Language[]).map(
    (item) => ({
      key: item,
      label: (
        <p onClick={() => handleChangeLanguage(item)}>{languageText[item]}</p>
      ),
    })
  );

  function handleChangeLanguage(val: I18nType.Language) {
    dayjs.locale(val);
    i18n.changeLanguage(val);
    localStorage.setItem("language", val);
  }
  return (
    <Dropdown placement="bottom" menu={{ items: options }}>
      <Button>
        <IconLanguageHiragana strokeWidth={1.5} />
      </Button>
    </Dropdown>
  );
}

export default ChangeLanguage;
