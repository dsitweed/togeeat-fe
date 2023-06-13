import { createContext } from "react";

interface MatchingHistoryState {
  reviewList?: number[];
  lastMatchingDate?: Date;
  fetchReviewList: () => Promise<void>;
}

export const MatchingHistoryContext = createContext<MatchingHistoryState>({
  fetchReviewList: async () => {},
});
