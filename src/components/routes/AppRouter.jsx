import React from "react";

//packages
import { Routes, Route, Navigate } from "react-router-dom";
import AuthRouter from "./routers/AuthRouter";

const AppRouter = () => {
    const auth = true;
    return (
        <Routes>
            <Route
                path="/auth/*"
                element={<AuthRouter />}
            />
        </Routes>
    );
};

export default AppRouter;
