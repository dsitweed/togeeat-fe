import ScheduleMatchingForm from "@/components/bussiness/ScheduleMatchingForm";
import ScheduleMatchingItem from "@/components/bussiness/ScheduleMatchingItem";
import { ScheduleMatchingContext } from "@/contexts/scheduleMatching";
import { IconLoader, IconReload } from "@tabler/icons-react";
import { Button, Empty, Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function ScheduleMatchingPage() {
  const { t } = useTranslation();
  const { matchingList, fetchMatchingList } = useContext(
    ScheduleMatchingContext
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    await fetchMatchingList();
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <Button
          className="mb-4"
          type="primary"
          onClick={() => setIsModalOpen(true)}
        >
          {t("common.button.newscheduleMatching")}
        </Button>
        <Button onClick={load}>
          {loading ? (
            <IconLoader size={20} strokeWidth={1.5} className="animate-spin" />
          ) : (
            <IconReload size={20} strokeWidth={1.5} />
          )}
        </Button>
      </div>
      {loading ? (
        <Skeleton />
      ) : matchingList ? (
        <div className="flex flex-col gap-4">
          {matchingList?.map((item, index) => (
            <ScheduleMatchingItem {...item} key={index} />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <ScheduleMatchingForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}

export default ScheduleMatchingPage;
