import React, { useEffect, useState } from "react";

//package
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";

//axios
import axiosConfig from "../../../axiosConfig";

//hook
import useDebounce from "../hooks/useDebounce";

//components
import { MovieCard } from "../movie/MovieCard";
import ConfirmDelete from "../modals/ConfirmDelete";
import Skelton from "../general/skelton-loader/Skelton";

//functions
import Notification from "../../assets/general/utils/Notification";

//store
import {
    useQueryStore,
    useShowDeletemodal,
    useUpdateMovies,
    useUserDataStore,
} from "../zustand/store";

export const Movies = () => {
    //All movies
    const [movies, setMovies] = useState([]);
    const [pageCount, setPageCount] = useState(null);

    const [movieIdToDelete, setMovieIdToDelete] = useState("");
    const [activePage, setActivePage] = useState(0);
    const [isSearchCleared, setIsSearchCleared] = useState(false);
    const [isLoading, setLoading] = useState(true);

    //search keyword
    const { query } = useQueryStore();

    //movie delete modal state
    const { setShowDeleteModal, showDeleteModal } = useShowDeletemodal();

    //to update homepage when a movie is edited
    const { updateMoviesList, updatemovies } = useUpdateMovies();

    const { userdata } = useUserDataStore();
    const access_token = userdata?.access_token;

    let abortController;
    //fetch all movies
    const fetchAllMovies = async (p) => {
        try {
            // Cancel any previous requests before making a new one
            abortController && abortController.abort();

            abortController = new AbortController();
            let url = "/movies";
            const params = {
                p: p,
            };
            query && (params.q = query);

            const response = await axiosConfig.get(url, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                signal: abortController.signal,
                params: params,
            });

            if (!abortController.signal.aborted) {
                setMovies(response.data?.moviesList);
                setPageCount(response.data?.total_pages);
                setLoading(false);
            }
        } catch (error) {}
    };

    useDebounce(fetchAllMovies, [query, updatemovies]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        fetchAllMovies(event.selected);
        setActivePage(event.selected);
    };

    useEffect(() => {
        if (query === "" || !query) {
            setIsSearchCleared(true);
            setActivePage(0);
        } else {
            setIsSearchCleared(false);
        }
    }, [query]);

    useEffect(() => {
        if (isSearchCleared) {
            setActivePage(0);
        }
    }, [isSearchCleared]);

    useEffect(() => {
        if (!isSearchCleared) {
            setActivePage(0);
        }
    }, [query]);

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
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(pageCount)}
                    previousLabel="<"
                    forcePage={activePage}
                    renderOnZeroPageCount={null}
                    activeClassName="active-page"
                    previousClassName="previous-page-btn"
                    nextClassName="next-page-btn"
                    containerClassName="paginate-container"
                    pageClassName="middle-pages"
                    disabledClassName="disabled-page-btn"
                    nextLinkClassName="disabled-page-link"
                />
            </section>
        </>
    );
};

export default Movies;
