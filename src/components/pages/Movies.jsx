import React, { useEffect, useState } from "react";

//axios
import axiosConfig from "../../../axiosConfig";

//components
import { MovieCard } from "../movie/MovieCard";

//store
import { useQueryStore, useUpdateMovies, useUserDataStore } from "../zustand/store";
import Skelton from "../general/skelton-loader/Skelton";

export const Movies = () => {
    //All movies
    const [movies, setMovies] = useState([]);

    const [isLoading, setLoading] = useState(true);
    console.log(isLoading, "load");

    //search keyword
    const { query } = useQueryStore();
    const { updatemovies } = useUpdateMovies();

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

    return (
        <section className="w-[100%]">
            <div className="flex justify-between items-center flex-wrap gap-[20px]">
                {isLoading ? (
                    <Skelton
                        type={"feed"}
                        count={movies.length}
                    />
                ) : (
                    movies?.map((movie) => (
                        <MovieCard
                            key={movie?._id}
                            movie={movie}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default Movies;
