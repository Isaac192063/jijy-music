import { HomePage } from "../music/pages/home/home";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { DashboardPage } from "../admin/pages/dashboard/dashboard";

const routes: RouteObject[] = [
    {
        path: "/",
        Component: HomePage,
    },
];

export const router = createBrowserRouter(routes);
