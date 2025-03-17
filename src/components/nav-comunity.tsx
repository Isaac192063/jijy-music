import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { Link, useNavigate } from "react-router-dom"
import { AlertDialogDelete } from "@/shared/components/alertDialog"
import { useComunityStorage } from "@/store/comunityStorage"
import AvatarPerfil from "@/shared/components/avatar"

export function NavComunity() {
  const { isMobile } = useSidebar()
  const navigator = useNavigate()
  const {comunities = []} = useComunityStorage()

  console.log(comunities);
  
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden ">
      <Link to='/home/comunity'>
        <SidebarGroupLabel className="cursor-pointer">Comunidad</SidebarGroupLabel>
      </Link>
      <SidebarMenu className="overflow-auto h-56">
        {comunities.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild className="py-5" onClick={()=>{navigator(`comunity/${item.id}`)}}>
            <div>
              <AvatarPerfil url={item.image} />
              <span>{item.name}</span>
            </div>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>Agregar miembros</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Compartir</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="text-muted-foreground" />
                  <AlertDialogDelete/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
