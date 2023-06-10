import React from "react";

//packages
import { Link } from "react-router-dom";

//icons
import genre from "../assets/icons/genre.png";
import edit from "../assets/icons/edit.png";
import movie from "../assets/icons/movie.png";
import rightArrow from "../assets/icons/right-arrow.png";

export const Sidebar = () => {
    return (
        <div className="bg-dark-blue h-full fixed w-[200px] overflow-hidden p-[25px]  flex flex-col gap-[40px]">
            <div className="font-bold text-[20px] cursor-pointer text-light-green">logo</div>
            <div className="flex flex-col gap-[30px] text-light-green">
                <Link
                    to={"/"}
                    className="flex items-center gap-[6px]"
                >
                    <div className="w-[25px] h-[25px]">
                        <img
                            src={movie}
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
                            src={edit}
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
                    to={"/"}
                    className="flex items-center gap-[6px]"
                >
                    <div className="w-[25px] h-[25px]">
                        <img
                            src={genre}
                            alt="genre"
                        />
                    </div>
                    <span>Edit genre</span>
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
