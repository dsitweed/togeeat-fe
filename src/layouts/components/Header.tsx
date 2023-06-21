import ChangeLanguage from "@/components/common/ChangeLanguage";
import UserInfoForm from "@/components/bussiness/UserInfoForm";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { IconSearch, IconUserEdit } from "@tabler/icons-react";
import { Layout, Button, Breadcrumb, Input, theme } from "antd";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { QuickMatchingContext } from "@/contexts/quickMatching";
import { ScheduleMatchingContext } from "@/contexts/scheduleMatching";
import { MatchingHistoryContext } from "@/contexts/matchingHistory";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const mapPathname: Record<string, string> = {
  "/": "quickMatching",
  "/quick-matching": "quickMatching",
  "/schedule-matching": "scheduleMatching",
  "/matching-history": "matchingHistory",
  "/chat": "chat",
};

function Header({ collapsed, setCollapsed }: Props) {
  const { t } = useTranslation();
  const { fetchMatchingList: fetchQuick } = useContext(QuickMatchingContext);
  const { fetchMatchingList: fetchSchedule } = useContext(
    ScheduleMatchingContext
  );
  const { fetchReviewList: fetchHistory } = useContext(MatchingHistoryContext);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { pathname } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSearch(search: string) {
    const path = window.location.hash;
    console.log(path);

    if (path === "#/") {
      await fetchQuick(search);
    } else if (path === "#/schedule-matching") {
      await fetchSchedule(search);
    } else if (path === "#/matching-history") {
      await fetchHistory(search);
    } else {
    }
  }
  return (
    <Layout.Header
      className="flex items-center px-4 h-16 border-slate-300 border-solid border-0 border-b"
      style={{ background: colorBgContainer }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-4"
      />
      <Breadcrumb
        className="hidden md:block ml-4"
        items={[
          { title: t("common.title.home") },
          { title: t(`common.title.${mapPathname[pathname]}`) },
        ]}
      />
      <span className="flex-1" />
      <div className="inline-flex gap-2">
        <Input.Search
          placeholder={t("common.button.search")}
          className="hidden md:block"
          onSearch={(e) => handleSearch(e)}
        />
        <Button className="md:hidden">
          <IconSearch size={20} />
        </Button>
        <ChangeLanguage />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          <p className="hidden md:block">{t("common.button.editProfile")}</p>
          <IconUserEdit size={20} className="md:hidden" />
        </Button>
      </div>
      <UserInfoForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </Layout.Header>
  );
}

export default Header;
