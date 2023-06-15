import { createContext } from "react";

interface MatchingHistoryState {
  reviewList?: number[];
  lastMatchingDate?: Date;
  fetchReviewList: (username?: string) => Promise<void>;
}

export const MatchingHistoryContext = createContext<MatchingHistoryState>({
  fetchReviewList: async () => {},
});
