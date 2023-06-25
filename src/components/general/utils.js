export const isAuth = () => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const accessToken = userData?.access_token;
    return accessToken ? true : false;
};
