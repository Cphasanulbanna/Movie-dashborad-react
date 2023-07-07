import React, { useState } from "react";

//packages
import { FileUploader } from "react-drag-drop-files";
import { Link, useNavigate } from "react-router-dom";

//components
import { Input } from "../fields/Input";
import { Button } from "../general/Button";

//images
import facebook from "../../assets/icons/facebook.png";
import twitter from "../../assets/icons/twitter.png";
import google from "../../assets/icons/google.png";

import Notification from "../../assets/general/utils/Notification";
import { axiosInstance } from "../../../interceptor";
import { signupSchema } from "../schemas";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        profilePic: "",
    });
    const [imageName, setImageName] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleChange = (file) => {
        setFormData((prev) => ({ ...prev, ["profilePic"]: file }));
        setImageName(file.name);
    };

    const signup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signupSchema.validate(formData, { abortEarly: false });

            const response = await axiosInstance("/auth/signup", {
                method: "POST",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const { StatusCode } = response.data;
            if (StatusCode === 6000) {
                navigate("/auth/login");
            }
        } catch (error) {
            const validationErrors = {};
            error.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            Notification(error?.response?.data?.message, "error");
            setErrors(validationErrors);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            }}
            className="max-w-[400px] w-[100%] rounded-[8px] overflow-hidden bg-text-white p-[35px] flex flex-col h-[100%] relative sm3:max-w-none sm3:rounded-none sm3:w-full sm3:h-[100vh]"
        >
            <h1 className="text-[#111] font-bold text-center mb-[20px] text-[26px]">Signup</h1>
            <form
                onSubmit={signup}
                className="flex flex-col gap-[20px]"
            >
                <Input
                    formData={formData}
                    type={"text"}
                    placeholder="username"
                    name="username"
                    errors={errors.username}
                    handleDataChange={handleDataChange}
                />

                <Input
                    formData={formData}
                    type={"text"}
                    placeholder="email"
                    name="email"
                    errors={errors.email}
                    handleDataChange={handleDataChange}
                />
                <Input
                    formData={formData}
                    errors={errors.password}
                    type={"text"}
                    placeholder="password"
                    name="password"
                    handleDataChange={handleDataChange}
                />
                <FileUploader
                    handleChange={handleChange}
                    name="profile"
                    label={imageName ? imageName : "upload profile pic"}
                    required={false}
                    classes={"dropzone"}
                    hoverTitle={"click to upload picture"}
                >
                    <p className="flex items-center pl-[10px] text-[#111] h-[100%] text-[14px] cursor-pointer">
                        {imageName ? imageName : "Upload Profile picture"}
                    </p>
                </FileUploader>
                <Button
                    isLoading={isLoading}
                    title={"SIGNUP"}
                    css={"rounded-[25px] overflow-hidden"}
                />
            </form>
            <div className="flex justify-center flex-col items-center gap-[15px] mt-[30px]">
                <p className="text-[14px] text-[#8d8b8b]">Or Sign Up Using</p>
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
        </div>
    );
};

export default Signup;
