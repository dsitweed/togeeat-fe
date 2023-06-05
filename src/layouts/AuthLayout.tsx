import { App } from "antd";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <App>
      <div className="h-screen w-screen flex justify-center items-center bg-primary bg-opacity-10">
        <div className="min-w-[480px] flex flex-col bg-white border rounded-lg shadow px-4 py-6">
          <Outlet />
        </div>
      </div>
    </App>
  );
}

export default AuthLayout;
