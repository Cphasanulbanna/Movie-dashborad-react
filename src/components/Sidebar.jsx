import React from "react";

//packages
import { Link, NavLink } from "react-router-dom";

//icons
import create from "../assets/icons/create.png";
import film from "../assets/icons/film.png";
import rightArrow from "../assets/icons/right-arrow.png";
import logo from "../assets/icons/logo.png";
import { useState } from "react";

export const Sidebar = () => {
    const [isActive, setIsActive] = useState("HOME");
    return (
        <div className="bg-dark-blue h-full fixed w-[200px] overflow-hidden p-[25px] px-[0] flex flex-col gap-[30px]">
            <Link
                to="/"
                className="cursor-pointe w-[45px] cursor-pointer ml-[25px]"
            >
                <img
                    src={logo}
                    alt="logo"
                />
            </Link>
            <div className="flex flex-col text-light-green">
                <NavLink
                    style={({ isActive, isPending }) => {
                        return {
                            backgroundColor: isActive ? " rgb(31, 121, 131)" : "",
                            color: isPending ? "red" : "black",
                        };
                    }}
                    to={"/"}
                    className={`flex items-center px-[25px] py-[12px] gap-[6px] bg-[ #72c5f8]`}
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
                </NavLink>
                <NavLink
                    style={({ isActive, isPending }) => {
                        return {
                            backgroundColor: isActive ? " rgb(31, 121, 131)" : "",
                            color: isPending ? "red" : "black",
                        };
                    }}
                    to={"/genres"}
                    className="flex items-center gap-[6px] px-[25px] py-[12px] "
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
                </NavLink>
                <NavLink
                    style={({ isActive, isPending }) => {
                        return {
                            backgroundColor: isActive ? " rgb(31, 121, 131)" : "",
                            color: isPending ? "red" : "black",
                        };
                    }}
                    to={"/add-movie"}
                    className="flex items-center gap-[6px] px-[25px] py-[12px] "
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
                </NavLink>
            </div>
        </div>
    );
};
