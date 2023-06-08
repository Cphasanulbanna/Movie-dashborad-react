import React from "react";

const ModalWrapper = ({ children, setState, state }) => {
    return (
        <section
            className={`overlay ${state ? "visible" : "hidden"}`}
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
