import React from "react";

export const Input = ({ formData, handleDataChange, type, name, errors, placeholder, css }) => {
    //border style
    // const greyBorder = "border-[1px] border-solid border-light-grey";
    // const greyBorder = "";

    const _name = name.toLowerCase();

    return (
        <div
            style={css}
            className={`p-[7px] relative h-[42px] input`}
        >
            <input
                className={`text-[14px] bg-[inherit] w-[100%] text-[inherit]`}
                id={_name}
                name={_name}
                value={formData[_name]}
                type={type}
                onChange={handleDataChange}
                placeholder={placeholder || _name.split(/(?=[A-Z])/).join(" ")}
            />
            <span className="error">{errors}</span>
        </div>
    );
};
