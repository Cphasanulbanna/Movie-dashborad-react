import React from "react";

import remove from "../../assets/icons/confirm-delete.png";
import close from "../../assets/icons/close.png";
import ModalWrapper from "../general/ModalWrapper";
import { useShowDeletemodal } from "../zustand/store";

const ConfirmDelete = ({ deleteItem, closeModal, state }) => {
    // const { showDeleteModal } = useShowDeletemodal();

    // const closeDeleteModal = () => {
    //     setShowDeleteModal(false);
    // };

    return (
        <ModalWrapper
            state={state}
            closeModal={closeModal}
            style={{ width: "30%", background: "#fff" }}
        >
            <div className="flex flex-col justify-center items-center gap-[20px] relative">
                <div className="w-[60px] h-[60px]">
                    <img
                        src={remove}
                        alt="delete-icon"
                    />
                </div>
                <h1 className="text-[22px] font-bold w-[75%] mx-auto text-center text-[#111]">
                    Are you sure you want to delete this?
                </h1>
                <div className="flex gap-[15px] justify-center items-center">
                    <div
                        onClick={closeModal}
                        className="btn bg-[#bbbbbb] text-light-white"
                    >
                        Cancel
                    </div>
                    <div
                        onClick={deleteItem}
                        className="btn bg-[#f7215a] text-light-white"
                    >
                        Delete
                    </div>
                </div>
                <div
                    onClick={closeModal}
                    className="w-[30px] h-[30px] bg-light-grey-2 cursor-pointer rounded-[50%] absolute overflow-hidden p-[7px] right-[-40px] top-[-40px] hover:opacity-[0.8]  border-[2px] border-solid border-light-grey
                    "
                >
                    <img
                        src={close}
                        alt="close"
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ConfirmDelete;
