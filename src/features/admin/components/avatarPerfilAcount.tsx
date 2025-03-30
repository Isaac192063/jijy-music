import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IUserProfile, useUserStorage } from "@/store/perfilStore";
import { LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { useNavigate } from "react-router-dom";
export function AvatarPerfilAccount({user}: {user: IUserProfile}){

  const {logout} = useUserStorage();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    logout();
  };


    return (
        <div className="md:col-span-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-xl">
                  {user?.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-500">@{user?.username}</p>
              </div>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}