import { App, Layout } from "antd";
import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sider from "./components/Sider";
import MatchingHistoryProvider from "@/pages/matching-history/contexts/MatchingHistoryProvider";
import QuickMatchingProvider from "@/pages/quick-matching/contexts/QuickMatchingProvider";

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <App>
      <MatchingHistoryProvider>
        <QuickMatchingProvider>
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
        </QuickMatchingProvider>
      </MatchingHistoryProvider>
    </App>
  );
}

export default AppLayout;
