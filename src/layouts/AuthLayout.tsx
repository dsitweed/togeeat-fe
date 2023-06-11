import ChangeLanguage from "@/components/common/ChangeLanguage";
import LanguageProvider from "@/providers/LanguageProvider";
import { App } from "antd";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <App>
      <LanguageProvider>
        <div className="min-h-screen  flex justify-center items-center bg-primary bg-opacity-10 py-4">
          <div className="absolute top-5 right-5">
            <ChangeLanguage />
          </div>
          <div className="flex flex-col bg-white border rounded-lg shadow px-4 py-6">
            <Outlet />
          </div>
        </div>
      </LanguageProvider>
    </App>
  );
}

export default AuthLayout;
