import React from "react";

//packages
import { Routes, Route } from "react-router-dom";

//components
import AuthRouter from "./routers/AuthRouter";
import LandingPage from "../LandingPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/*"
                element={<LandingPage />}
            />
            <Route
                path="/auth/*"
                element={<AuthRouter />}
            />
        </Routes>
    );
};

export default AppRouter;
