import "@/plugins/axios";
import "@/plugins/dayjs";
import "@fontsource/inter";
import "./index.css";
import "./locales";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/providers/AuthProvider";
import LanguageProvider from "./contexts/providers/LanguageProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);
