import { useApiClient } from "@/shared/hooks/api";
import { PropsWithChildren, useState } from "react";
import { MatchingHistoryContext } from "../matchingHistory";

function MatchingHistoryProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<Response.IUser>("/matching/my-matchings");
  const [reviewList, setReviewList] = useState<Response.IUser[]>();

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
