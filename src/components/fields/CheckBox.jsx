import React from "react";

//icons
import greenCheck from "../../assets/icons/checkmark-green.png";
import greyCheck from "../../assets/icons/checkmark-grey.png";

const CheckBox = ({ genre, handleClick, formData }) => {
    //highlight selected items
    const isSelected = formData.genre?.some((item) => item === genre._id);

    return (
        <div
            className="cursor-pointer flex items-center gap-[5px]"
            onClick={handleClick}
        >
            <span className="sm3:text-[15px]">{genre.title}</span>
            <div className="w-[30px] h-[30px] rounded-[4px] overflow-hidden md4:w-[25px] md4:h-[25px] sm3:h-[22px] sm3:w-[22px]">
                {isSelected ? (
                    <img
                        src={greenCheck}
                        alt="check"
                    />
                ) : (
                    <img
                        src={greyCheck}
                        alt="check"
                    />
                )}
            </div>
        </div>
    );
};

export default CheckBox;
