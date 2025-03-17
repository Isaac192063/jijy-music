import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Music, 
  LogIn,
  UserPlus 
} from "lucide-react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-16 sticky top-0 bg-gradient-to-r from-orange-500 to-amber-500 z-10 shadow-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <Link to=''>
            <div className="flex items-center space-x-2 cursor-pointer">
            <Music className="h-8 w-8 text-white" />
            <span className="text-white font-bold text-xl hidden sm:inline">Jijy</span>
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
          

          {/* Login Button */}
          <Link to="/auth/login">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hidden md:flex">
                <LogIn className="h-4 w-4 mr-1" /> 
                Iniciar sesión
            </Button>
          </Link>

          {/* Register Button */}
          <Link to='/auth/register'>
            <Button size="sm" className="bg-white text-orange-600 hover:bg-white/90">
                <UserPlus className="h-4 w-4 mr-1 md:mr-2" /> 
                <span className="hidden md:inline">Registrarse</span>
            </Button>
          </Link>
          
         
        </div>
      </div>
    </header>
  );
};

export default Header;