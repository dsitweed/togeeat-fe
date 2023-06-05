import UserInfoForm from "@/pages/user/components/UserInfoForm";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Button, Breadcrumb, Input, theme } from "antd";
import React, { useState } from "react";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ collapsed, setCollapsed }: Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout.Header
      className="flex items-center p-4 border-slate-300 border-solid border-0 border-b"
      style={{ background: colorBgContainer }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-4"
      />
      <Breadcrumb
        className="ml-4"
        items={[{ title: "Home" }, { title: "Test" }]}
      />
      <span className="flex-1" />
      <Input.Search placeholder="Search" className="w-64" />
      <Button
        type="primary"
        className="ml-4"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Profile
      </Button>
      <UserInfoForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </Layout.Header>
  );
}

export default Header;
