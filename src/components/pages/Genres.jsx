import React, { useEffect, useState } from "react";
import axiosConfig from "../../../axiosConfig";

const Genres = () => {
    const [genres, setGenres] = useState([]);
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmZWIyZDg4NjM2MDdhOWJmYzU0NTciLCJpYXQiOjE2ODYxNDIyNDF9._s-rFH4k8juDUIFFhMFCO8fat3Wx9UbhiGUODd-KdgQ";
    const fetchGenres = async () => {
        try {
            const controller = new AbortController();
            const response = await axiosConfig.get("/genres", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                signal: controller.signal,
            });

            setGenres(response.data?.genres);
            controller.abort();
        } catch (error) {
            console.log(error);
        }
    };

    console.log(genres);

    useEffect(() => {
        fetchGenres();
    }, []);

    const deleteGenre = async () => {};

    const updateGenre = async () => {};
    return (
        <section>
            <section className="wrapper">
                <h1 className="font-bold text-center">Manage Genres</h1>
                <div></div>
            </section>
        </section>
    );
};

export default Genres;
