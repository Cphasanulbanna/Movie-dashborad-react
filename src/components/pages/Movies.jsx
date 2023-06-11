import React, { useEffect, useState } from "react";

//axios
import axiosConfig from "../../../axiosConfig";

//components
import { MovieCard } from "../movie/MovieCard";

//zustand store
import { useQueryStore, useUpdateMovies } from "../zustand/store";

export const Movies = () => {
    //All movies
    const [movies, setMovies] = useState([]);

    //search keyword
    const { query } = useQueryStore();
    const { updatemovies } = useUpdateMovies();

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmZWIyZDg4NjM2MDdhOWJmYzU0NTciLCJpYXQiOjE2ODYxNDIyNDF9._s-rFH4k8juDUIFFhMFCO8fat3Wx9UbhiGUODd-KdgQ";

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
                    Authorization: `Bearer ${token}`,
                },
                signal: controller.signal,
                params: params,
            });

            setMovies(response.data?.moviesList);
            controller.abort();
        } catch (error) {}
    };

    useEffect(() => {
        fetchAllMovies();
    }, [query, updatemovies]);

    return (
        <section className="w-[100%]">
            <div className="flex justify-between items-center flex-wrap gap-[20px]">
                {movies?.map((movie) => (
                    <MovieCard
                        key={movie?._id}
                        movie={movie}
                    />
                ))}
            </div>
        </section>
    );
};

export default Movies;
