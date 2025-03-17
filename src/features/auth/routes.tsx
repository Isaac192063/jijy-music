import { RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
    {
        path: "auth/login",
        async lazy() {
            const { LoginPage } = await import("./pages/login/login");
            return {
                element: <LoginPage />,
                pendingElement: <h2>⏳ Cargando Login...</h2>,
            };
        },
    },
    {
        path: "auth/register",
        async lazy() {
            const { RegisterPage } = await import("./pages/register/register");
            return {
                element: <RegisterPage />,
                pendingElement: <h2>⏳ Cargando registro...</h2>,
            };
        },
    },
];
