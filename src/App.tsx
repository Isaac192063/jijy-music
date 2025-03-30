import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";

import './globals.css';
import { AppSidebarAdmin } from "./features/admin/components/asideAdmin";

import {  useEffect } from "react";
import { useUserStorage } from "./store/perfilStore";
import { UserService } from "./shared/services/UserService";

export default function Page({role = 'user'}) {

    const { fetchUser } = useUserStorage();
    const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEffect = async () => {
      const token = localStorage.getItem('token') || '';
      
      try {
        const id = atob(token.split('.')[1]);
        const id1 = JSON.parse(id);
        console.log(id);
        const userData = await UserService.getByEmail(id1.sub);
        if (userData && userData.id) {
          fetchUser(userData.id);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    
    fetchUserEffect();
  }, [fetchUser, navigate]);

    return (
        <>
        <SidebarProvider>
            {role === 'user'? <AppSidebar className="top-1 relative h-complete" /> : <AppSidebarAdmin/>}
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">Inicio</BreadcrumbLink>
                                </BreadcrumbItem>
                                {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                                {/* <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <Outlet/>
            </SidebarInset>
        </SidebarProvider>
        {/* {role == 'user'? <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-md z-10">
        <div className="max-w-screen-xl mx-auto flex items-center">
          <div className="flex items-center flex-1">
            <img src="/api/placeholder/48/48" alt="Now Playing" className="h-12 w-12 rounded-md" />
            <div className="ml-3">
              <h4 className="text-sm font-medium">Echoes of Tomorrow</h4>
              <p className="text-xs text-gray-500">Luna Rivers</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-orange-500">
              <Shuffle className="h-5 w-5" />
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 rounded-full" size="icon">
              <Play className="h-5 w-5" />
            </Button>
            <div className="hidden md:block w-96">
              <div className="flex items-center">
                <span className="text-xs text-gray-500">1:42</span>
                <div className="mx-2 flex-1">
                  <Progress value={45} className="h-1"  />
                </div>
                <span className="text-xs text-gray-500">3:42</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 ml-4">
            <Button variant="ghost" size="sm">Vista previa</Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Publicar</Button>
          </div>
        </div>
      </div>: ''} */}
        </>
    );
}
