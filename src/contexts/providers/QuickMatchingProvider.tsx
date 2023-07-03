import { useApiClient } from "@/shared/hooks/api";
import { PropsWithChildren, useState } from "react";
import { QuickMatchingContext } from "../quickMatching";
import { unionBy } from "lodash";

function QuickMatchingProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<Response.IQuickMatching>(
    "/matching?matchingType=QUICK"
  );
  const [matchingList, setMatchingList] = useState<Response.IQuickMatching[]>();
  const [loading, setLoading] = useState(false);
  async function fetchMatchingList(ownerName?: string) {
    setLoading(true);
    const response = await apiClient.getAll({ ownerName });
    const response2 = await apiClient.getAll({
      address: ownerName,
    });
    if (response?.success) {
      setMatchingList(
        unionBy(response.data.items, response2?.data.items, "id")
      );
    }
    setLoading(false);
  }
  return (
    <QuickMatchingContext.Provider
      value={{ loading, matchingList, fetchMatchingList }}
    >
      {props.children}
    </QuickMatchingContext.Provider>
  );
}

export default QuickMatchingProvider;
