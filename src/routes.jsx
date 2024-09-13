import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./pages/home";
import OpenSourcePage from "./pages/data/open_source";
import OrgPage from "./pages/data/organisational";
import WorkspacePage from "./pages/workspace/workspace_page";
import Signup from "./pages/signup";
import Login from "./pages/login";
import EditPage from "./pages/report/edit";
import ProtectedRoute from "./protected_route";
import ViewPage from "./pages/report/view";
import PrivatePage from "./pages/data/private";
import { Navigate } from "react-router-dom";

export const AppRoutes = () => {
  const routes = [
    {
      path: "/home",
      element: <ProtectedRoute element={<HomePage />} />,
    },
    {
      path: "/browse-data/open-source",
      element: <ProtectedRoute element={<OpenSourcePage />} />,
    },
    {
      path: "/browse-data/organizational",
      element: <ProtectedRoute element={<OrgPage />} />,
    },
    {
      path: "/browse-data/private",
      element: <ProtectedRoute element={<PrivatePage />} />,
    },
    {
      path: "/workspace",
      element: <ProtectedRoute element={<WorkspacePage />} />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/report/edit",
      element: <ProtectedRoute element={<EditPage />} />,
    },
    {
      path: "/report/:report_name/view",
      element: <ProtectedRoute element={<ViewPage />} />,
    },
    { path: "*", element: <Navigate to="/home" replace /> },
  ];

  return useRoutes(routes);
};
