import { useApiClient } from "@/shared/hooks/api";
import { PropsWithChildren, useState } from "react";
import { MatchingHistoryContext } from "../matchingHistory";

function MatchingHistoryProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<Response.IMatchingHistory>(
    "/matching/my-matchings"
  );
  const [reviewList, setReviewList] = useState<number[]>();

  async function fetchReviewList() {
    const response = await apiClient.getAll();
    if (response?.success) {
      const userIdList: number[] = [];
      response.data.items.forEach((element) => {
        element.matching.userMatchings.map((item) => {
          if (!userIdList.includes(item.user.id)) {
            userIdList.push(item.user.id);
          }
        });
      });
      setReviewList(userIdList);
    }
  }

  return (
    <MatchingHistoryContext.Provider value={{ reviewList, fetchReviewList }}>
      {props.children}
    </MatchingHistoryContext.Provider>
  );
}

export default MatchingHistoryProvider;
