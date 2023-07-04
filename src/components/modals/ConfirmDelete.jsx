import React from "react";

//icons
import remove from "../../assets/icons/confirm-delete.png";
import close from "../../assets/icons/close.png";

//components
import ButtonLoader from "../general/Button-loader/ButtonLoader";

const ConfirmDelete = ({ deleteItem, closeModal, state, buttonLoader }) => {
    return (
        <section
            className={`overlay flex justify-center items-center ${state ? "visible" : "hidden"}`}
            onClick={closeModal}
        >
            <div className="flex flex-col justify-center items-center bg-text-white p-[30px] rounded-[10px] gap-[20px] relative lg2:w-[375px] sm3:w-[300px]">
                <div className="w-[60px] h-[60px] lg2:w-[45px] lg2:h-[45px]">
                    <img
                        src={remove}
                        alt="delete-icon"
                    />
                </div>
                <h1 className="text-[22px] font-bold w-[75%] mx-auto text-center text-[#111] lg2:text-[18px]">
                    Are you sure you want to delete this?
                </h1>
                <div className="flex gap-[15px] justify-center items-center">
                    <div
                        onClick={closeModal}
                        className="btn bg-[#bbbbbb] text-light-white lg2:h-[40px]"
                    >
                        Cancel
                    </div>
                    <div
                        onClick={deleteItem}
                        className="btn bg-[#f7215a] min-w-[100px] w-[100%] text-light-white h-[44px] lg2:h-[40px]"
                    >
                        {buttonLoader ? <ButtonLoader /> : "Delete"}
                    </div>
                </div>
                <div
                    onClick={closeModal}
                    className="w-[30px] h-[30px] bg-light-grey-2 cursor-pointer rounded-[50%] absolute overflow-hidden p-[7px] right-[-10px] top-[-10px]  lg2:w-[22px] lg2:h-[22px] lg2:p-[4px] hover:opacity-[0.8]  border-[2px] border-solid border-light-grey
                    "
                >
                    <img
                        src={close}
                        alt="close"
                    />
                </div>
            </div>
        </section>
    );
};

export default ConfirmDelete;
