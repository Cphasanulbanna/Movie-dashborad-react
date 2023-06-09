import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { axiosInstance } from "../../../interceptor";

//components
import Skelton from "../general/skelton-loader/Skelton";
import StarRating from "../general/StarRating";

//icon
import next from "../../assets/icons/next-arrow.png";

const WatchLater = () => {
    const [movies, setMovies] = useState([]);
    const [pageLoading, setPageloading] = useState(true);

    const getWatchlaterMovies = async (signal) => {
        try {
            const response = await axiosInstance("/auth/watchlater", {
                method: "GET",
                signal,
            });

            return response.data;
        } catch (error) {}
    };

    useQuery(["watchlater"], ({ signal }) => getWatchlaterMovies(signal), {
        onSuccess: (data) => {
            setMovies(data.movies);
        },
        onSettled: () => {
            setPageloading(false);
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
    return (
        <div className="flex justify-between items-center flex-wrap gap-[20px] p-[20px] sm2:p-[10px]">
            {pageLoading ? (
                <Skelton type={"feed"} />
            ) : (
                movies?.map((movie) => (
                    <div
                        key={movie?._id}
                        className="w-[31%] lg4:w-[48%] md4:w-[100%] rounded-[10px] overflow-hidden flex justify-between max-h-[300px] boxshadow"
                    >
                        <div className="w-[40%] h-[300px]">
                            <img
                                fetchpriority="high"
                                src={movie?.poster?.url}
                                alt="poster"
                                className="object-cover"
                            />
                        </div>
                        <div className="w-[60%] p-[20px] flex-colum gap-[15px] one sm2:pr-[2px] sm2:pl-[10px]">
                            <div className="flex  flex-col gap-[10px]">
                                <h1 className="font-bold capitalize">
                                    {movie.name} {movie.year && `(${movie.year})`}
                                </h1>

                                <div className="flex gap-[8px] items-center flex-wrap lg1:flex-nowrap lg1:overflow-hidden lg1:[&>*:nth-child(n+3)]:hidden md4:[&>*:nth-child(n+3)]:block md2:flex-wrap">
                                    {movie.genre?.slice(0, 3).map((item) => (
                                        <p
                                            key={item?._id}
                                            className=" py-[4px] px-[10px]  lg1:py-[2px] lg1:px-[12px] lg1:text-[14px] sm3:px-[8px] text-[14px]  rounded-[25px] border border-[#fff] w-max"
                                        >
                                            {item.title}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-colum gap-[10px]">
                                <p className="line-clamp-2 text-[14px]">{movie?.description}</p>
                                <StarRating rating={movie?.rating} />
                                <div className="flex items-center flex-wrap gap-[12px] lg2:flex-wrap-reverse lg2:gap-[16px]">
                                    <Link
                                        to={`/${movie._id}`}
                                        className="flex items-center gap-[8px] cursor-pointer hover:opacity-[0.7]"
                                    >
                                        <span className="text-light-white">view more</span>
                                        <div className=" w-[20px] h-[20px]">
                                            <img
                                                src={next}
                                                alt="next"
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default WatchLater;
