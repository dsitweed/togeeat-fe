import { AuthContext } from "@/contexts/auth";
import { Layout } from "antd";
import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sider from "./components/Sider";

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className="flex flex-col overflow-auto">
          <div className="h-full flex-1">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
