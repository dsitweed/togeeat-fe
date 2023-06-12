import QuickMatchingForm from "@/components/bussiness/QuickMatchingForm";
import QuickMatchingItem from "@/components/bussiness/QuickMatchingItem";
import { QuickMatchingContext } from "@/contexts/quickMatching";
import { IconLoader, IconReload } from "@tabler/icons-react";
import { Button, Empty, Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function QuickMatchingPage() {
  const { t } = useTranslation();
  const { matchingList, fetchMatchingList } = useContext(QuickMatchingContext);
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
          {t("common.button.newQuickMatching")}
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
      ) : matchingList && matchingList.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {matchingList.map((item, index) => (
            <QuickMatchingItem {...item} key={index} />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <QuickMatchingForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}

export default QuickMatchingPage;
