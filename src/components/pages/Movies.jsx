import React, { useEffect, useState } from "react";

//axios
import axiosConfig from "../../../axiosConfig";

//components
import { MovieCard } from "../movie/MovieCard";
import ConfirmDelete from "../modals/ConfirmDelete";
import Skelton from "../general/skelton-loader/Skelton";

//store
import {
    useQueryStore,
    useShowDeletemodal,
    useUpdateMovies,
    useUserDataStore,
} from "../zustand/store";
import Notification from "../../assets/general/utils/Notification";
import { ToastContainer } from "react-toastify";

export const Movies = () => {
    //All movies
    const [movies, setMovies] = useState([]);
    const [movieIdToDelete, setMovieIdToDelete] = useState("");

    const [isLoading, setLoading] = useState(true);

    //search keyword
    const { query } = useQueryStore();
    const { updatemovies } = useUpdateMovies();

    //movie delete modal state
    const { setShowDeleteModal, showDeleteModal } = useShowDeletemodal();

    //to update homepage when a movie is edited
    const { updateMoviesList } = useUpdateMovies();

    const { userdata } = useUserDataStore();
    const access_token = userdata?.access_token;

    //fetch all movies
    const fetchAllMovies = async () => {
        try {
            const controller = new AbortController();
            let url = "/movies";
            const params = {};
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
            setLoading(false);
            controller.abort();
        } catch (error) {}
    };

    useEffect(() => {
        fetchAllMovies();
    }, [query, updatemovies]);

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
                    movieIds: [movieIdToDelete],
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
            </section>
        </>
    );
};

export default Movies;
