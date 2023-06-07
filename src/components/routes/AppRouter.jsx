import React from "react";

//packages
import { Routes, Route, Navigate } from "react-router-dom";
import AuthRouter from "./routers/AuthRouter";
import LandingPage from "../LandingPage";

const AppRouter = () => {
    const auth = true;
    return (
        <Routes>
            <Route
                path="/"
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
