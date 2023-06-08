import React from "react";

const ModalWrapper = ({ children, setState }) => {
    return (
        <section
            className="overlay"
            onClick={() => setState(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-light-black border-blue modal"
            >
                {children}
            </div>
        </section>
    );
};

export default ModalWrapper;
