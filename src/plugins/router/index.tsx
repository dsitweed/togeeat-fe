import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import SignIn from "@/pages/auth/views/SignIn";
import SignUp from "@/pages/auth/views/SignUp";
import ChatPage from "@/pages/ChatPage";
import MatchingHistoryPage from "@/pages/MatchingHistoryPage";
import QuickMatchingPage from "@/pages/QuickMatchingPage";
import ScheduleMatchingPage from "@/pages/ScheduleMatchingPage";
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
