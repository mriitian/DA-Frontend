import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./pages/home";
import OpenSourcePage from "./pages/data/open_source";
import OrgPage from "./pages/data/organisational";
import WorkspacePage from "./pages/workspace/workspace_page";
import Signup from "./pages/signup";
import Login from "./pages/login";
import EditPage from "./pages/report/edit";

export const AppRoutes = () => {
    const routes = [
        // { 
        //     path: "/", 
        //     element: <Navigate to="/dashboard" replace /> 
        // },
        // { 
        //     path: "/dashboard", 
        //     element: <ProtectedRoute><Dashboard collapsed={collapsed} setCollapsed={setCollapsed} /></ProtectedRoute> 
        // },
        {
            path:"/home",
            element:<HomePage/>
        },
        {
            path:"/browse-data/open-source",
            element:<OpenSourcePage/>
        },
        {
            path:"/browse-data/organizational",
            element:<OrgPage/>
        },
        {
            path:"/workspace",
            element: <WorkspacePage/>
        },
        {
            path:"/signup",
            element: <Signup/>
        },
        {
            path:"/login",
            element: <Login/>
        },
        {
            path:"/report/edit",
            element: <EditPage/>
        },
      
    ];
    
    return useRoutes(routes);
};