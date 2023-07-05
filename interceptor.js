import axios from "axios";

//DEMO
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5005/api/",
});

//401 unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            let userdata = JSON.parse(localStorage.getItem("user_data"));

            const response = await axiosInstance.get("/auth/refresh-token");
            if (userdata) {
                userdata.access_token = response.data.access_token;
                localStorage.setItem("user_data", JSON.stringify(userdata));
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);

//attach token
axiosInstance.interceptors.request.use(
    (request) => {
        const userData = JSON.parse(localStorage.getItem("user_data"));

        const accessToken = userData?.access_token;
        const bearerToken = `Bearer ${accessToken}`;

        if (accessToken) {
            request.headers.authorization = bearerToken;
            request.withCredentials = true;
        }
        return request;
    },
    (error) => error
);
