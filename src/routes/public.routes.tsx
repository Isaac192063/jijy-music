import { RegisterPage } from "../auth/pages/register/register";
import { LoginPage } from "../auth/pages/login/login";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import StartLayout from "@/layout/start";
import { HomePage } from "@/music/pages/home/home";
import { CommunityPage } from "@/comunity/pages/comunity/comunity";
import Page from "@/App";
import HomeStart from "@/auth/pages/home/HomeStart";
import { CreateListReproductionPage } from "@/music/pages/list_reproduction/createListReproduction";
import MainLayout from "@/layout/main";
import { Account } from "@/admin/pages/user/account";

export const publicRoutes: RouteObject[] = [
    {
        path: "",
        element: <StartLayout />,
        children: [
            {
                path: "",
                element: <HomeStart />,
                children: [
                    {
                        path: "",
                        element: <HomePage />,
                    },
                ],
            },
            {
                path: "auth/login",
                element: <LoginPage />,
            },
            {
                path: "auth/register",
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: "home",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <Page />,
                children: [
                    {
                        path: "",
                        element: <HomePage />,
                    },
                    {
                        path: "comunity",
                        element: <CommunityPage />,
                        
                    },
                    {
                        path: "account",
                        element: <Account />,
                        
                    },
                    {
                        path: "create-list-reproduction",
                        element: <CreateListReproductionPage />,
                    },
                ],
            },
        ],
    },
];

export const router = createBrowserRouter(publicRoutes);
