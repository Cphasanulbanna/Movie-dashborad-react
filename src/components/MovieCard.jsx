import React, { useState } from "react";

//packages
import StarRating from "./general/StarRating";
import { Link } from "react-router-dom";

//icons
import edit from "../assets/icons/edit-movie.png";
import deleteIcon from "../assets/icons/delete.png";
import next from "../assets/icons/next-arrow.png";
import watchlater from "../assets/icons/watchlater.png";

//components
import { EditForm } from "./modals/EditForm";
import { isAdmin } from "./general/utils";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../interceptor";
import { useUserDataStore } from "./zustand/store";
import Notification from "../assets/general/utils/Notification";

export const MovieCard = ({ movie, setMovieIdToDelete, setShowDeleteModal }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const opneEditForm = () => {
        setShowEditModal(true);
    };

    const admin = isAdmin();
    const { userdata } = useUserDataStore();

    const watchLaterMutation = useMutation(
        async (id) => {
            const response = await axiosInstance("/auth/watchlater", {
                method: "POST",
                data: {
                    id: id,
                    email: userdata?.email,
                },
            });
            return response.data;
        },
        {
            onSuccess: () => {
                Notification("Added to watchlater", "success");
            },
            onError: (error) => {
                Notification(error?.response?.data?.message, "error");
            },
        }
    );

    const watchLater = (id) => {
        watchLaterMutation.mutate(id);
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

            <div className="w-[31%] lg4:w-[48%] md4:w-[100%] rounded-[10px] overflow-hidden flex justify-between max-h-[300px] boxshadow">
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
                            {admin && (
                                <>
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
                                </>
                            )}
                            {!admin && (
                                <div
                                    onClick={() => watchLater(movie?._id)}
                                    className=" cursor-pointer flex items-center gap-[10px] hover:opacity-[0.7]"
                                >
                                    <span className="text-[14px]">Watch later</span>
                                    <div className=" w-[20px] h-[20px] ">
                                        <img
                                            src={watchlater}
                                            alt="watchlater"
                                        />
                                    </div>
                                </div>
                            )}
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
};
