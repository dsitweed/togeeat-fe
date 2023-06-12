import { useApiClient } from "@/shared/hooks/api";
import { PropsWithChildren, useState } from "react";
import { ScheduleMatchingContext } from "../scheduleMatching";

function ScheduleMatchingProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<Response.IScheduleMatching>(
    "/matching?matchingType=YOTEI"
  );
  const [matchingList, setMatchingList] =
    useState<Response.IScheduleMatching[]>();

  async function fetchMatchingList() {
    const response = await apiClient.getAll();
    if (response?.success) {
      setMatchingList(response.data.items);
    }
  }
  return (
    <ScheduleMatchingContext.Provider
      value={{ matchingList, fetchMatchingList }}
    >
      {props.children}
    </ScheduleMatchingContext.Provider>
  );
}

export default ScheduleMatchingProvider;
