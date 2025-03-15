import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Music, X, Save, Play, Edit } from 'lucide-react';

// Definición de tipos
interface Song {
  id: number;
  name: string;
}

interface Playlist {
  id: number;
  name: string;
  songs: Song[];
}

export const CreateListReproductionPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { 
      id: 1, 
      name: "Mi playlist favorita", 
      songs: [
        { id: 1, name: "Canción 1" },
        { id: 2, name: "Canción 2" },
        { id: 3, name: "Canción 3" }
      ] 
    },
    { 
      id: 2, 
      name: "Para estudiar", 
      songs: [
        { id: 4, name: "Canción suave" },
        { id: 5, name: "Melodía tranquila" }
      ] 
    }
  ]);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [newSong, setNewSong] = useState<string>("");
  const [editedPlaylistName, setEditedPlaylistName] = useState<string>("");

  // Generador de IDs únicos
  const generateId = (): number => {
    return Math.floor(Math.random() * 10000);
  };

  const handleCreatePlaylist = (): void => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: generateId(),
        name: newPlaylistName,
        songs: []
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName("");
      setSelectedPlaylist(newPlaylist);
    }
  };

  const handleAddSong = (): void => {
    if (newSong.trim() && selectedPlaylist) {
      const newSongItem: Song = {
        id: generateId(),
        name: newSong
      };
      
      const updatedPlaylists = playlists.map(playlist => {
        if (playlist.id === selectedPlaylist.id) {
          return {
            ...playlist,
            songs: [...playlist.songs, newSongItem]
          };
        }
        return playlist;
      });
      
      setPlaylists(updatedPlaylists);
      setNewSong("");
      setSelectedPlaylist(updatedPlaylists.find(p => p.id === selectedPlaylist.id) || null);
    }
  };

  const handleRemoveSong = (playlistId: number, songId: number): void => {
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: playlist.songs.filter(song => song.id !== songId)
        };
      }
      return playlist;
    });
    
    setPlaylists(updatedPlaylists);
    if (selectedPlaylist && selectedPlaylist.id === playlistId) {
      setSelectedPlaylist(updatedPlaylists.find(p => p.id === playlistId) || null);
    }
  };

  const handleDeletePlaylist = (playlistId: number): void => {
    const updatedPlaylists = playlists.filter(playlist => playlist.id !== playlistId);
    setPlaylists(updatedPlaylists);
    if (selectedPlaylist && selectedPlaylist.id === playlistId) {
      setSelectedPlaylist(null);
    }
  };

  const handleEditPlaylist = (): void => {
    if (selectedPlaylist && editedPlaylistName.trim()) {
      const updatedPlaylists = playlists.map(playlist => {
        if (playlist.id === selectedPlaylist.id) {
          return {
            ...playlist,
            name: editedPlaylistName
          };
        }
        return playlist;
      });
      
      setPlaylists(updatedPlaylists);
      setSelectedPlaylist({ ...selectedPlaylist, name: editedPlaylistName });
      setEditedPlaylistName("");
    }
  };

  const handleSelectPlaylist = (playlist: Playlist): void => {
    setSelectedPlaylist(playlist);
    setEditedPlaylistName(playlist.name);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-orange-800">Listas de reproducción</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sección de listas */}
        <div className="md:col-span-1">
          <Card className="border-orange-200 shadow-md p-0">
            <CardHeader className="bg-orange-100  p-2">
              <CardTitle className="text-orange-800">Mis listas</CardTitle>
              <CardDescription className="text-orange-600">Gestiona tus listas de reproducción</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex mb-4">
                <Input 
                  placeholder="Nombre de nueva lista" 
                  value={newPlaylistName} 
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="mr-2 border-orange-200 focus:border-orange-400"
                />
                <Button 
                  onClick={handleCreatePlaylist} 
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Crear
                </Button>
              </div>
              
              <ScrollArea className="h-64">
                {playlists.map((playlist) => (
                  <div 
                    key={playlist.id} 
                    className={`flex items-center justify-between mb-2 p-2 rounded cursor-pointer ${
                      selectedPlaylist?.id === playlist.id ? 'bg-orange-200' : 'hover:bg-orange-100'
                    }`}
                  >
                    <div 
                      className="flex-1"
                      onClick={() => handleSelectPlaylist(playlist)}
                    >
                      <span className={`${selectedPlaylist?.id === playlist.id ? 'font-bold text-orange-800' : 'text-orange-700'}`}>
                        {playlist.name}
                      </span>
                      <span className="text-sm text-orange-500 ml-2">
                        ({playlist.songs.length})
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeletePlaylist(playlist.id)}
                      className="h-6 w-6 p-0 text-orange-600 hover:text-orange-800 hover:bg-orange-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        {/* Sección de detalles de la lista */}
        <div className="md:col-span-2">
          <Card className="border-orange-200 shadow-md p-0">
            <CardHeader className="bg-orange-100 rounded-t-lg p-2">
              <CardTitle className="text-orange-800">
                {selectedPlaylist ? selectedPlaylist.name : "Selecciona una lista"}
              </CardTitle>
              <CardDescription className="text-orange-600">
                {selectedPlaylist ? `${selectedPlaylist.songs.length} canciones` : "Crea o selecciona una lista para editarla"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {selectedPlaylist ? (
                <>
                  <div className="flex mb-4">
                    <Input 
                      placeholder="Añadir canción" 
                      value={newSong} 
                      onChange={(e) => setNewSong(e.target.value)}
                      className="mr-2 border-orange-200 focus:border-orange-400"
                    />
                    <Button 
                      onClick={handleAddSong}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Añadir
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-64">
                    {selectedPlaylist.songs.length === 0 ? (
                      <div className="text-center p-4 text-orange-500">
                        No hay canciones en esta lista
                      </div>
                    ) : (
                      selectedPlaylist.songs.map((song) => (
                        <div key={song.id} className="flex items-center py-2 hover:bg-orange-50">
                          <div className="flex-none w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                            <Music className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-orange-800">{song.name}</div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveSong(selectedPlaylist.id, song.id)}
                            className="h-6 w-6 p-0 text-orange-600 hover:text-orange-800 hover:bg-orange-200"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </ScrollArea>
                </>
              ) : (
                <div className="text-center p-8 text-orange-500">
                  Selecciona una lista para ver sus canciones
                </div>
              )}
            </CardContent>
            {selectedPlaylist && (
              <CardFooter className="flex justify-end gap-2 bg-orange-50">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Editar detalles
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-orange-50 border-orange-200">
                    <DialogHeader>
                      <DialogTitle className="text-orange-800">Editar lista</DialogTitle>
                      <DialogDescription className="text-orange-600">
                        Modifica los detalles de tu lista de reproducción
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="name" className="text-orange-700">Nombre</Label>
                      
                      <Input 
                        id="name"
                        value={editedPlaylistName}
                        onChange={(e) => setEditedPlaylistName(e.target.value)}
                        className="mt-2 border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="name" className="text-orange-700 mb-4">Visibilidad</Label>

                      <CheckboxDemo/>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleEditPlaylist}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Guardar cambios
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  className="bg-orange-400 hover:bg-orange-500 text-white"
                >
                  <Play className="h-4 w-4 mr-1" /> Reproducir
                </Button>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Save className="h-4 w-4 mr-1" /> Guardar
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

"use client"

import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Hacer visible
      </label>
    </div>
  )
}
