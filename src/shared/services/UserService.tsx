import { api } from "../configuration/api";
import { User } from "../types/User";

export const UserService = {
    // Obtener todos los usuarios
    async getAll(): Promise<User[]> {
        const response = await api.get<User[]>("/user");
        return response.data;
    },

    async getByEmail(email: string): Promise<User> {
        const response = await api.get<User>("/user/find", {
            params: {
                email: email
            },
        });
        return response.data;
    },

    // Obtener un usuario por ID
    async getById(id: string): Promise<User> {
        const response = await api.get<User>(`/user/${id}`);
        return response.data;
    },

    // Editar un usuario por ID
    async update(id: string, userData: User): Promise<User> {
        console.log(userData);
        const response = await api.put<User>(`/user/${id}`, userData);
        return response.data;
    },

    // Eliminar un usuario por ID
    async delete(id: string): Promise<User> {
        const response = await api.delete<User>(`/user/${id}`);
        return response.data;
    }
};
