import Header from "@/features/auth/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const StartLayout : React.FC = () => {
    return (
        <main>
            <Header/>
            <Outlet/>
        </main>
    );
  };

export default StartLayout;