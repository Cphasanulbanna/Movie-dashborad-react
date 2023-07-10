import React from "react";

//packages
import { Link, NavLink } from "react-router-dom";

//store
import { useUserDataStore } from "./zustand/store";

//icons
import create from "../assets/icons/create.png";
import film from "../assets/icons/film.png";
import rightArrow from "../assets/icons/right-arrow.png";
import logo from "../assets/icons/logo.png";
import logouticon from "../assets/icons/log-out.png";
import users from "../assets/icons/users.png";
import genre from "../assets/icons/genre.png";
import watchlater from "../assets/icons/watchlater.png";

import { isAdmin } from "./general/utils";

export const Sidebar = () => {
    const { logout } = useUserDataStore();
    const navLinkActiveClass = ({ isActive }) => {
        return {
            backgroundColor: isActive ? " rgb(31, 121, 131)" : "",
        };
    };

    const admin = isAdmin();

    return (
        <div className="bg-dark-blue h-full fixed w-[200px] lg1:w-[75px] md2:w-[50px] overflow-hidden p-[25px] px-[0] flex flex-col gap-[30px] sm3:gap-[20px]">
            <Link
                to="/"
                className="w-[45px] cursor-pointer ml-[25px] lg1:w-[30px] md2:ml-[12px]"
            >
                <img
                    src={logo}
                    alt="logo"
                />
            </Link>
            <div className="flex flex-col justify-between h-[100%]">
                <div className="flex flex-col text-light-green">
                    <NavLink
                        style={navLinkActiveClass}
                        to={"/"}
                        className={`flex items-center px-[25px] md2:px-[12px]  py-[12px] gap-[6px] bg-[ #72c5f8]`}
                    >
                        <div className="w-[25px] h-[25px]">
                            <img
                                src={film}
                                alt="movie"
                            />
                        </div>
                        <span className="lg1:hidden"> Movies</span>
                        <div className="w-[15px] h-[15px] ml-auto lg1:hidden">
                            <img
                                src={rightArrow}
                                alt="arrow"
                            />
                        </div>
                    </NavLink>
                    {admin && (
                        <>
                            <NavLink
                                style={navLinkActiveClass}
                                to={"/genres"}
                                className="flex items-center gap-[6px] px-[25px] md2:px-[12px] py-[12px] "
                            >
                                <div className="w-[25px] h-[25px]">
                                    <img
                                        src={genre}
                                        alt="edit"
                                    />
                                </div>
                                <span className="lg1:hidden">Genres</span>
                                <div className="w-[15px] h-[15px] ml-auto lg1:hidden">
                                    <img
                                        src={rightArrow}
                                        alt="arrow"
                                    />
                                </div>
                            </NavLink>
                            <NavLink
                                style={navLinkActiveClass}
                                to={"/add-movie"}
                                className="flex items-center gap-[6px] px-[25px] md2:px-[12px] py-[12px] "
                            >
                                <div className="w-[25px] h-[25px]">
                                    <img
                                        src={create}
                                        alt="create"
                                    />
                                </div>
                                <span className="lg1:hidden">Add Movie</span>
                                <div className="w-[15px] h-[15px] ml-auto lg1:hidden">
                                    <img
                                        src={rightArrow}
                                        alt="arrow"
                                    />
                                </div>
                            </NavLink>
                            <NavLink
                                style={navLinkActiveClass}
                                to={"/users"}
                                className="flex items-center gap-[6px] px-[25px] md2:px-[12px] py-[12px] "
                            >
                                <div className="w-[25px] h-[25px] ">
                                    <img
                                        src={users}
                                        alt="users"
                                    />
                                </div>
                                <span className="lg1:hidden">Users</span>
                                <div className="w-[15px] h-[15px] ml-auto lg1:hidden">
                                    <img
                                        src={rightArrow}
                                        alt="arrow"
                                    />
                                </div>
                            </NavLink>{" "}
                        </>
                    )}
                    {!admin && (
                        <NavLink
                            style={navLinkActiveClass}
                            to={"/watch-later"}
                            className="flex items-center gap-[6px] px-[25px] md2:px-[12px] py-[12px] "
                        >
                            <div className="w-[25px] h-[25px]">
                                <img
                                    src={watchlater}
                                    alt="edit"
                                />
                            </div>
                            <span className="lg1:hidden">Warch Later</span>
                            <div className="w-[15px] h-[15px] ml-auto lg1:hidden">
                                <img
                                    src={rightArrow}
                                    alt="arrow"
                                />
                            </div>
                        </NavLink>
                    )}
                </div>

                <Link
                    className="flex items-center gap-[6px]"
                    to="/auth/login"
                    onClick={logout}
                >
                    <div className="w-[25px] h-[25px] ml-[25px] lg1:hidden">
                        <img
                            src={logouticon}
                            alt="logout"
                        />
                    </div>
                    <span className="lg1:hidden"> Log out</span>
                </Link>
            </div>
        </div>
    );
};
