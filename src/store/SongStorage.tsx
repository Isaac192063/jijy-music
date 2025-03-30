import { create } from "zustand";
import { Song } from "@/shared/types/Music";
import { SongService } from "@/shared/services/SongService";

interface ComunityStore {
  songs: Song[];
  loading: boolean;
  error: string | null;
  fetchSongs: () => Promise<void>;
  updateSong: (song: Partial<Song>, id: string) => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
}

export const useSongStorage = create<ComunityStore>((set) => ({
  songs: [],
  loading: true,

  // Cargar canciones desde el backend
  fetchSongs: async () => {
    set({ loading: true });
    try {
        const data = await SongService.getAll();
        set({ songs: data });
        
    } catch (error: any) {
        console.log(error);
        set({ error: "Error al cargar las canciones "+error.message });
    }finally{
        set({ loading: false });
    }
  },

  // Actualizar canción en el backend y en el estado global
  updateSong: async (song: Partial<Song>, id: string) => {
    const updatedSong = await SongService.update(id, song);
    console.log("actualizando");
    if (updatedSong) {
      set((state) => ({
        songs: state.songs.map((s) => (s.id === updatedSong.id ? updatedSong : s)),
      }));
    }
  },

  // Eliminar canción en el backend y en el estado global
  deleteSong: async (id: string) => {
    const success = await SongService.delete(id);
    console.log("se esta eliminando");
    if (success) {
        console.log(success);
      set((state) => ({
        songs: state.songs.filter((s) => s.id !== id),
      }));
    }
  },

  error:  null,
}));
