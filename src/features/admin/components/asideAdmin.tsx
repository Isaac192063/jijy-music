import * as React from "react";
import {
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
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



export function AppSidebarAdmin({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                        title: "Agregar",
                        url: "add-songs",
                    },
                    {
                        title: "listar",
                        url: "songs"
                    }
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
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
