import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./store/ThemeContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/public.routes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <Suspense>
                <RouterProvider router={router} />
            </Suspense>
        </ThemeProvider>
    </StrictMode>
);
