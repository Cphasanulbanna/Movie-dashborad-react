import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../../../axiosConfig";
import { Rating } from "react-simple-star-rating";
import StarRating from "../general/StarRating";

export const MovieSinglePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    console.log(movie);

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmZWIyZDg4NjM2MDdhOWJmYzU0NTciLCJpYXQiOjE2ODYxNDIyNDF9._s-rFH4k8juDUIFFhMFCO8fat3Wx9UbhiGUODd-KdgQ";

    const fetchMovie = async () => {
        try {
            const resposne = await axiosConfig.get(`/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(resposne);
            setMovie(resposne.data?.movie);
        } catch (error) {
            console.log(error);
        }
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
