import React from "react";

//icons
import search from "../assets/icons/search.png";

const Header = () => {
    return (
        <header className="fixed top-0 left-[200px] w-[100%] p-[30px] flex justify-between items-center">
            <div className="relative border-[1px] border-solid border-light-green rounded-[25px] overflow-hidden px-[15px] h-[40px] max-w-[300px] w-[100%]">
                <div className="w-[20px] h-[20px] absolute z-[10] top-[50%] translate-y-[-50%]">
                    <img
                        src={search}
                        alt="search-icon"
                    />
                </div>
                <input
                    className="w-[100%] h-[40px] pl-[30px] pr-[10px] bg-[inherit] text-[14px]"
                    type="text"
                    placeholder="search here"
                />
            </div>
        </header>
    );
};

export default Header;
