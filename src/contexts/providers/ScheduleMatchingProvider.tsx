import { useApiClient } from "@/shared/hooks/api";
import { unionBy } from "lodash";
import { PropsWithChildren, useState } from "react";
import { ScheduleMatchingContext } from "../scheduleMatching";

function ScheduleMatchingProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<Response.IScheduleMatching>(
    "/matching?matchingType=YOTEI"
  );
  const [matchingList, setMatchingList] =
    useState<Response.IScheduleMatching[]>();
  const [loading, setLoading] = useState(false);

  async function fetchMatchingList(keyword?: string) {
    setLoading(true);
    const response = await apiClient.getAll({
      ownerName: keyword,
    });
    const response2 = await apiClient.getAll({
      address: keyword,
    });
    if (response?.success) {
      setMatchingList(
        unionBy(response.data.items, response2?.data.items, "id")
      );
    }
    setLoading(false);
  }
  return (
    <ScheduleMatchingContext.Provider
      value={{ loading, matchingList, fetchMatchingList }}
    >
      {props.children}
    </ScheduleMatchingContext.Provider>
  );
}

export default ScheduleMatchingProvider;
