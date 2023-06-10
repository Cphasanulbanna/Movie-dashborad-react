import React, { useEffect, useState } from "react";
import axiosConfig from "../../../axiosConfig";
import { MovieCard } from "../movie/MovieCard";
import { useQueryStore } from "../zustand/store";

export const Movies = () => {
    const [movies, setMovies] = useState([]);
    const { query } = useQueryStore();

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmZWIyZDg4NjM2MDdhOWJmYzU0NTciLCJpYXQiOjE2ODYxNDIyNDF9._s-rFH4k8juDUIFFhMFCO8fat3Wx9UbhiGUODd-KdgQ";
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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllMovies();
    }, [query]);

    return (
        <section className="w-[100%]">
            <div className="flex justify-center items-center flex-wrap gap-[20px]">
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
