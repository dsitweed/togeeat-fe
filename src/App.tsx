import { App as AntdApp, ConfigProvider } from "antd";
import en from "antd/locale/en_US";
import ja from "antd/locale/ja_JP";
import vi from "antd/locale/vi_VN";
import { RouterProvider } from "react-router-dom";
import { theme } from "./assets/theme";
import { router } from "./plugins/router";

import { LoadScript } from "@react-google-maps/api";
import { useContext } from "react";
import { LanguageContext } from "./contexts/language";
import MatchingHistoryProvider from "./contexts/providers/MatchingHistoryProvider";
import QuickMatchingProvider from "./contexts/providers/QuickMatchingProvider";
import ScheduleMatchingProvider from "./contexts/providers/ScheduleMatchingProvider";

function App() {
  const { language } = useContext(LanguageContext);

  function getLocale(language: I18nType.Language) {
    switch (language) {
      case "en":
        return en;
      case "ja":
        return ja;
      case "vi":
        return vi;
      default:
        return ja;
    }
  }

  return (
    <ConfigProvider theme={theme} locale={getLocale(language)}>
      <AntdApp>
        <MatchingHistoryProvider>
          <QuickMatchingProvider>
            <ScheduleMatchingProvider>
              <LoadScript googleMapsApiKey="AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8">
                <RouterProvider router={router} />
              </LoadScript>
            </ScheduleMatchingProvider>
          </QuickMatchingProvider>
        </MatchingHistoryProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
