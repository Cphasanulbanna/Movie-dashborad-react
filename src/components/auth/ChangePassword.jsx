import React, { useState } from "react";

//packages
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//components
import { Input } from "../fields/Input";
import { Button } from "../general/Button";

//images
import facebook from "../../assets/icons/facebook.png";
import twitter from "../../assets/icons/twitter.png";
import google from "../../assets/icons/google.png";

//store
import { useUserDataStore } from "../zustand/store";

//axios
import axiosConfig from "../../../axiosConfig";

//functions
import Notification from "../../assets/general/utils/Notification";

const ChangePassword = () => {
    const { userdata } = useUserDataStore();

    //form state
    const [formData, setFormData] = useState({
        password: "",
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    //storing data
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    //form  fields validation
    const formSchema = yup.object().shape({
        password: yup
            .string()
            .test(
                "has-capital-letter",
                "Password must contain at least one capital letter",
                (value) => /[A-Z]/.test(value)
            )
            .min(6, "Password must be at least 6 characters")
            .required("This field is required"),
    });

    //signup api connection
    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            await formSchema.validate(formData, { abortEarly: false });

            const newFormData = new FormData();
            newFormData.append("email", userdata.email);
            newFormData.append("password", formData.password);

            const response = await axiosConfig.post("/auth/reset-password", newFormData);
            const { StatusCode } = response.data;

            if (StatusCode === 6000) {
                Notification("password changed", "success");
                navigate("/auth/login");
            }
        } catch (error) {
            const validationErrors = {};
            error?.inner?.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            Notification(error?.response?.data?.message, "error");
            setErrors(validationErrors);
        }
    };

    return (
        <div
            style={{
                boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            }}
            className="max-w-[400px] w-[100%] rounded-[8px] overflow-hidden bg-text-white p-[35px] flex flex-col h-[100%] relative"
        >
            <h1 className="text-[#111] font-bold text-center mb-[20px] text-[26px]">
                Reset password
            </h1>
            <form
                onSubmit={resetPassword}
                className="flex flex-col gap-[20px]"
            >
                <Input
                    formData={formData}
                    type={"text"}
                    placeholder="Enter new password"
                    name="password"
                    errors={errors.password}
                    handleDataChange={handleDataChange}
                />
                <Button
                    title={"Reset Password"}
                    css={"rounded-[25px] overflow-hidden"}
                />
            </form>
            <div className="flex justify-center flex-col items-center gap-[15px] mt-[30px]">
                <p className="text-[14px] text-[#8d8b8b]">Or Log In Using</p>
                <div className="flex justify-center items-center gap-[10px]">
                    <div className="w-[35px] h-[35px] cursor-pointer overflow-hidden hover:opacity-[0.8]">
                        <img
                            src={facebook}
                            alt="facebook"
                        />
                    </div>
                    <div className="w-[35px] h-[35px] cursor-pointer overflow-hidden hover:opacity-[0.8]">
                        <img
                            src={twitter}
                            alt="twitter"
                        />
                    </div>
                    <div className="w-[35px] h-[35px] cursor-pointer overflow-hidden hover:opacity-[0.8]">
                        <img
                            src={google}
                            alt="google"
                        />
                    </div>
                </div>
            </div>
            <Link
                to={"/auth/login"}
                className="text-[16px] text-center text-[#8d8b8b] cursor-pointer absolute z-20 bottom-[20px] left-[50%] translate-x-[-50%] hover:opacity-[0.7]"
            >
                LOGIN
            </Link>
            <ToastContainer />
        </div>
    );
};

export default ChangePassword;