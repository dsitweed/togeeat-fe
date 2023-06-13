import { createContext } from "react";

interface QuickMatchingState {
  loading?: boolean;
  matchingList?: Response.IQuickMatching[];
  fetchMatchingList: (ownerName?: string) => Promise<void>;
}

export const QuickMatchingContext = createContext<QuickMatchingState>({
  fetchMatchingList: async () => {},
});
