import UserReviewCard from "@/components/bussiness/UserReviewCard";
import { MatchingHistoryContext } from "@/contexts/matchingHistory";
import { Empty, Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";

function MatchingHistoryPage() {
  const { reviewList, fetchReviewList } = useContext(MatchingHistoryContext);

  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    await fetchReviewList();
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : reviewList && reviewList.length ? (
        <div className="flex flex-col gap-6">
          {reviewList.map((item, index) => (
            <UserReviewCard userId={item} key={index} />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
}

export default MatchingHistoryPage;
