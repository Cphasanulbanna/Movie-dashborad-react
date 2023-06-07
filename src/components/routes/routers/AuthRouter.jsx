import React from "react";
import Signup from "../../auth/Signup";

const AuthRouter = () => {
    return (
        <section
            className={`flex justify-center items-center h-[100vh] w-[100%] py-[80px] bgc-gradient`}
        >
            <Signup />
        </section>
    );
};

export default AuthRouter;
