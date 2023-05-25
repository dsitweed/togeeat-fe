import { Empty } from "antd";
import QuickMatchingItem from "../components/QuickMatchingItem";
import { QuickMatchingContext } from "../contexts";
import { useContext, useEffect } from "react";

function QuickMatchingPage() {
  const { matchingList, fetchMatchingList } = useContext(QuickMatchingContext);

  useEffect(() => {
    fetchMatchingList();
  }, []);

  return (
    <div>
      {matchingList ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {matchingList.map((item, index) => (
            <QuickMatchingItem {...item} key={index} />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
}

export default QuickMatchingPage;
