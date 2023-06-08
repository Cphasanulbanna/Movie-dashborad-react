import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../../../axiosConfig";

export const MovieSinglePage = () => {
    const { id } = useParams();

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmZWIyZDg4NjM2MDdhOWJmYzU0NTciLCJpYXQiOjE2ODYxNDIyNDF9._s-rFH4k8juDUIFFhMFCO8fat3Wx9UbhiGUODd-KdgQ";

    const fetchMovie = async () => {
        try {
            const resposne = await axiosConfig.get(`/movies/${id}`, {
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
        fetchMovie();
    }, []);
    return (
        <div className="p=[20px] flex gap-[30px]">
            <div className="w-[40%]">{/* <img src={} alt="" /> */}</div>
            <div className="w-[60%]"></div>
        </div>
    );
};
