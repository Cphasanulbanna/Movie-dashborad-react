import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { isAuth } from "../../general/utils";

const PrivateRoute = () => {
    const auth = isAuth();
    return auth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
