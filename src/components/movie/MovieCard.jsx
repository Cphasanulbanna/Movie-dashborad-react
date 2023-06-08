import React, { useState } from "react";
import StarRating from "../general/StarRating";
import { Link, useSearchParams } from "react-router-dom";

//icons
import edit from "../../assets/icons/edit-movie.png";
import deleteIcon from "../../assets/icons/delete.png";
import next from "../../assets/icons/next-arrow.png";
import { EditForm } from "../EditForm";

export const MovieCard = ({ movie }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [movieId, setMovieId] = useState("");

    const opneEditForm = (id) => {
        setMovieId(id);
        setShowEditModal(true);
    };

    return (
        <>
            {/* {movieId && ( */}
            {showEditModal && movieId && (
                <EditForm
                    setShowEditModal={setShowEditModal}
                    showEditModal={showEditModal}
                    id={movieId}
                />
            )}
            {/* )} */}

            <div className="w-[31%] rounded-[10px] overflow-hidden flex justify-between max-h-[300px] boxshadow">
                <div className="w-[40%] h-[300px]">
                    <img
                        src={movie?.poster}
                        alt="poster"
                        className="object-cover"
                    />
                </div>
                <div className="w-[60%] p-[20px] flex flex-col gap-[15px] one">
                    <h1>
                        {movie.name} ({movie.year})
                    </h1>

                    <div className="flex gap-[12px] items-center overflow-x-scroll">
                        {movie.genre?.map((item) => (
                            <p className="py-[8px] px-[24px] rounded-[25px] border border-[#fff] w-max">
                                {item.title}
                            </p>
                        ))}
                    </div>

                    <p>{movie?.description}</p>
                    <StarRating rating={movie?.rating} />
                    <div className="flex items-center gap-[12px]">
                        <div
                            onClick={() => opneEditForm(movie._id)}
                            className="cursor-pointer w-[20px] h-[20px] hover:opacity-[0.7]"
                        >
                            <img
                                src={edit}
                                alt="edit"
                            />
                        </div>
                        <div className="cursor-pointer w-[20px] h-[20px] hover:opacity-[0.7]">
                            <img
                                src={deleteIcon}
                                alt="delete"
                            />
                        </div>
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
        </>
    );
};
