import React from "react";

//icons
import greenCheck from "../../assets/icons/checkmark-green.png";
import greyCheck from "../../assets/icons/checkmark-grey.png";

const CheckBox = ({ genre, handleClick, formData, currentGenres }) => {
    //highlight selected items
    const isSelected =
        formData.genre?.some((item) => item === genre._id) ||
        currentGenres?.some((item) => item._id === genre._id);

    return (
        <div
            className="cursor-pointer flex items-center gap-[5px]"
            onClick={handleClick}
        >
            <span>{genre.title}</span>
            <div className="w-[30px] h-[30px] rounded-[4px] overflow-hidden">
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
