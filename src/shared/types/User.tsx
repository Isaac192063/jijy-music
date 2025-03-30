export type User = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: "admin" | "user" | any;
    phone: string;
    username: string;
    createdAt?: string;
    updatedAt?: string;
}

export type AuthResponse = {
    token: string;
    role: Role[];
}

type Role = {
    authority: string;
}

export type LoginUser = {
    email: string;
    password: string;
}