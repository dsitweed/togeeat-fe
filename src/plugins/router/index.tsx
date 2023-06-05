import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import SignIn from "@/pages/auth/views/SignIn";
import SignUp from "@/pages/auth/views/SignUp";
import ChatPage from "@/pages/chat/views/ChatPage";
import MatchingHistoryPage from "@/pages/matching-history/views/MatchingHistoryPage";
import QuickMatchingPage from "@/pages/quick-matching/views/QuickMatchingPage";
import ScheduleMatchingPage from "@/pages/schedule-matching/views/ScheduleMatchingPage";
import { createBrowserRouter } from "react-router-dom";

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
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
