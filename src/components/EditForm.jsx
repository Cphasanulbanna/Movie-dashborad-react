import React, { useState } from "react";
import ModalWrapper from "./general/ModalWrapper";
import { Input } from "./fields/Input";
import StarRating from "./general/StarRating";

export const EditForm = ({ showEditModal, setShowEditModal }) => {
    const [formData, setFormData] = useState({
        moviename: "",
        year: "",
        rating: "",
        leadactor: "",
        description: "",
        poster: "",
    });

    const [errors, setErrors] = useState({});

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleRating = (rate) => {
        setFormData((prev) => ({ ...prev, ["rating"]: rate }));

        // other logic
    };

    console.log(formData);

    const inputStyle = {
        background: "#082335",
        borderRadius: "5px",
        border: "2px solid #336a8c",
        color: "#418cb3",
    };
    return (
        <ModalWrapper
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
        >
            <div className="flex gap-[15px]">
                {/* leftbox  */}
                <div className="flex gap-[15px] flex-col w-[48%]">
                    <div className="flex flex-col gap-[8px] ">
                        <div className="flex flex-col gap-[5px]">
                            <label
                                htmlFor="name"
                                className="text-light-white"
                            >
                                Movie name
                            </label>
                            <Input
                                formData={formData}
                                name="moviename"
                                type="text"
                                handleDataChange={handleDataChange}
                                errors={errors?.moviename}
                                css={inputStyle}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px] ">
                        <div className="flex flex-col gap-[5px]">
                            <label
                                htmlFor="name"
                                className="text-light-white"
                            >
                                Release year
                            </label>
                            <Input
                                formData={formData}
                                name="year"
                                type="text"
                                handleDataChange={handleDataChange}
                                errors={errors?.year}
                                css={inputStyle}
                            />
                        </div>
                    </div>
                    <StarRating
                        dimension={"40px"}
                        handleRating={handleRating}
                        name="rating"
                        rating={formData.rating}
                    />
                </div>
                {/* leftbox edning  */}

                {/* right box  */}
                <div className="flex gap-[15px] flex-col w-[48%]">
                    <div className="flex flex-col gap-[8px] ">
                        <div className="flex flex-col gap-[5px]">
                            <label
                                htmlFor="name"
                                className="text-light-white"
                            >
                                Lead Actor
                            </label>
                            <Input
                                formData={formData}
                                name="leadactor"
                                type="text"
                                handleDataChange={handleDataChange}
                                errors={errors?.leadactor}
                                css={inputStyle}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px] ">
                        <div className="flex flex-col gap-[5px] relative">
                            <label
                                htmlFor="name"
                                className="text-light-white"
                            >
                                Details
                            </label>
                            <textarea
                                name="description"
                                onChange={handleDataChange}
                                style={inputStyle}
                                className="p-[10px] min-h-[150px] max-h-[150px]"
                            />
                            <span className="absolute left-0 bottom-[-20px] text-[12px] text-[red]">
                                {errors?.description}
                            </span>
                        </div>
                    </div>
                </div>
                {/* rightbox ending  */}
            </div>
        </ModalWrapper>
    );
};
