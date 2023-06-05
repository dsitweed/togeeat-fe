import { useApiClient } from "@/shared/hooks/api";
import { PropsWithChildren, useState } from "react";
import { MatchingHistoryContext } from ".";
import { IUserReview } from "../interfaces";

function MatchingHistoryProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<IUserReview>("/matching/my-matchings");
  const [reviewList, setReviewList] = useState<IUserReview[]>();

  async function fetchReviewList() {
    const response = await apiClient.getAll();
    if (response?.success) {
      setReviewList(response.data.items);
    }
  }

  return (
    <MatchingHistoryContext.Provider value={{ reviewList, fetchReviewList }}>
      {props.children}
    </MatchingHistoryContext.Provider>
  );
}

export default MatchingHistoryProvider;
