import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isAuth, isRouteAccessible } from "../../general/utils";

const PrivateRoute = () => {
    const { pathname } = useLocation();
    const auth = isAuth();
    const isAuthorized = isRouteAccessible(pathname);

    return auth && isAuthorized ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
