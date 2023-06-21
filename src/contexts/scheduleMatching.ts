import { createContext } from "react";

interface ScheduleMatchingState {
  loading?: boolean;
  matchingList?: Response.IScheduleMatching[];
  fetchMatchingList: (keyword?: string) => Promise<void>;
}

export const ScheduleMatchingContext = createContext<ScheduleMatchingState>({
  fetchMatchingList: async () => {},
});
