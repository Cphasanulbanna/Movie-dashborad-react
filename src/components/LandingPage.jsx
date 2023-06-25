import React from "react";

//packages
import { Routes, Route } from "react-router-dom";

//components

import Header from "./Header";
import Movies from "./pages/movies";
import Genres from "./pages/Genres";
import Users from "./pages/Users";
import { MovieSinglePage } from "./pages/MovieSinglePage";
import { Sidebar } from "./Sidebar";
import { AddMovies } from "./pages/AddMovies";
import EmailPage from "./auth/EmailPage";

const LandingPage = () => {
    return (
        <section>
            <Header />
            <Sidebar />
            <section className="fixed top-[100px] overflow-y-scroll left-[200px] lg1:left-[75px] md2:left-[50px] w-[fill] h-[fill] bg-dark-blue-2 p-[20px] sm2:p-[10px]">
                <Routes>
                    <Route
                        path="/"
                        element={<Movies />}
                    />
                    <Route
                        path="/:id"
                        element={<MovieSinglePage />}
                    />
                    <Route
                        path="/genres"
                        element={<Genres />}
                    />
                    <Route
                        path="/add-movie"
                        element={<AddMovies />}
                    />
                    <Route
                        path="/users"
                        element={<Users />}
                    />
                </Routes>
            </section>
        </section>
    );
};

export default LandingPage;
