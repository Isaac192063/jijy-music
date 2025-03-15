import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Heart, MoreHorizontal, Music } from "lucide-react";
import CategoryExplorer from "@/music/components/categoryExplorer";

// Datos de ejemplo para los géneros musicales
const musicGenres = [
  {
    id: 1,
    title: "Rock Clásico",
    description: "Los mejores éxitos del rock de todos los tiempos",
    color: "from-red-500 to-orange-500",
    icon: "🎸",
  },
  {
    id: 2,
    title: "Pop Latino",
    description: "Ritmos latinos que están dominando las listas",
    color: "from-yellow-500 to-green-500",
    icon: "🌴",
  },
  {
    id: 3,
    title: "Electrónica",
    description: "Beats y melodías para mantener la energía",
    color: "from-blue-500 to-purple-500",
    icon: "🎧",
  },
];

// Datos de ejemplo para playlists destacadas
const featuredPlaylists = [
  { id: 1, title: "Éxitos del Momento", tracks: 50, image: "https://provider-static.plex.tv/epg/cms/production/ebed9387-534c-4093-8edf-987ac73fecc1/8530_SM_Plex_Music-Channels_2000x3000-Exitos_del_momento.jpg" },
  { id: 2, title: "Para Entrenar", tracks: 42, image: "https://i.ytimg.com/vi/TDfXFlNwUsE/maxresdefault.jpg" },
  { id: 3, title: "Relax y Chill", tracks: 35, image: "https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg" },
  { id: 4, title: "Throwback 90s", tracks: 45, image: "https://s.saregama.tech/image/c/fw_485/a/3c/59/throwback-90s-vol1_1519894238.jpg" },
  { id: 5, title: "Música Indie", tracks: 38, image: "https://media.istockphoto.com/id/1186892993/es/vector/cartel-del-festival-de-m%C3%BAsica-indie-o-plantilla-de-volante-ilustraci%C3%B3n-de-m%C3%BAsicos-e.jpg?s=612x612&w=0&k=20&c=s5k3hc9rqjt0XfNTzQm1kDZ2JWAPKYAGxbMoRd_DY5I=" },
  { id: 6, title: "Novedades de la Semana", tracks: 30, image: "https://i.scdn.co/image/ab67616d00001e02df54506fd365623237335f21" },
];

// Datos de ejemplo para canciones recomendadas
const recommendedSongs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", album: "After Hours" },
  { id: 2, title: "Dance Monkey", artist: "Tones and I", duration: "3:29", album: "The Kids Are Coming" },
  { id: 3, title: "Levitating", artist: "Dua Lipa", duration: "3:23", album: "Future Nostalgia" },
  { id: 4, title: "Save Your Tears", artist: "The Weeknd", duration: "3:35", album: "After Hours" },
  { id: 5, title: "Stay", artist: "The Kid LAROI, Justin Bieber", duration: "2:21", album: "F*CK LOVE 3+" },
];



export const HomePage = () => {
  const [hoveredPlaylist, setHoveredPlaylist] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Hero Section - Géneros Musicales */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Categorías para explorar</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {musicGenres.map((genre, index) => (
                <CategoryExplorer  genre={genre} key={index} />
              ))}
            </div>
          </section>

          {/* Featured Playlists */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Playlists destacadas</h2>
              <Button variant="link" className="text-sm">Ver todo</Button>
            </div>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {featuredPlaylists.map((playlist) => (
                <Card key={playlist.id} className="border-0 bg-muted/30 transition-all overflow-hidden group">
                  <div 
                    className="relative"
                    onMouseEnter={() => setHoveredPlaylist(playlist.id)}
                    onMouseLeave={() => setHoveredPlaylist(null)}
                  >
                    <img 
                      src={playlist.image} 
                      alt={playlist.title} 
                      className="w-full aspect-square object-cover rounded-t-md"
                    />
                    <div className={`absolute right-2 bottom-2 transform ${hoveredPlaylist === playlist.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-200`}>
                      <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
                        <Play className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm truncate">{playlist.title}</h3>
                    <p className="text-xs text-muted-foreground">{playlist.tracks} canciones</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recommended Songs */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Canciones recomendadas</h2>
            <Card className="border-0 bg-muted/20">
              <table className="w-full">
                <thead className="border-b border-muted">
                  <tr className="text-xs text-muted-foreground">
                    <th className="p-4 text-left font-medium w-8">#</th>
                    <th className="p-4 text-left font-medium">Título</th>
                    <th className="p-4 text-left font-medium hidden md:table-cell">Álbum</th>
                    <th className="p-4 text-right font-medium pr-6"><Clock className="h-4 w-4 inline" /></th>
                    <th className="p-4 w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {recommendedSongs.map((song, index) => (
                    <tr key={song.id} className="hover:bg-muted/50 group">
                      <td className="p-4 text-muted-foreground">{index + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted w-10 h-10 flex items-center justify-center rounded">
                            <Music className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{song.title}</p>
                            <p className="text-xs text-muted-foreground">{song.artist}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{song.album}</td>
                      <td className="p-4 text-right text-sm text-muted-foreground">{song.duration}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>
      </div>
    </>
  );
};