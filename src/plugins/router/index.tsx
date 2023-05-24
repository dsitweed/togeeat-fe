import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import QuickMatchingPage from "../../pages/quick-matching/views/QuickMatchingPage";
import ScheduleMatchingPage from "../../pages/schedule-matching/views/ScheduleMatchingPage";
import MatchingHistoryPage from "../../pages/matching-history/views/MatchingHistoryPage";
import ChatPage from "../../pages/chat/views/ChatPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <QuickMatchingPage />,
      },
      {
        path: "quick-matching",
        element: <QuickMatchingPage />,
      },
      {
        path: "schedule-matching",
        element: <ScheduleMatchingPage />,
      },
      {
        path: "matching-history",
        element: <MatchingHistoryPage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
]);
