import React from "react";

const ModalWrapper = ({ children, closeModal, state, style }) => {
    return (
        <section
            className={`overlay flex justify-center items-center ${state ? "visible" : "hidden"}`}
            onClick={closeModal}
        >
            <div
                style={style}
                onClick={(e) => e.stopPropagation()}
                className="bg-light-black border-blue modal lg2:p-[30px] sm3:w-[90%]"
            >
                {children}
            </div>
        </section>
    );
};

export default ModalWrapper;
