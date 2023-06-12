import { useApiClient } from "@/shared/hooks/api";
import { PropsWithChildren, useState } from "react";
import { QuickMatchingContext } from "../quickMatching";

function QuickMatchingProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<Response.IQuickMatching>(
    "/matching?status=OPEN&matchingType=QUICK"
  );
  const [matchingList, setMatchingList] = useState<Response.IQuickMatching[]>();

  async function fetchMatchingList() {
    const response = await apiClient.getAll();
    if (response?.success) {
      setMatchingList(response.data.items);
    }
  }
  return (
    <QuickMatchingContext.Provider value={{ matchingList, fetchMatchingList }}>
      {props.children}
    </QuickMatchingContext.Provider>
  );
}

export default QuickMatchingProvider;
