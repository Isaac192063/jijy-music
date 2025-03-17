import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUserProfile {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar: string;
    bio: string;
    location: string;
    phone: string;
    createdAt: string;
}

type UserStorage = {
    user: IUserProfile | null;
    setUser: (user: IUserProfile) => void;
    logout: () => void;
};

export const useUserStorage = create<UserStorage>()(
    persist(
        (set) => ({
            user: {
                id: "user-123",
                name: "Carlos londoño",
                email: "carlos.londoño@ejemplo.com",
                username: "carlosm",
                avatar: "",
                bio: "Desarrollador web y entusiasta de la música",
                location: "Madrid, España",
                phone: "+34 612 345 678",
                createdAt: "12 de Marzo, 2023",
            },
            logout: () => set({ user: null }),
            setUser: (userData) => set({ user: userData }),
        }),

        {
            name: "user_storage",
        }
    )
);
