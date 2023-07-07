import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

//store
import { useGenres, useUserDataStore } from "./zustand/store";

//icons
import searchIcon from "../assets/icons/search.png";
import notification from "../assets/icons/notification.png";
import profile from "../assets/icons/profile.png";
import filter from "../assets/icons/filter.png";
import ratingIcon from "../assets/icons/rating.png";
import whiteTick from "../assets/icons/white-tick.png";
import useOutsideClick from "./hooks/useOutsideclick";

const Header = ({ setGenreIds, genreIds, setRatings, rating, setSearch, search, setPage }) => {
    // const { query, updateQuery } = useQueryStore();
    const { userdata } = useUserDataStore();
    const { genres } = useGenres();
    const [viewgenres, setViewgenres] = useState(false);
    const [viewratings, setViewratings] = useState(false);

    const navigate = useNavigate();

    //setting searchquery
    const handleQueryChange = (e) => {
        const value = e.target.value.toLowerCase();
        // updateQuery(value);
        setSearch(value);
    };

    const allRatings = [1, 2, 3, 4, 5];

    const handleRatingChange = (e) => {
        const selectedRating = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            const state = [...rating, selectedRating];
            setRatings(state);
        } else {
            const state = rating.filter((item) => item !== selectedRating);
            setRatings(state);
        }
    };

    const selectGenre = (genreId) => {
        if (!genreIds?.find((item) => item === genreId)) {
            const state = [...genreIds, genreId];
            setGenreIds(state);
        } else {
            const state = genreIds.filter((id) => id !== genreId);
            setGenreIds(state);
        }
    };

    const inputStyle = {
        background: "#082335",
        border: "2px solid #336a8c",
        color: "#418cb3",
    };

    const ratingModalRef = useRef(null);
    const ratingiconRef = useRef(null);
    const genreModalRef = useRef(null);
    const genreiconRef = useRef(null);

    useOutsideClick(ratingModalRef, ratingiconRef, () => setViewratings(false));
    useOutsideClick(genreModalRef, genreiconRef, () => setViewgenres(false));

    return (
        <header
            className={`bg-dark-blue fixed top-0 left-[200px] h-[100px] lg1:left-[75px] md2:left-[50px] w-[fill] py-[30px] lg1:pt-[15px] px-[40px] flex justify-between items-center md1:px-[20px] sm3:pb-[20px] sm2:pl-[10px] ${
                (viewgenres || viewratings) && "z-50"
            }`}
        >
            <div
                style={inputStyle}
                onClick={() => {
                    navigate("/");
                    setPage(1);
                }}
                className="relative  rounded-[4px]  px-[15px] h-[45px] max-w-[300px] w-[100%] lg1:h-[40px] md1:max-w-[250px] sm3:max-w-[200px] sm2:max-w-[150px] sm1:max-w-[130px]"
            >
                <div className="w-[20px] h-[20px] absolute z-[10] top-[50%] translate-y-[-50%] sm3:w-[15px] sm3:h-[15px]">
                    <img
                        src={searchIcon}
                        alt="search-icon"
                    />
                </div>
                <input
                    className="w-[100%] h-full pl-[30px] pr-[10px] bg-[inherit] text-[14px]"
                    type="text"
                    placeholder="search here"
                    value={search}
                    onChange={handleQueryChange}
                />

                {viewgenres && (
                    <div
                        ref={genreModalRef}
                        className="dropdown flex flex-col bg-dark-blue absolute top-[50px] w-full right-0 z-50 max-h-[150px] border-blue-border border-[2px] border-solid overflow-y-scroll rounded-sm"
                    >
                        {genres?.map((genre) => (
                            <button
                                onClick={() => selectGenre(genre._id)}
                                className={`flex justify-between items-center text-[14px] text-left bg-[rgb(31, 121, 131)] cursor-pointer p-2 w-full border-blue-border border-b-[1px] border-solid hover:bg-light-green-2 `}
                                key={genre._id}
                            >
                                {genre.title}
                                {genreIds?.find((id) => id === genre?._id) && (
                                    <span className="block w-[15px] h-[15px]">
                                        <img
                                            src={whiteTick}
                                            alt="tick"
                                        />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {viewratings && (
                    <div
                        ref={ratingModalRef}
                        className="flex flex-wrap w-full justify-between items-center gap-4 p-2 bg-dark-blue absolute top-[50px] right-0 z-50 border-blue-border border-[2px] border-solid rounded-sm"
                    >
                        {allRatings?.map((item) => (
                            <div className="flex items-center gap-1 cursor-pointer">
                                <p className="text-[15px] text-[#dcdcdc]">{item}</p>
                                <input
                                    className="w-[20px] h-[20px] cursor-pointer bg-[#dcdcdc] "
                                    type="checkbox"
                                    value={item}
                                    onChange={handleRatingChange}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div
                    ref={ratingiconRef}
                    onClick={() => setViewratings((prev) => !prev)}
                    className="w-[20px] cursor-pointer h-[20px] absolute z-[10] -right-8 top-[50%] translate-y-[-50%] sm2:w-[18px]  hover:opacity-[0.8]"
                >
                    <img
                        src={ratingIcon}
                        alt="rating"
                    />
                </div>

                <div
                    ref={genreiconRef}
                    onClick={() => setViewgenres((prev) => !prev)}
                    className="absolute cursor-pointer z-[10] w-[20px] h-[20px] -right-16 top-[50%] translate-y-[-50%] sm2:w-[18px]   hover:opacity-[0.8]"
                >
                    <img
                        src={filter}
                        alt={filter}
                    />
                </div>
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
