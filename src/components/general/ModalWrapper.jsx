import React from "react";

const ModalWrapper = ({ children }) => {
    return (
        <section className="fixed z-[1000] w-[100vh] h-[100vh] flex justify-center items-center inset-0 bg-[rgba(0, 0, 0, 0.5)]">
            <div className="flex justify-center items-center">{children}</div>
        </section>
    );
};

export default ModalWrapper;
