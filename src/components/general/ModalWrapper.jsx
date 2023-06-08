import React from "react";

const ModalWrapper = ({ children, setState, state, style }) => {
    return (
        <section
            className={`overlay ${state ? "visible" : "hidden"}`}
            onClick={() => setState(false)}
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
