import { createContext } from "react";

interface ScheduleMatchingState {
  matchingList?: Response.IScheduleMatching[];
  fetchMatchingList: () => Promise<void>;
}

export const ScheduleMatchingContext = createContext<ScheduleMatchingState>({
  fetchMatchingList: async () => {},
});
