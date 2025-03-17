import * as React from "react";
import {
    AudioWaveform,
    Bot,
    Command,
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
        user: {
            name: "user01",
            email: "londoño@example.com",
            avatar: "/avatars/shadcn.jpg", //ejemplo
        },
        teams: [
            {
                name: "Jijy",
                logo: GalleryVerticalEnd,
                plan: "conectado",
            },
            {
                name: "Acme Corp.",
                logo: AudioWaveform,
                plan: "Startup",
            },
            {
                name: "Evil Corp.",
                logo: Command,
                plan: "Free",
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
        comunity: [
            {
                name: "Rock español",
                url: "#",
                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCGs5TBA-4lEcXzZIekCDz92CHNaJyu6TrTd8fFcqnT2lgFoXZs0YU-2WVIomOMmtnbVE&usqp=CAU",
            },
            {
                name: "Solo guaracha",
                url: "#",
                icon: "https://i.ytimg.com/vi/9u40F209bDI/maxresdefault.jpg",
            },
            {
                name: "Samba palo 2.0",
                url: "#",
                icon: "https://www.percuforum.com/blog/wp-content/uploads/2021/08/La-situacion-de-la-samba-en-Brasil-2.jpg",
            },
            {
                name: "electronica full",
                url: "#",
                icon: "",
            },
            {
                name: "Solo Pop",
                url: "#",
                icon: "",
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
