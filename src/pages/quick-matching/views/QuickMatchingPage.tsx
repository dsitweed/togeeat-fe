import { Button, Empty } from "antd";
import QuickMatchingItem from "../components/QuickMatchingItem";
import { QuickMatchingContext } from "../contexts";
import { useContext, useEffect, useState } from "react";
import QuickMatchingForm from "../components/QuickMatchingForm";

function QuickMatchingPage() {
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
        New quick matching
      </Button>
      {matchingList ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
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
