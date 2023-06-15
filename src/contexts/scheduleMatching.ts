import { createContext } from "react";

interface ScheduleMatchingState {
  matchingList?: Response.IScheduleMatching[];
  fetchMatchingList: (keywor?: string) => Promise<void>;
}

export const ScheduleMatchingContext = createContext<ScheduleMatchingState>({
  fetchMatchingList: async () => {},
});
