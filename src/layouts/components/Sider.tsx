import { AuthContext } from "@/contexts/auth";
import Icon, { UserOutlined } from "@ant-design/icons";
import {
  IconBrandTinder,
  IconBrandWechat,
  IconCalendarEvent,
  IconHistory,
  IconLogout,
} from "@tabler/icons-react";
import { Avatar, Button, Layout, Menu, Tooltip } from "antd";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const items = [
  {
    key: "/",
    label: "common.title.quickMatching",
    icon: <IconBrandTinder size={16} strokeWidth={1.5} />,
    children: null,
  },
  {
    key: "/schedule-matching",
    label: "common.title.scheduleMatching",
    icon: <IconCalendarEvent size={16} strokeWidth={1.5} />,
    children: null,
  },
  {
    key: "/matching-history",
    label: "common.title.matchingHistory",
    icon: <IconHistory size={16} strokeWidth={1.5} />,
    children: null,
  },
  {
    key: "/chat",
    label: "common.title.chat",
    icon: <IconBrandWechat size={16} strokeWidth={1.5} />,
    children: null,
  },
];

function Sider({ collapsed, setCollapsed }: Props) {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const siderItems = useCallback(
    () =>
      items?.map((item) => ({
        ...item,
        label: t(item.label),
        onClick: () => navigate(item.key),
      })),
    [navigate]
  );

  function handleSignOut() {
    localStorage.clear();
    navigate("/auth/sign-in");
  }

  return (
    <Layout.Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={80}
      width={256}
      onCollapse={(value) => setCollapsed(value)}
      className="border-solid border-0 border-r border-slate-300 font-medium"
    >
      <div className="flex justify-center py-3 border-b border-slate-300 border-solid border-0">
        {collapsed ? (
          <Tooltip title={user?.name} placement="right">
            <Avatar
              size={40}
              className="flex items-center justify-center justify-self-center shadow-lg"
              src={user?.avatar || "/avatar.jpg"}
              icon={<UserOutlined />}
            />
          </Tooltip>
        ) : (
          <div className="flex flex-row items-center w-full px-8 gap-2">
            <Avatar
              size={40}
              className="flex items-center justify-center justify-self-center shadow-lg"
              src={user?.avatar || "/avatar.jpg"}
            />
            <p className="font-semibold">{user?.name}</p>
          </div>
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        className="text-slate-500 px-2 pt-2"
        defaultSelectedKeys={[location.hash.slice(1)]}
        items={siderItems()}
      />
      <div className="absolute flex justify-center w-full bottom-4">
        <Button
          icon={
            <Icon
              component={() => <IconLogout size={16} strokeWidth={1.5} />}
            />
          }
          onClick={handleSignOut}
          className="w-full mx-3"
        >
          {!collapsed && t("auth.action.signOut")}
        </Button>
      </div>
    </Layout.Sider>
  );
}

export default Sider;
