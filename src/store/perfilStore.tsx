import { UserService } from "@/shared/services/UserService";
import { User } from "@/shared/types/User";
import { create } from "zustand";

type UserStorage = {
    user: User | null;
    users: User[];
    fetchUser: (id: string) => Promise<void>;
    fetchAllUsers: () => Promise<void>;
    updateUser: (id: string, userData: User) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    logout: () => void;
};

export const useUserStorage = create<UserStorage>()((set) => ({
    user: null,
    users: [],

    // Obtener usuario por ID
    fetchUser: async (id: string) => {
        try {
            const userData = await UserService.getById(id);
            set({ user: userData });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    },

    // Obtener todos los usuarios
    fetchAllUsers: async () => {
        try {
            const usersData = await UserService.getAll();
            set({ users: usersData });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    },

    // Actualizar usuario
    updateUser: async (id: string, userData: User) => {
        try {
            const updatedUser = await UserService.update(id, userData);
            set((state) => ({
                user: state.user?.id === id ? updatedUser : state.user,
                users: state.users.map((user) => (user.id === id ? updatedUser : user)),
            }));
        } catch (error) {
            console.error("Error updating user:", error);
        }
    },

    // Eliminar usuario
    deleteUser: async (id: string) => {
        try {
            await UserService.delete(id);
            set((state) => ({
                users: state.users.filter((user) => user.id !== id),
                user: state.user?.id === id ? null : state.user,
            }));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    },

    // Cerrar sesión
    logout: () => set({ user: null }),
}));
