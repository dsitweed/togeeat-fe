import { AuthContext } from "@/contexts/auth";
import MatchingHistoryProvider from "@/contexts/providers/MatchingHistoryProvider";
import QuickMatchingProvider from "@/contexts/providers/QuickMatchingProvider";
import ScheduleMatchingProvider from "@/contexts/providers/ScheduleMatchingProvider";
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
    <MatchingHistoryProvider>
      <QuickMatchingProvider>
        <ScheduleMatchingProvider>
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
        </ScheduleMatchingProvider>
      </QuickMatchingProvider>
    </MatchingHistoryProvider>
  );
}

export default AppLayout;
