import { QuickMatchingContext } from "@/pages/quick-matching/contexts";
import ScheduleMatchingItem from "../components/ScheduleMatchingItem";
import { useContext, useEffect, useState } from "react";
import { Button, Empty } from "antd";
import CreateMatchingForm from "../components/CreateMatchingForm";

function ScheduleMatchingPage() {
  const { matchingList, fetchMatchingList } = useContext(QuickMatchingContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMatchingList();
  }, []);

  return (
    <div>
      <Button
        size="large"
        className="mb-4"
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Set a schedule
      </Button>
      {matchingList ? (
        <div className="flex flex-col gap-4">
          {matchingList?.map((item, index) => (
            <ScheduleMatchingItem {...item} key={index} />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <CreateMatchingForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}

export default ScheduleMatchingPage;
