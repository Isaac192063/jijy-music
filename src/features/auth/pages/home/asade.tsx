import * as React from "react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/shared/components/footer";
import { CarDetail } from "@/features/auth/components/carDetail";

export function ButtonWithIcon() {
    return (
        <Button className="w-full h-10 cursor-pointer">
            <Languages /> Español de Colombia
        </Button>
    );
}


const footerOption = [
    "legal",
    "derechos de autor",
    "politicas de privacidad",
    "Información sobre anuncios",
    "accesibilidad",
];

export function Asade({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} className="fixed h-complete top-[64px]">
            <SidebarContent>
                <SidebarHeader className="text-center">
                    <div className="flex flex-col ">
                        <h1 className="relative font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight py-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600">
                            JIJY
                            <div className="absolute bottom-2 left-1 w-full h-1 bg-gradient-to-r from-orange-600 to-amber-400 rounded-full"></div>
                            <div className="absolute -bottom-1 left-0 w-3/4 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
                        </h1>
                        <span className="text-sm md:text-base lg:text-lg font-medium text-orange-600 -mt-1 ml-1 italic">
                            Music
                        </span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <CarDetail
                        description=" Descubre música según tu estado de ánimo."
                        nameBoton="Explorar"
                        title="Explora temas musicales"
                    />
                    <CarDetail
                        description="Conecta con personas que comparten tus gustos musicales."
                        nameBoton="Ver comunidades"
                        title="Interactúa con comunidades"
                    />
                    <section className="flex flex-wrap">
                        {footerOption.map((option, index) => (
                            <Footer value={option} key={index} />
                        ))}
                    </section>
                </SidebarContent>
                <SidebarFooter>
                    <div className="w-full">
                        <ButtonWithIcon />
                    </div>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
