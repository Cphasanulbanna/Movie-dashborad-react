import React from "react";

export const Button = ({ title, css, onClickFunction }) => {
    return (
        <button
            style={{
                boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }}
            onClick={onClickFunction}
            className={`w-[100%] text-[#f1f1f1] text-center cursor-pointer text-[14px] h-[42px] py-[7px] px-[16px] hover:opacity-[0.7] overflow-hidden font-medium  bgc-button ${css} `}
            type="submit"
        >
            {title}
        </button>
    );
};
