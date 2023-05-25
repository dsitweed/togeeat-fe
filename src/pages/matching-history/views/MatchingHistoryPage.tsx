import { Empty } from "antd";
import { useContext, useEffect } from "react";
import UserReview from "../components/UserReview";
import { MatchingHistoryContext } from "../contexts";

function MatchingHistoryPage() {
  const { reviewList, fetchReviewList } = useContext(MatchingHistoryContext);

  useEffect(() => {
    fetchReviewList();
  }, []);

  return (
    <div>
      {reviewList ? (
        <div className="flex flex-col gap-6">
          {reviewList.map((item, index) => (
            <UserReview {...item} key={index} />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
}

export default MatchingHistoryPage;
