import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { isAuth } from "../../general/utils";

const ProtectedRouteAfterLogin = () => {
    const auth = isAuth();
    return auth ? <Navigate to={"/"} /> : <Outlet />;
};

export default ProtectedRouteAfterLogin;
