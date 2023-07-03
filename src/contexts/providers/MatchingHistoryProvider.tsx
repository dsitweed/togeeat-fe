import { useApiClient } from "@/shared/hooks/api";
import { PropsWithChildren, useState } from "react";
import { MatchingHistoryContext } from "../matchingHistory";
import { unionBy } from "lodash";

function MatchingHistoryProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<Response.IMatchingHistory>(
    "/matching/my-matchings"
  );
  const [reviewList, setReviewList] = useState<number[]>();
  const [lastMatchingDate, setLastMatchingDate] = useState<Date>();

  async function fetchReviewList(username?: string) {
    const response = await apiClient.getAll({
      ownerName: username,
    });
    const response2 = await apiClient.getAll({
      address: username,
    });
    if (response?.success) {
      const union = unionBy(response.data.items, response2?.data.items, "id");
      const first = union[0];
      if (first) {
        setLastMatchingDate(first.matching.matchingDate);
      } else {
        setLastMatchingDate(undefined);
      }
      const userIdList: number[] = [];
      union.forEach((element) => {
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
    <MatchingHistoryContext.Provider
      value={{ lastMatchingDate, reviewList, fetchReviewList }}
    >
      {props.children}
    </MatchingHistoryContext.Provider>
  );
}

export default MatchingHistoryProvider;
