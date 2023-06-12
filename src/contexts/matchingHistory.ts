import { createContext } from "react";

interface MatchingHistoryState {
  reviewList?: Response.IUser[];
  fetchReviewList: () => Promise<void>;
}

export const MatchingHistoryContext = createContext<MatchingHistoryState>({
  fetchReviewList: async () => {},
});
