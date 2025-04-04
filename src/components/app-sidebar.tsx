import * as React from "react";
import {
    Bot,
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavComunity } from "@/components/nav-comunity";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { useTheme } from "@/store/ThemeContext";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { theme, toggleTheme } = useTheme();


    const data = {
        teams: [
            {
                name: "Jijy",
                logo: GalleryVerticalEnd,
                plan: "conectado",
            },
        ],
        navMain: [
            {
                title: "Canciones",
                url: "#",
                icon: SquareTerminal,
                isActive: true,
                items: [
                    {
                        title: "Buscar",
                        url: "#",
                    },
                    {
                        title: "Historial",
                        url: "#",
                    },
                ],
            },
            {
                title: "Listas de reproducción",
                url: "#",
                icon: Bot,
                isActive: true,
                items: [
                    {
                        title: "Explorar",
                        url: "#",
                    },
                    {
                        title: "Crear",
                        url: "/home/create-list-reproduction",
                    },
                    {
                        title: "Buscar",
                        url: "#",
                    },
                ],
            },
            {
                title: "Configuración",
                url: "#",
                icon: Settings2,
                isActive: true,
                items: [
                    {
                        title: "General",
                        url: "#",
                    },
                    {
                        title: theme === "light" ? "Tema oscuro" : "Tema claro",
                        action: () => toggleTheme(),
                    },
                    {
                        title: "Reproducción",
                        url: "#",
                    },
                ],
            },
        ],
        
    };

    return (
        <Sidebar collapsible="icon" {...props} className="fixed h-complete top-[64px]">
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <div className="">
                    <NavComunity  />
                </div>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
