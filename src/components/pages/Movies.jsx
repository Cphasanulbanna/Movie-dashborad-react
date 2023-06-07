import React, { useEffect, useState } from "react";
import axiosConfig from "../../../axiosConfig";
import { Movie } from "../movie/Movie";

export const Movies = () => {
    const [movies, setMovies] = useState([]);
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmZWIyZDg4NjM2MDdhOWJmYzU0NTciLCJpYXQiOjE2ODYxNDIyNDF9._s-rFH4k8juDUIFFhMFCO8fat3Wx9UbhiGUODd-KdgQ";
    const fetchAllMovies = async () => {
        try {
            const resposne = await axiosConfig.get("/movies", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(resposne);
            setMovies(resposne.data?.moviesList);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllMovies();
    }, []);
    return (
        <section>
            <div className="flex justify-center items-center flex-wrap gap-[20px]">
                {movies?.map((movie) => (
                    <Movie movie={movie} />
                ))}
            </div>
        </section>
    );
};

export default Movies;
