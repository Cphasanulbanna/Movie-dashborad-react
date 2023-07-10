import React, { useState } from "react";

import { ToastContainer } from "react-toastify";

//hook
import { useDebounce } from "../hooks/useDebounce";

//components
import { MovieCard } from "../MovieCard";
import ConfirmDelete from "../modals/ConfirmDelete";
import Skelton from "../general/skelton-loader/Skelton";

import Notification from "../../assets/general/utils/Notification";
import { useGenres, useShowDeletemodal } from "../zustand/store";
import { axiosInstance } from "../../../interceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../general/Button-loader/Spinner";

export const Movies = ({ genreIds, rating, search, page, setPage }) => {
    const [movieIdToDelete, setMovieIdToDelete] = useState("");
    const [movies, setMovies] = useState([]);
    const [count, setCount] = useState(null);
    const [limit, setLimit] = useState(6);
    const [pageLoading, setPageloading] = useState(true);

    const { setShowDeleteModal, showDeleteModal } = useShowDeletemodal();
    const { updateGenres } = useGenres();
    const queryClient = useQueryClient();

    const debouncedValue = useDebounce(search);

    const getAllMovies = async (signal) => {
        const URL = `/movies?page=${page}&genre=${genreIds.toString()}&rating=${rating}&search=${debouncedValue}`;
        const response = await axiosInstance(URL, {
            method: "GET",
            signal,
        });

        return response.data;
    };

    const { isFetching } = useQuery(
        ["movies", page, genreIds, rating, debouncedValue],
        ({ signal }) => getAllMovies(signal),
        {
            onSuccess: (data) => {
                setPageloading(false);
                setMovies(data.movies);
                setCount(data.count);
                setLimit(data.limit);
                updateGenres(data.genres);
            },
            onSettled: () => {
                setPageloading(false);
            },
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    );
    const deleteMovieMutation = useMutation(
        async () => {
            const response = await axiosInstance.delete("/movies", {
                data: {
                    movieId: movieIdToDelete,
                },
            });
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["movies"] });
                setShowDeleteModal(false);
                Notification("Movie deleted", "success");
            },

            onError: (error) => {
                Notification(error?.response?.data?.message, "error");
            },
        }
    );

    const deleteMovie = () => {
        deleteMovieMutation.mutate(movieIdToDelete);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const totalPages = Math.ceil(count / limit);
    const selectPage = (newPage) => {
        setPage(newPage + 1);
    };

    return (
        <>
            {showDeleteModal && (
                <ConfirmDelete
                    deleteItem={deleteMovie}
                    closeModal={closeDeleteModal}
                    state={showDeleteModal}
                    buttonLoader={deleteMovieMutation.isLoading}
                />
            )}
            <ToastContainer limit={1} />

            <section
                id="movies"
                className="w-[100%] h-full overflow-y-scroll"
            >
                <div className="flex justify-between items-center flex-wrap gap-[20px] p-[20px] sm2:p-[10px]">
                    {pageLoading ? (
                        <Skelton type={"feed"} />
                    ) : (
                        movies?.map((movie) => (
                            <MovieCard
                                key={movie?._id}
                                movie={movie}
                                setMovieIdToDelete={setMovieIdToDelete}
                                setShowDeleteModal={setShowDeleteModal}
                            />
                        ))
                    )}
                </div>

                <div className="flex justify-center gap-5 p-5">
                    {totalPages > 1 && (
                        <button
                            onClick={() => setPage((prev) => (prev - 1 > 0 ? prev - 1 : prev))}
                            className="page-btn"
                        >
                            {"<"}
                        </button>
                    )}
                    {totalPages > 0 &&
                        Array(totalPages)
                            .fill()
                            .map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectPage(index)}
                                    className={
                                        page === index + 1
                                            ? `active-page page-btn middle-btns`
                                            : "page-btn middle-btns"
                                    }
                                >
                                    {isFetching && page === index + 1 ? <Spinner /> : index + 1}
                                </button>
                            ))}
                    {totalPages > 1 && (
                        <button
                            onClick={() =>
                                setPage((prev) => (prev + 1 <= totalPages ? prev + 1 : totalPages))
                            }
                            className="page-btn"
                        >
                            {">"}
                        </button>
                    )}
                </div>
            </section>
        </>
    );
};

export default Movies;
