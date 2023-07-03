import React, { useEffect, useState } from "react";

//package
import { ToastContainer } from "react-toastify";

//axios
import axiosConfig from "../../../axiosConfig";

//hook
import { useDebounce } from "../hooks/useDebounce";

//components
import { MovieCard } from "../movie/MovieCard";
import ConfirmDelete from "../modals/ConfirmDelete";
import Skelton from "../general/skelton-loader/Skelton";

//functions
import Notification from "../../assets/general/utils/Notification";

//store
import { useGenres, useShowDeletemodal, useUpdateMovies, useUserDataStore } from "../zustand/store";

export const Movies = ({ genreIds, rating, search, page, setPage }) => {
    //All movies

    const [data, setData] = useState({});
    // const [page, setPage] = useState(1);

    const [movieIdToDelete, setMovieIdToDelete] = useState("");

    const [isLoading, setLoading] = useState(true);

    //search keyword
    // const { query } = useQueryStore();

    //movie delete modal state
    const { setShowDeleteModal, showDeleteModal } = useShowDeletemodal();

    //to update homepage when a movie is edited
    const { updateMoviesList } = useUpdateMovies();
    const { updateGenres } = useGenres();

    const { userdata } = useUserDataStore();
    const access_token = userdata?.access_token;

    // let abortController;
    // //fetch all movies
    // const fetchAllMovies = async (p) => {
    //     try {
    //         // Cancel any previous requests before making a new one
    //         abortController && abortController.abort();

    //         abortController = new AbortController();
    //         let url = "/movies";
    //         const params = {
    //             p: p,
    //         };
    //         query && (params.q = query);

    //         const response = await axiosConfig.get(url, {
    //             headers: {
    //                 Authorization: `Bearer ${access_token}`,
    //             },
    //             signal: abortController.signal,
    //             params: params,
    //         });

    //         if (!abortController.signal.aborted) {
    //             setMovies(response.data?.moviesList);
    //             setPageCount(response.data?.total_pages);
    //             setLoading(false);
    //         }
    //     } catch (error) {}
    // };

    const debouncedValue = useDebounce(search);

    let abortController;
    const getAllMovies = async () => {
        try {
            // Cancel any previous requests before making a new one
            abortController && abortController.abort();

            abortController = new AbortController();
            const URL = `/movies?page=${page}&genre=${genreIds.toString()}&rating=${rating}&search=${search}`;
            const response = await axiosConfig.get(URL, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                signal: abortController.signal,
            });
            console.log(response.data);
            setData(response.data);
            updateGenres(response.data.genres);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllMovies();
    }, [debouncedValue, genreIds, rating, page]);

    //close deletemodal function
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    //delete movie function
    const deleteMovie = async () => {
        try {
            setShowDeleteModal(false);
            const response = await axiosConfig.delete("/movies", {
                data: {
                    movieId: movieIdToDelete,
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            updateMoviesList();
            Notification("Movie deleted", "success");
        } catch (error) {
            Notification(error?.response?.data?.message, "error");
        }
    };

    const totalPages = Math.ceil(data.count / data.limit);
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
                />
            )}
            <ToastContainer />

            <section className="w-[100%] ">
                <div className="flex justify-between items-center flex-wrap gap-[20px] ">
                    {isLoading ? (
                        <Skelton type={"feed"} />
                    ) : (
                        data.movies?.map((movie) => (
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
                    <button
                        onClick={() => setPage((prev) => (prev - 1 > 0 ? prev - 1 : prev))}
                        className="page-btn"
                    >
                        {"<"}
                    </button>
                    {totalPages > 0 &&
                        Array(totalPages)
                            .fill()
                            .map((_, index) => (
                                <>
                                    <button
                                        key={index}
                                        onClick={() => selectPage(index)}
                                        className={
                                            page === index + 1 ? `active-page page-btn` : "page-btn"
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                </>
                            ))}
                    <button
                        onClick={() =>
                            setPage((prev) => (prev + 1 <= totalPages ? prev + 1 : totalPages))
                        }
                        className="page-btn"
                    >
                        {">"}
                    </button>
                </div>
            </section>
        </>
    );
};

export default Movies;
