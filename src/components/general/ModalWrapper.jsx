import React from "react";

const ModalWrapper = ({ children, showEditModal, setShowEditModal }) => {
    return (
        <section
            onClick={() => setShowEditModal(false)}
            style={
                showEditModal
                    ? { scale: "1", transition: "all 0.5s ease-in-out" }
                    : { scale: "0", transition: "all 0.5s ease-in-out" }
            }
            className="fixed z-[1000] w-[100vw] h-[100vh] flex justify-center items-center inset-0 bg-[rgba(0, 0, 0, 0.5)]"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[70%] h-[85%] p-[50px] rounded-[12px] bg-light-black"
            >
                {children}
            </div>
        </section>
    );
};

export default ModalWrapper;
