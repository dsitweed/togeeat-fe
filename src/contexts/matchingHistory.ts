import { createContext } from "react";

interface MatchingHistoryState {
  reviewList?: number[];
  fetchReviewList: () => Promise<void>;
}

export const MatchingHistoryContext = createContext<MatchingHistoryState>({
  fetchReviewList: async () => {},
});
