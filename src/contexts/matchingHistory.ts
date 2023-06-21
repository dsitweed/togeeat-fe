import { createContext } from "react";

interface MatchingHistoryState {
  loading?: boolean;
  reviewList?: number[];
  lastMatchingDate?: Date;
  fetchReviewList: (username?: string) => Promise<void>;
}

export const MatchingHistoryContext = createContext<MatchingHistoryState>({
  fetchReviewList: async () => {},
});
