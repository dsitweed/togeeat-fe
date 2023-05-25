import { createContext } from "react";
import { IUserReview } from "../interfaces";

interface MatchingHistoryState {
  reviewList?: IUserReview[];
  fetchReviewList: () => Promise<void>;
}

export const MatchingHistoryContext = createContext<MatchingHistoryState>({
  fetchReviewList: async () => {},
});
