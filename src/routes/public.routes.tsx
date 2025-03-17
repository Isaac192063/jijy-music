import { createBrowserRouter, RouteObject } from "react-router-dom";
import StartLayout from "@/features/auth/layout/start";
import { HomePage } from "@/features/music/pages/home/home";
import { CommunityPage } from "@/features/comunity/pages/comunity";
import Page from "@/App";
import HomeStart from "@/features/auth/pages/home/HomeStart";
import { CreateListReproductionPage } from "@/features/music/pages/list_reproduction/createListReproduction";
import MainLayout from "@/layout/main";
import { Account } from "@/features/admin/pages/user/account";
import { authRoutes } from "@/features/auth/routes";
import { ComunityDetail } from "@/features/comunity/pages/comunityDetail";

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
                        index: true,
                        path: "",
                        element: <HomePage />,
                    },
                ],
            },
            ...authRoutes
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
                        path: 'comunity/:id',
                        element: <ComunityDetail/>
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
