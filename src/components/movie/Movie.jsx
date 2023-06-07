import React from "react";

export const Movie = ({ movie }) => {
    return (
        <div className="w-[48%] rounded-[10px] overflow-hidden cursor-pointer flex justify-between max-h-[300px] boxshadow">
            <div className="w-[35%] h-[100%]">
                <img
                    src={movie?.poster}
                    alt="poster"
                />
            </div>
            <div className="w-[65%] p-[20px] flex flex-col gap-[15px] one">
                <h1>{movie.name}</h1>
                <h2>{movie.year}</h2>
            </div>
        </div>
    );
};
