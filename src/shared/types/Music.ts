import { Genres } from "./Genres";

export type Song = {
    id?: string;
    title: string;
    url: string;
    artist: string;
    album: string;
    genres: Genres[];
  };

  export type SongRequest = {
    title: string;
    song?: File;
    artist: string;
    album: string;
    genres?: string;
  };
