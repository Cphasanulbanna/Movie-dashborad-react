import { matchPath } from "react-router-dom";
import routeConfig from "../../../route-config.json";

export const isAuth = () => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const accessToken = userData?.access_token;
    return accessToken ? true : false;
};

export const isRouteAccessible = (path) => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const role = userData?.role;

    const route = routeConfig[path];

    if (route && route.role === "Admin") {
        return role === "Admin";
    }
    return true; // Allow access to all other routes
};

export const isAdmin = () => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const role = userData?.role;

    return role === "Admin";
};
