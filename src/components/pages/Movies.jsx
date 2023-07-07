import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

//hook
import { useDebounce } from "../hooks/useDebounce";

//components
import { MovieCard } from "../movie/MovieCard";
import ConfirmDelete from "../modals/ConfirmDelete";
import Skelton from "../general/skelton-loader/Skelton";

import Notification from "../../assets/general/utils/Notification";
import { useGenres, useShowDeletemodal, useUpdateMovies, useUserDataStore } from "../zustand/store";
import { axiosInstance } from "../../../interceptor";

export const Movies = ({ genreIds, rating, search, page, setPage }) => {
    const [movieIdToDelete, setMovieIdToDelete] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [count, setCount] = useState(null);
    const [limit, setLimit] = useState(6);
    const [deleteBtnLoader, setDeleteBtnLoader] = useState(false);

    const { setShowDeleteModal, showDeleteModal } = useShowDeletemodal();
    const { updateMoviesList, updatemovies } = useUpdateMovies();
    const { updateGenres } = useGenres();

    const debouncedValue = useDebounce(search);

    let abortController = new AbortController();
    const getAllMovies = async () => {
        try {
            const newAbortController = new AbortController();
            abortController = newAbortController;

            const URL = `/movies?page=${page}&genre=${genreIds.toString()}&rating=${rating}&search=${search}`;
            const response = await axiosInstance(URL, {
                method: "GET",
                signal: newAbortController.signal,
            });

            setMovies(response.data.movies);
            setCount(response.data.count);
            setLimit(response.data.limit);
            updateGenres(response.data.genres);
            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        getAllMovies();

        return () => {
            abortController.abort();
        };
    }, [debouncedValue, genreIds, rating, page, updatemovies]);

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const deleteMovie = async () => {
        try {
            setDeleteBtnLoader(true);
            const response = await axiosInstance("/movies", {
                method: "DELETE",
                data: {
                    movieId: movieIdToDelete,
                },
            });
            updateMoviesList();

            if (response.data.StatusCode === 6000) {
                setShowDeleteModal(false);
                Notification("Movie deleted", "success");
            }
        } catch (error) {
            Notification(error?.response?.data?.message, "error");
        } finally {
            setDeleteBtnLoader(false);
        }
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
                    buttonLoader={deleteBtnLoader}
                />
            )}
            <ToastContainer />

            <section
                id="movies"
                className="w-[100%] h-full overflow-y-scroll"
            >
                <div className="flex justify-between items-center flex-wrap gap-[20px] p-[20px] sm2:p-[10px]">
                    {isLoading ? (
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
                                <>
                                    <button
                                        key={index}
                                        onClick={() => selectPage(index)}
                                        className={
                                            page === index + 1
                                                ? `active-page page-btn middle-btns`
                                                : "page-btn middle-btns"
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                </>
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
