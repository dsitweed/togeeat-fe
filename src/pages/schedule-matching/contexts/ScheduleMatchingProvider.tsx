import { useApiClient } from "@/shared/hooks/api";
import { PropsWithChildren, useState } from "react";
import { ScheduleMatchingContext } from ".";
import { IMatching } from "../interfaces";

function ScheduleMatchingProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<IMatching>("/schedule-matching");
  const [matchingList, setMatchingList] = useState<IMatching[]>();

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
