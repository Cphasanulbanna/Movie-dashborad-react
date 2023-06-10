import React from "react";

//zustand
import { useQueryStore } from "./zustand/store";

//icons
import search from "../assets/icons/search.png";
import notification from "../assets/icons/notification.png";
import profile from "../assets/icons/profile.png";

const Header = () => {
    const { query, updateQuery } = useQueryStore();
    const handleQueryChange = (e) => {
        const value = e.target.value.toLowerCase();
        updateQuery(value);
    };

    return (
        <header className="bg-dark-blue fixed top-0 left-[200px] w-[fill] py-[30px] px-[40px] flex justify-between items-center">
            <div className="relative border border-[#f1f1f1] rounded-[25px] overflow-hidden px-[15px] h-[40px] max-w-[300px] w-[100%]">
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
                    value={query}
                    onChange={handleQueryChange}
                />
            </div>
            <div className="flex items-center gap-[25px]">
                <div className="w-[25px] h-[25px] cursor-pointer hover:opacity-[0.8]">
                    <img
                        src={notification}
                        alt="notification"
                    />
                </div>
                <div className="w-[40px] h-[40px] cursor-pointer hover:opacity-[0.8]">
                    <img
                        src={profile}
                        alt="profile"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
