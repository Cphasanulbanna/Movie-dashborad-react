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
import {
    useGenres,
    useShowDeletemodal,
    useUpdateMovies,
    useUserDataStore,
    // useMovies,
} from "../zustand/store";

export const Movies = ({ genreIds, rating, search, page, setPage }) => {
    //All movies

    // const [data, setData] = useState({});
    // const [page, setPage] = useState(1);

    const [movieIdToDelete, setMovieIdToDelete] = useState("");

    const [isLoading, setLoading] = useState(true);

    //movie delete modal state
    const { setShowDeleteModal, showDeleteModal } = useShowDeletemodal();

    //to update homepage when a movie is edited
    const { updateMoviesList, updatemovies } = useUpdateMovies();
    const { updateGenres } = useGenres();
    // const { setMovies, movies } = useMovies();

    // console.log(movies, "movies");

    const { userdata } = useUserDataStore();
    const access_token = userdata?.access_token;

    const [movies, setMovies] = useState([]);
    const [count, setCount] = useState(null);
    const [limit, setLimit] = useState(6);
    const [deleteBtnLoader, setDeleteBtnLoader] = useState(false);

    const debouncedValue = useDebounce(search);

    console.log("movies re rendered");

    let abortController = new AbortController();
    const getAllMovies = async () => {
        try {
            const newAbortController = new AbortController();
            abortController = newAbortController;

            const URL = `/movies?page=${page}&genre=${genreIds.toString()}&rating=${rating}&search=${search}`;
            const response = await axiosConfig.get(URL, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                signal: newAbortController.signal,
            });

            setMovies(response.data.movies);
            setCount(response.data.count);
            setLimit(response.data.limit);
            updateGenres(response.data.genres);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllMovies();

        return () => {
            abortController.abort();
        };
    }, [debouncedValue, genreIds, rating, page, updatemovies]);

    //close deletemodal function
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    //delete movie function
    const deleteMovie = async () => {
        try {
            setDeleteBtnLoader(true);
            const response = await axiosConfig.delete("/movies", {
                data: {
                    movieId: movieIdToDelete,
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            updateMoviesList();

            console.log(response.data, "res");

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

            <section className="w-[100%] ">
                <div className="flex justify-between items-center flex-wrap gap-[20px] ">
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
                                            page === index + 1
                                                ? `active-page page-btn middle-btns`
                                                : "page-btn middle-btns"
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
