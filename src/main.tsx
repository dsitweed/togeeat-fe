import "@/plugins/axios";
import "@/plugins/dayjs";
import "@fontsource/inter";
import "./index.css";
import "./locales";

import { App, ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { theme } from "./assets/theme";
import { router } from "./plugins/router";
import AuthProvider from "./contexts/providers/AuthProvider";
import LanguageProvider from "./contexts/providers/LanguageProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <LanguageProvider>
          <App>
            <RouterProvider router={router} />
          </App>
        </LanguageProvider>
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>
);
