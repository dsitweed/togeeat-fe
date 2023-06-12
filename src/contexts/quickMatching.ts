import { createContext } from "react";

interface QuickMatchingState {
  matchingList?: Response.IQuickMatching[];
  fetchMatchingList: () => Promise<void>;
}

export const QuickMatchingContext = createContext<QuickMatchingState>({
  fetchMatchingList: async () => {},
});
