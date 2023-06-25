import React from "react";

//packages
import { Routes, Route } from "react-router-dom";

//components
import Signup from "../../auth/Signup";
import Login from "../../auth/Login";
import EmailPage from "../../auth/EmailPage";
import OtpPage from "../../auth/OtpPage";

const AuthRouter = () => {
    return (
        <section
            className={`flex justify-center items-center h-[100vh] w-[100%] py-[80px] bgc-gradient`}
        >
            <Routes>
                <Route
                    path="/signup"
                    element={<Signup />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/email"
                    element={<EmailPage />}
                />
                <Route
                    path="/verify-otp"
                    element={<OtpPage />}
                />
            </Routes>
        </section>
    );
};

export default AuthRouter;
