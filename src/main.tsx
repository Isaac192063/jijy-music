import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./store/ThemeContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/public.routes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <RouterProvider router={router} />
            </Suspense>
        </ThemeProvider>
    </StrictMode>
);
