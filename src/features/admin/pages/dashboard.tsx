import { 
  BarChart3, 
  PlusCircle, 
  ChevronDown, 
  Play, 
  Shuffle, 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Datos de ejemplo
const recentAlbums = [
  { id: 1, title: "Midnight Serenade", artist: "Luna Rivers", cover: "/api/placeholder/300/300", plays: 28549 },
  { id: 2, title: "Urban Echoes", artist: "Metro Collective", cover: "/api/placeholder/300/300", plays: 19873 },
  { id: 3, title: "Solar Waves", artist: "Cosmic Rhythm", cover: "/api/placeholder/300/300", plays: 15246 },
  { id: 4, title: "Mountain Dreams", artist: "Altitude", cover: "/api/placeholder/300/300", plays: 12385 },
];

const topArtists = [
  { id: 1, name: "Luna Rivers", image: "/api/placeholder/80/80", followers: 1245789, genres: ["Pop", "R&B"] },
  { id: 2, name: "Metro Collective", image: "/api/placeholder/80/80", followers: 982345, genres: ["Hip Hop", "Electronic"] },
  { id: 3, name: "Cosmic Rhythm", image: "/api/placeholder/80/80", followers: 765432, genres: ["Alternative", "Indie"] },
  { id: 4, name: "Altitude", image: "/api/placeholder/80/80", followers: 654321, genres: ["Folk", "Acoustic"] },
];

const recentTracks = [
  { id: 1, title: "Echoes of Tomorrow", artist: "Luna Rivers", duration: "3:42", plays: 5672342 },
  { id: 2, title: "Neon Streets", artist: "Metro Collective", duration: "4:15", plays: 4328967 },
  { id: 3, title: "Stellar Journey", artist: "Cosmic Rhythm", duration: "3:56", plays: 3456783 },
  { id: 4, title: "Summit", artist: "Altitude", duration: "4:28", plays: 2345678 },
  { id: 5, title: "Midnight Dreams", artist: "Luna Rivers", duration: "3:33", plays: 2123456 },
];

const userGrowth = [
  { month: "Ene", users: 25432 },
  { month: "Feb", users: 28546 },
  { month: "Mar", users: 32654 },
  { month: "Abr", users: 36785 },
  { month: "May", users: 42345 },
  { month: "Jun", users: 48976 },
  { month: "Jul", users: 53234 },
  { month: "Ago", users: 58765 },
];

const DashboardPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex">
     
      <div className="flex-1 overflow-auto">
        {/* Dashboard Content */}
        <main className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">Bienvenido de nuevo, Admin!</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Exportar Reportes
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 hidden md:flex">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nueva Canción
              </Button>
            </div>
          </div>
          
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">58,765</div>
                  <div className="p-2 bg-green-100 text-green-800 text-xs font-medium rounded-md">
                    +12.5%
                  </div>
                </div>
                <Separator className="my-2" />
                <p className="text-sm text-gray-500">Comparado con 52,234 el mes pasado</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Reproducciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">145.3M</div>
                  <div className="p-2 bg-green-100 text-green-800 text-xs font-medium rounded-md">
                    +8.3%
                  </div>
                </div>
                <Separator className="my-2" />
                <p className="text-sm text-gray-500">Comparado con 134.1M el mes pasado</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Ingresos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">$32,456</div>
                  <div className="p-2 bg-green-100 text-green-800 text-xs font-medium rounded-md">
                    +15.2%
                  </div>
                </div>
                <Separator className="my-2" />
                <p className="text-sm text-gray-500">Comparado con $28,178 el mes pasado</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Canciones Nuevas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">1,542</div>
                  <div className="p-2 bg-orange-100 text-orange-800 text-xs font-medium rounded-md">
                    +5.3%
                  </div>
                </div>
                <Separator className="my-2" />
                <p className="text-sm text-gray-500">Comparado con 1,465 el mes pasado</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Estadísticas de Crecimiento</CardTitle>
                    <Tabs defaultValue="monthly" className="w-[250px]">
                      <TabsList>
                        <TabsTrigger value="weekly">Semanal</TabsTrigger>
                        <TabsTrigger value="monthly">Mensual</TabsTrigger>
                        <TabsTrigger value="yearly">Anual</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between">
                    {userGrowth.map((data, index) => (
                      <div key={index} className="flex flex-col items-center justify-end h-full">
                        <div 
                          className="w-12 bg-gradient-to-t from-orange-400 to-orange-500 rounded-t-md"
                          style={{ height: `${(data.users / 60000) * 100}%` }}
                        ></div>
                        <div className="mt-2 text-xs text-gray-500">{data.month}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Canciones Recientes</CardTitle>
                    <Button variant="outline" size="sm">Ver Todas</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentTracks.map((track) => (
                      <div key={track.id} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-orange-100 text-orange-500">
                          <Play size={20} />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium">{track.title}</h4>
                          <p className="text-sm text-gray-500">{track.artist}</p>
                        </div>
                        <div className="text-sm text-gray-500">{track.duration}</div>
                        <div className="ml-4 text-sm font-medium text-gray-800">
                          {track.plays.toLocaleString()} reproducciones
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Álbumes Destacados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlbums.map((album) => (
                      <div key={album.id} className="flex items-center space-x-4">
                        <img src={album.cover} alt={album.title} className="h-16 w-16 rounded-md" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{album.title}</h4>
                          <p className="text-sm text-gray-500">{album.artist}</p>
                          <div className="mt-1 flex items-center">
                            <div className="flex-1">
                              <Progress value={(album.plays / 30000) * 100} className="h-1"  />
                            </div>
                            <span className="ml-2 text-xs text-gray-500">{album.plays.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Artistas Principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topArtists.map((artist) => (
                      <div key={artist.id} className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={artist.image} alt={artist.name} />
                          <AvatarFallback>{artist.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium">{artist.name}</h4>
                          <p className="text-xs text-gray-500">{artist.genres.join(", ")}</p>
                          <p className="text-sm font-medium text-orange-500 mt-1">
                            {artist.followers.toLocaleString()} seguidores
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Promoción Premium</h3>
                    <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-full">
                      +25% Rendimiento
                    </span>
                  </div>
                  <p className="text-white/90 mb-6">Aumenta tus reproducciones y atrae nuevos usuarios con nuestro plan de promoción destacado.</p>
                  <div className="flex space-x-2">
                    <Button className="bg-white text-orange-600 hover:bg-white/90">
                      Activar ahora
                    </Button>
                    <Button variant="ghost" className="text-white hover:bg-white/20">
                      Más info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Recently added section */}
          <div className="mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Actividad Reciente</CardTitle>
                  <Button variant="outline" size="sm">Ver Historial Completo</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="mt-1">
                      <AvatarImage src="/api/placeholder/40/40" alt="User 1" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><span className="font-medium">Carlos Méndez</span> subió 3 nuevas canciones al álbum <span className="text-orange-500">Urban Echoes</span></p>
                      <p className="text-xs text-gray-500 mt-1">Hace 35 minutos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Avatar className="mt-1">
                      <AvatarImage src="/api/placeholder/40/40" alt="User 2" />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><span className="font-medium">Laura Campos</span> modificó los detalles del artista <span className="text-orange-500">Cosmic Rhythm</span></p>
                      <p className="text-xs text-gray-500 mt-1">Hace 1 hora</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Avatar className="mt-1">
                      <AvatarImage src="/api/placeholder/40/40" alt="User 3" />
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><span className="font-medium">Admin User</span> aprobó 12 nuevas canciones para la plataforma</p>
                      <p className="text-xs text-gray-500 mt-1">Hace 3 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Avatar className="mt-1">
                      <AvatarImage src="/api/placeholder/40/40" alt="User 4" />
                      <AvatarFallback>U4</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><span className="font-medium">Sistema</span> completó el mantenimiento programado</p>
                      <p className="text-xs text-gray-500 mt-1">Hace 5 horas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      {/* Now Playing Bar (Fixed at bottom) */}
      
    </div>
  );
};

export default DashboardPage;