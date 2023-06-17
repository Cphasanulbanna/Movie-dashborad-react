import React from "react";

import "./button-loader.css";

const ButtonLoader = ({ size }) => {
    return (
        <div
            class="lds-roller"
            style={{ transform: `scale(${size || 0.4})` }}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default ButtonLoader;
