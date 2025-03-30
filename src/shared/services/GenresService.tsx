import { api } from "../configuration/api";
import { Genres } from "../types/Genres";

export const GenresService = {
    async getAll(): Promise<Genres[]>{
        const response = await api.get<Genres[]>("/genres");
        return response.data;
    }
}