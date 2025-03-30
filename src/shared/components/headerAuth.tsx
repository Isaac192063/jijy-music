import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Search, 
  Music, 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const HeaderAuth = ({role = 'user'}: {role?: string}) => {
  return (
    <header className="w-full h-16 sticky top-0 bg-gradient-to-r from-orange-500 to-amber-500 z-10 shadow-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <Link to=''>
            <div className="flex items-center space-x-2 cursor-pointer">
            <Music className="h-8 w-8 text-white" />
            <span className="text-white font-bold text-xl hidden sm:inline">{role === 'user'? 'Jijy': 'Jijy Admin'}</span>
            </div>
        </Link>

        {/* Search Bar - Hide on smallest screens */}
        <div className="hidden sm:flex relative max-w-md w-full mx-4">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="pl-9 bg-white/20 border-none rounded-full text-white placeholder-white/70 focus:bg-white/30 transition-colors"
            placeholder="Buscar canciones, artistas o playlists..."
          />
        </div>

        {/* Mobile Search Icon - Show on smallest screens */}
        <Button variant="ghost" size="icon" className="sm:hidden text-white">
          <Search className="h-5 w-5" />
        </Button>

        {/* Right side icons */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-white rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuItem className="p-4 text-center">
                No tienes notificaciones nuevas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Login Button */}
          
         
        </div>
      </div>
    </header>
  );
};

export default HeaderAuth;