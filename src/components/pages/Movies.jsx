import React, { useState } from "react";

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

    const [isLoading, setLoading] = useState(true);

    //search keyword
    const { query } = useQueryStore();

    //movie delete modal state
    const { setShowDeleteModal, showDeleteModal } = useShowDeletemodal();

    //to update homepage when a movie is edited
    const { updateMoviesList, updatemovies } = useUpdateMovies();

    const { userdata } = useUserDataStore();
    const access_token = userdata?.access_token;

    //fetch all movies
    const fetchAllMovies = async (p) => {
        try {
            const controller = new AbortController();
            let url = "/movies";
            const params = {
                p: p,
            };
            if (query) {
                params.q = query;
            }

            const response = await axiosConfig.get(url, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                signal: controller.signal,
                params: params,
            });

            setMovies(response.data?.moviesList);
            setPageCount(response.data?.total_pages);
            setLoading(false);
            controller.abort();
        } catch (error) {}
    };

    useDebounce(fetchAllMovies, [query, updatemovies]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        // const pageNumber = event?.selected + 1;
        fetchAllMovies(event.selected);
    };

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
