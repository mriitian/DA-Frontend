import React from "react";
import { useRoutes } from "react-router-dom";

export const AppRoutes = () => {
    const routes = [
        { path: "/", element: <Navigate to="/dashboard" replace /> },
        { path: "/dashboard", element: <ProtectedRoute><Dashboard collapsed={collapsed} setCollapsed={setCollapsed} /></ProtectedRoute> },
        // More routes can be added here
    ];
    
    return useRoutes(routes);
};