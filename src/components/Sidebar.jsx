import React from "react";

//packages
import { Link } from "react-router-dom";

//icons
import create from "../assets/icons/create.png";
import film from "../assets/icons/film.png";
import rightArrow from "../assets/icons/right-arrow.png";
import logo from "../assets/icons/logo.png";

export const Sidebar = () => {
    return (
        <div className="bg-dark-blue h-full fixed w-[200px] overflow-hidden p-[25px]  flex flex-col gap-[40px]">
            <Link
                to="/"
                className="cursor-pointe w-[45px] cursor-pointer"
            >
                <img
                    src={logo}
                    alt="logo"
                />
            </Link>
            <div className="flex flex-col gap-[30px] text-light-green">
                <Link
                    to={"/"}
                    className="flex items-center gap-[6px]"
                >
                    <div className="w-[25px] h-[25px]">
                        <img
                            src={film}
                            alt="movie"
                        />
                    </div>
                    <span> Movies</span>
                    <div className="w-[15px] h-[15px] ml-auto">
                        <img
                            src={rightArrow}
                            alt="arrow"
                        />
                    </div>
                </Link>
                <Link
                    to={"/genres"}
                    className="flex items-center gap-[6px]"
                >
                    <div className="w-[25px] h-[25px]">
                        <img
                            src={create}
                            alt="edit"
                        />
                    </div>
                    <span>Add Genres</span>
                    <div className="w-[15px] h-[15px] ml-auto">
                        <img
                            src={rightArrow}
                            alt="arrow"
                        />
                    </div>
                </Link>
                <Link
                    to={"/add-movie"}
                    className="flex items-center gap-[6px]"
                >
                    <div className="w-[25px] h-[25px]">
                        <img
                            src={create}
                            alt="create"
                        />
                    </div>
                    <span>Add Movie</span>
                    <div className="w-[15px] h-[15px] ml-auto">
                        <img
                            src={rightArrow}
                            alt="arrow"
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
};
