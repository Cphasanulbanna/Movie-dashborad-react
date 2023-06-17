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

export const Sidebar = () => {
    const { logout } = useUserDataStore();
    const navLinkActiveClass = ({ isActive }) => {
        return {
            backgroundColor: isActive ? " rgb(31, 121, 131)" : "",
        };
    };

    return (
        <div className="bg-dark-blue h-full fixed w-[200px] overflow-hidden p-[25px] px-[0] flex flex-col gap-[30px]">
            <Link
                to="/"
                className="w-[45px] cursor-pointer ml-[25px]"
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
                        style={navLinkActiveClass}
                        to={"/genres"}
                        className="flex items-center gap-[6px] px-[25px] py-[12px] "
                    >
                        <div className="w-[25px] h-[25px]">
                            <img
                                src={genre}
                                alt="edit"
                            />
                        </div>
                        <span>Genres</span>
                        <div className="w-[15px] h-[15px] ml-auto">
                            <img
                                src={rightArrow}
                                alt="arrow"
                            />
                        </div>
                    </NavLink>
                    <NavLink
                        style={navLinkActiveClass}
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
                    <NavLink
                        style={navLinkActiveClass}
                        to={"/users"}
                        className="flex items-center gap-[6px] px-[25px] py-[12px] "
                    >
                        <div className="w-[25px] h-[25px]">
                            <img
                                src={users}
                                alt="users"
                            />
                        </div>
                        <span>Users</span>
                        <div className="w-[15px] h-[15px] ml-auto">
                            <img
                                src={rightArrow}
                                alt="arrow"
                            />
                        </div>
                    </NavLink>
                </div>

                <Link
                    className="flex items-center gap-[6px]"
                    to="/auth/login"
                    onClick={logout}
                >
                    <div className="w-[25px] h-[25px] ml-[25px]">
                        <img
                            src={logouticon}
                            alt="logout"
                        />
                    </div>
                    <span> Log out</span>
                </Link>
            </div>
        </div>
    );
};
