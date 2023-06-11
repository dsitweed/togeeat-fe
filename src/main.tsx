import "@/plugins/axios";
import "@/plugins/dayjs";
import "@fontsource/inter";
import "./index.css";
import "./locales";

import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { theme } from "./assets/theme";
import { router } from "./plugins/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
