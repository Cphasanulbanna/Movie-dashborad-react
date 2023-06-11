import React, { useEffect, useState } from "react";

//packages
import { useParams } from "react-router-dom";

//axios
import axiosConfig from "../../../axiosConfig";

//components
import StarRating from "../general/StarRating";

//store
import { useUserDataStore } from "../zustand/store";

export const MovieSinglePage = () => {
    //id of each movie
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    const { userdata } = useUserDataStore();
    const access_token = userdata?.access_token;

    //fetch single movie details
    const fetchMovie = async () => {
        try {
            const resposne = await axiosConfig.get(`/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setMovie(resposne.data?.movie);
        } catch (error) {}
    };

    useEffect(() => {
        fetchMovie();
    }, []);
    return (
        <div className=" flex gap-[30px] h-[100%] overflow-y-scroll">
            <div className="w-[40%]">
                <img
                    src={movie?.poster}
                    alt="poster"
                />
            </div>
            <div className="w-[60%] flex flex-col gap-[10px]">
                <h1 className="text-[35px] font-bold">{movie?.name}</h1>
                <h2>Release year: {movie?.year}</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, recusandae.
                </p>
                <h2>Hero: Actor {movie?.leadactor}</h2>
                <div className="flex items-center gap-[10px] flex-wrap">
                    {movie?.genre?.map((item) => (
                        <div className="py-[7px] px-[22px] rounded-[25px] overflow-hidden border border-light-white">
                            {item.title}
                        </div>
                    ))}
                </div>
                <StarRating rating={movie?.rating} />
            </div>
        </div>
    );
};
