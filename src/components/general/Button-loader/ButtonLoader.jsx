import React from "react";

import Lottie from "lottie-react";
import animationData from "../../../assets/json/button-loader.json";

const ButtonLoader = () => {
    return (
        <div className="w-[70px]">
            <Lottie animationData={animationData} />
        </div>
    );
};

export default ButtonLoader;
