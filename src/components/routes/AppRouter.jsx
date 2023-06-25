import React from "react";

//packages
import { Routes, Route } from "react-router-dom";

//components
import AuthRouter from "./routers/AuthRouter";
import LandingPage from "../LandingPage";
import PrivateRoute from "./routes/PrivateRoute";

const AppRouter = () => {
    return (
        <Routes>
            <PrivateRoute>
                <Route
                    path="/*"
                    element={<LandingPage />}
                />
            </PrivateRoute>

            <Route
                path="/auth/*"
                element={<AuthRouter />}
            />
        </Routes>
    );
};

export default AppRouter;
