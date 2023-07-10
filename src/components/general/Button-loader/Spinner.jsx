import React from "react";

import Lottie from "lottie-react";
import animationData from "../../../assets/json/spinner.json";

const Spinner = () => {
    return (
        <div className="w-[35px]">
            <Lottie animationData={animationData} />
        </div>
    );
};

export default Spinner;
