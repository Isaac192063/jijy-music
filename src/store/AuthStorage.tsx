import { create } from "zustand";

type TokenStorage = {
    token: string | null;
    setToken: (token: string) => void;
    removeToken: () => void;
};

// Estado global para manejar el token de autenticación
export const useTokenStorage = create<TokenStorage>((set) => ({
    token: sessionStorage.getItem("authToken") || null,

    setToken: (token: string) => {
        sessionStorage.setItem("authToken", token);
        set({ token });
    },

    removeToken: () => {
        sessionStorage.removeItem("authToken");
        set({ token: null });
    },
}));
