import {
  ApiOutlined,
  HistoryOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Tooltip } from "antd";
import React, { useCallback } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const items = [
  {
    key: /* "/quick-matching" */ "/",
    label: "Quick Matching",
    icon: <ApiOutlined />,
    children: null,
  },
  {
    key: "/schedule-matching",
    label: "Schedule Matching",
    icon: <ScheduleOutlined />,
    children: null,
  },
  {
    key: "/matching-history",
    label: "Matching History",
    icon: <HistoryOutlined />,
    children: null,
  },
  {
    key: "/chat",
    label: "Chat",
    icon: <WechatOutlined />,
    children: null,
  },
];

function Sider({ collapsed, setCollapsed }: Props) {
  const navigate = useNavigate();
  const siderItems = useCallback(
    () => items.map((item) => ({ ...item, onClick: () => navigate(item.key) })),
    [navigate]
  );

  return (
    <Layout.Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={64}
      width={256}
      onCollapse={(value) => setCollapsed(value)}
      className="border-solid border-0 border-r border-slate-300 font-medium"
    >
      <div className="flex justify-center py-3 border-b border-slate-300 border-solid border-0">
        {collapsed ? (
          <Tooltip title="Stonks" placement="right">
            <Avatar
              size={40}
              className="flex items-center justify-center justify-self-center shadow-lg"
              src={"/avatar.png"}
              icon={<UserOutlined />}
            />
          </Tooltip>
        ) : (
          <div className="flex flex-row items-center w-full px-8 gap-2">
            <Avatar
              size={40}
              className="flex items-center justify-center justify-self-center shadow-lg"
              src={"/avatar.png"}
              icon={<UserOutlined />}
            />
            <p className="font-semibold">{"Stonks"}</p>
          </div>
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        className="text-slate-500"
        defaultSelectedKeys={[location.pathname]}
        items={siderItems()}
      />
      <div className="absolute flex justify-center w-full bottom-4">
        <Button icon={<LogoutOutlined />} className="w-full mx-3">
          {!collapsed && "Logout"}
        </Button>
      </div>
    </Layout.Sider>
  );
}

export default Sider;
