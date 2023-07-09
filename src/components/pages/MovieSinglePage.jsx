import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

//components
import StarRating from "../general/StarRating";
import Skelton from "../general/skelton-loader/Skelton";

import { axiosInstance } from "../../../interceptor";

export const MovieSinglePage = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState({});
    const [isLoading, setloading] = useState(true);

    let controller = new AbortController();
    const fetchMovie = async () => {
        try {
            if (id) {
                const resposne = await axiosInstance.get(`/movies/${id}`, {
                    signal: controller.signal,
                });
                setMovie(resposne.data?.movie);
                setloading(false);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchMovie();

        return () => {
            controller.abort();
        };
    }, []);
    return (
        <div className=" flex gap-[30px] h-[100%] p-[25px] sm3:p-[15px] sm3:h-auto overflow-y-scroll items-start lg2:flex-col-reverse">
            {isLoading ? (
                <Skelton type="movie-singlepage" />
            ) : (
                <>
                    <div className="w-[40%] lg2:hidden">
                        <img
                            className="object-contain"
                            src={movie?.poster.url}
                            alt="poster"
                        />
                    </div>
                    <div className="w-[60%] flex flex-col gap-[10px] lg2:w-full">
                        <h1 className="text-[35px] font-bold sm3:text-[24px] lg2:text-[28px]">
                            {movie?.name}
                        </h1>
                        {movie?.year && <h2>Release year: {movie?.year}</h2>}
                        {movie?.description && <p>{movie?.description}</p>}
                        {movie?.leadactor && <h2>Hero: {movie?.leadactor}</h2>}

                        <div className="flex items-center gap-[10px] flex-wrap">
                            {movie?.genre?.map((item, index) => (
                                <div
                                    key={index}
                                    className="py-[7px] px-[22px] sm3:py-[4px] sm3:px-[18px] sm3:text-[14px] rounded-[25px] overflow-hidden  border-[2px] border-solid border-[#f1f1f1] text-[#f1f1f1]"
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                        <StarRating rating={movie?.rating} />
                        <div className="flex flex-wrap gap-[18px]">
                            {movie?.gallery?.map((item) => (
                                <div
                                    key={item.url}
                                    className="w-[47%] sm3:w-[100%]"
                                >
                                    <img
                                        src={item.url}
                                        alt="gallery-image"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
