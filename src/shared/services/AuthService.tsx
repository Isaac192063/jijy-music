import { api } from "../configuration/api";
import { AuthResponse, LoginUser, User } from "../types/User";

export const AuthService = {
    async login(loginUser: LoginUser): Promise<AuthResponse>{
        const response = await api.post<AuthResponse>("/auth/login", loginUser)


          console.log(response.data);
          localStorage.setItem("token", response.data.token);


          const role = atob(response.data.token.split(".")[1]);
          const userRole = JSON.parse(role).role;

          response.data.role = userRole;

        return response.data;
    },

    async register(user: User): Promise<AuthResponse>{
        const response = await api.post<AuthResponse>("/auth/register", user);
        localStorage.setItem("token", response.data.token);
        return response.data;
    },
}