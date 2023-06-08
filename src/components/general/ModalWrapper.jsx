import React from "react";

const ModalWrapper = ({ children, closeModal, state, style }) => {
    return (
        <section
            className={`overlay ${state ? "visible" : "hidden"}`}
            onClick={closeModal}
        >
            <div
                style={style}
                onClick={(e) => e.stopPropagation()}
                className="bg-light-black border-blue modal"
            >
                {children}
            </div>
        </section>
    );
};

export default ModalWrapper;
