import React from "react";

import { Navigate } from "react-router-dom";

import { isAuth } from "../../general/utils";

const ProtectedRouteAfterLogin = () => {
    const auth = isAuth()
    return auth ? <Navigate to={-1} /> : 
};

export default ProtectedRouteAfterLogin;
