import React from "react";

//package
import { useNavigate } from "react-router-dom";

//store
import { useQueryStore, useUserDataStore } from "./zustand/store";

//icons
import search from "../assets/icons/search.png";
import notification from "../assets/icons/notification.png";
import profile from "../assets/icons/profile.png";

const Header = () => {
    const { query, updateQuery } = useQueryStore();
    const { userdata } = useUserDataStore();
    const navigate = useNavigate();

    //setting searchquery
    const handleQueryChange = (e) => {
        const value = e.target.value.toLowerCase();
        updateQuery(value);
    };

    const inputStyle = {
        background: "#082335",
        border: "2px solid #336a8c",
        color: "#418cb3",
    };

    return (
        <header className="bg-dark-blue fixed top-0 left-[200px] lg1:left-[75px] md2:left-[50px] w-[fill] py-[30px] lg1:pt-[15px] px-[40px] flex justify-between items-center md1:px-[20px] sm3:pb-[20px]">
            <div
                style={inputStyle}
                onClick={() => navigate("/")}
                className="relative  rounded-[25px] overflow-hidden px-[15px] h-[40px] max-w-[300px] w-[100%] lg1:h-[40px] sm3:max-w-[250px] sm2:max-w-[200px] sm1:max-w-[170px]"
            >
                <div className="w-[20px] h-[20px] absolute z-[10] top-[50%] translate-y-[-50%] sm3:w-[15px] sm3:h-[15px]">
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
                <div className="w-[25px] h-[25px] cursor-pointer hover:opacity-[0.8] md3:hidden">
                    <img
                        src={notification}
                        alt="notification"
                    />
                </div>
                <div className="w-[50px] h-[50px] overflow-hidden rounded-full cursor-pointer hover:opacity-[0.8] sm3:w-[40px] sm3:h-[40px]">
                    <img
                        src={userdata?.profile_pic.url || profile}
                        alt="profile"
                        className="object-cover object-top"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
