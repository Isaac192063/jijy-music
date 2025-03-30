import { createBrowserRouter, RouteObject } from "react-router-dom";
import StartLayout from "@/features/auth/layout/start";
import { HomeMusic } from "@/features/music/pages/home/home";
import { CommunityPage } from "@/features/comunity/pages/comunity";
import Page from "@/App";
import HomeStart from "@/features/auth/pages/home/HomeStart";
import { CreateListReproductionPage } from "@/features/music/pages/list_reproduction/createListReproduction";
import MainLayout from "@/layout/main";
import { authRoutes } from "@/features/auth/routes";
import { ComunityDetail } from "@/features/comunity/pages/comunityDetail";
import Account from "@/features/admin/pages/account";
import AdminLayout from "@/layout/adminLayout";
import SongList from "@/features/admin/pages/songList";
import AddMusicPage from "@/features/admin/pages/addMusic";
import DashboardPage from "@/features/admin/pages/dashboard";

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
                        element: <HomeMusic />,
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
                        element: <HomeMusic />,
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
    {
        path: 'admin',
        element: <AdminLayout/>,
        children:[
            {
                path: '',
                element: <Page role="admin"/>,
                children: [
                    {
                        path: '',
                        element: <DashboardPage/>
                    },
                    {
                        path: 'add-songs',
                        element: <AddMusicPage/>
                    },
                    {
                        path: "account",
                        element: <Account />,
                    },
                    {
                        path: 'songs',
                        element: <SongList/>
                    }
                ]
            }
        ]
    }
];

export const router = createBrowserRouter(publicRoutes);
