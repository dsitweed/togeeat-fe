import { createContext } from "react";
import { IMatching } from "../interfaces";

interface ScheduleMatchingState {
  matchingList?: IMatching[];
  fetchMatchingList: () => Promise<void>;
}

export const ScheduleMatchingContext = createContext<ScheduleMatchingState>({
  fetchMatchingList: async () => {},
});
