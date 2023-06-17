import React, { useState } from "react";

//packages
import StarRating from "../general/StarRating";
import { Link } from "react-router-dom";

//icons
import edit from "../../assets/icons/edit-movie.png";
import deleteIcon from "../../assets/icons/delete.png";
import next from "../../assets/icons/next-arrow.png";

//components
import { EditForm } from "../modals/EditForm";

export const MovieCard = React.memo(({ movie, setMovieIdToDelete, setShowDeleteModal }) => {
    //movie edit modal state
    const [showEditModal, setShowEditModal] = useState(false);

    //open edit form function
    const opneEditForm = () => {
        setShowEditModal(true);
    };

    return (
        <>
            {showEditModal && (
                <EditForm
                    setShowEditModal={setShowEditModal}
                    showEditModal={showEditModal}
                    movie={movie}
                />
            )}

            <div className="w-[31%] rounded-[10px] overflow-hidden flex justify-between max-h-[300px] boxshadow">
                <div className="w-[40%] h-[300px]">
                    <img
                        src={movie?.poster.url}
                        alt="poster"
                        className="object-cover"
                    />
                </div>
                <div className="w-[60%] p-[20px] flex flex-col gap-[15px] one">
                    <div className="flex  flex-col gap-[10px]">
                        <h1 className="font-bold capitalize">
                            {movie.name} {movie.year && `(${movie.year})`}
                        </h1>

                        <div className="flex gap-[12px] items-center flex-wrap">
                            {movie.genre?.slice(0, 4).map((item) => (
                                <p
                                    key={item?._id}
                                    className=" py-[6px] px-[15px] rounded-[25px] border border-[#fff] w-max"
                                >
                                    {item.title}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        <p>{movie?.description}</p>
                        <StarRating rating={movie?.rating} />
                        <div className="flex items-center gap-[12px]">
                            <div
                                onClick={opneEditForm}
                                className="cursor-pointer w-[20px] h-[20px] hover:opacity-[0.7]"
                            >
                                <img
                                    src={edit}
                                    alt="edit"
                                />
                            </div>
                            <div
                                onClick={() => {
                                    setMovieIdToDelete(movie?._id);
                                    setShowDeleteModal(true);
                                }}
                                className="cursor-pointer w-[20px] h-[20px] hover:opacity-[0.7]"
                            >
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
            </div>
        </>
    );
});
