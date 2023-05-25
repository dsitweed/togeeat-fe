import { createContext } from "react";
import { IQuickMatching } from "../interfaces";

interface QuickMatchingState {
  matchingList?: IQuickMatching[];
  fetchMatchingList: () => Promise<void>;
}

export const QuickMatchingContext = createContext<QuickMatchingState>({
  fetchMatchingList: async () => {},
});
