import React from "react";

export const Input = ({ formData, handleDataChange, type, name, errors }) => {
    const greyBorder = "border-[1px] border-solid border-light-grey";

    const _name = name.toLowerCase();

    return (
        <div className={`${greyBorder} p-[7px] relative h-[42px]`}>
            <input
                className={`text-[14px] text-black`}
                id={_name}
                name={_name}
                value={formData?._name}
                type={type}
                onChange={handleDataChange}
                placeholder={_name.split(/(?=[A-Z])/).join(" ")}
            />
            <span className="absolute left-0 bottom-[-20px] text-[12px] text-[red]">{errors}</span>
        </div>
    );
};
