import { api, apiPart } from "../configuration/api";
import {  Song, SongRequest } from "../types/Music";

export const SongService = {
    async getAll(): Promise<Song[]> {
      const response = await api.get<Song[]>("/music");
      return response.data;
    },
  
    async getById(id: string): Promise<Song> {
      const response = await api.get<Song>(`/music/${id}`);
      return response.data;
    },
  
    async create(song: SongRequest): Promise<Song> {
      const formData = new FormData();
      formData.append('song', song.song as Blob);
      formData.append('album', song.album);
      formData.append('title', song.title);
      formData.append('artist', song.artist);
      formData.append('genres', song.genres || '');
      
      const response = await apiPart.post<Song>("/music", formData);
      return response.data;
    },
  
    async update(id: string, song: Partial<Song>): Promise<Song> {
      const response = await api.put<Song>(`/music/${id}`, song);
      return response.data;
    },
  
    async delete(id: string): Promise<Song> {
      const response = await api.delete(`/music/${id}`);
      return response.data;
    }
  };