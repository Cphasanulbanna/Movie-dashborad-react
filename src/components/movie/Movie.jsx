import React from "react";
import StarRating from "../general/StarRating";

export const Movie = ({ movie }) => {
    return (
        <div className="w-[48%] rounded-[10px] overflow-hidden cursor-pointer flex justify-between max-h-[300px] boxshadow hover:opacity-[0.8]">
            <div className="w-[35%] h-[100%]">
                <img
                    src={movie?.poster}
                    alt="poster"
                />
            </div>
            <div className="w-[65%] p-[20px] flex flex-col gap-[15px] one">
                <h1>
                    {movie.name} ({movie.year})
                </h1>

                {movie.genre?.map((item) => (
                    <p className="py-[8px] px-[24px] rounded-[25px] border border-[#fff] w-max">
                        {item.title}
                    </p>
                ))}
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, officiis.
                </p>

                <StarRating />
            </div>
        </div>
    );
};
