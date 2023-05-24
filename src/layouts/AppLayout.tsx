import { App, Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sider from "./components/Sider";

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <App>
      <Layout style={{ height: "100vh" }}>
        <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout.Content className="overflow-auto">
            <div className="mx-6 my-4 ">
              <Outlet />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </App>
  );
}

export default AppLayout;
