import HeaderAuth from "@/shared/components/headerAuth";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <main>
            <HeaderAuth />
            <Outlet />
        </main>
    );
};

export default MainLayout;
