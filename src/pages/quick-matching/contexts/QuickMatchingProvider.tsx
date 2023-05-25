import { useApiClient } from "@/shared/hooks/api";
import { PropsWithChildren, useState } from "react";
import { QuickMatchingContext } from ".";
import { IQuickMatching } from "../interfaces";

function QuickMatchingProvider(props: PropsWithChildren) {
  const apiClient = useApiClient<IQuickMatching>("/quick-matching");
  const [matchingList, setMatchingList] = useState<IQuickMatching[]>();

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
