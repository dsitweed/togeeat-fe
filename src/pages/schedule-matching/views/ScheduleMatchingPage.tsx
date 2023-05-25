import { QuickMatchingContext } from "@/pages/quick-matching/contexts";
import ScheduleMatchingItem from "../components/ScheduleMatchingItem";
import { useContext, useEffect } from "react";
import { Empty } from "antd";

function ScheduleMatchingPage() {
  const { matchingList, fetchMatchingList } = useContext(QuickMatchingContext);

  useEffect(() => {
    fetchMatchingList();
  }, []);

  return (
    <div>
      {matchingList ? (
        <div className="flex flex-col gap-4">
          <ScheduleMatchingItem />
          {matchingList?.map((item, index) => (
            <ScheduleMatchingItem {...item} key={index} />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
}

export default ScheduleMatchingPage;
