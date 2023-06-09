import React, { useState } from "react";

//packages
import { Routes, Route } from "react-router-dom";

//components

import Header from "./Header";
import Movies from "./pages/Movies";
import Genres from "./pages/Genres";
import Users from "./pages/Users";
import { MovieSinglePage } from "./pages/MovieSinglePage";
import { Sidebar } from "./Sidebar";
import { AddMovies } from "./pages/AddMovies";
import WatchLater from "./pages/WatchLater";

const LandingPage = () => {
    const [genreIds, setGenreIds] = useState([]);
    const [rating, setRatings] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    return (
        <section>
            <Header
                setGenreIds={setGenreIds}
                setRatings={setRatings}
                rating={rating}
                genreIds={genreIds}
                setSearch={setSearch}
                search={search}
                setPage={setPage}
            />
            <Sidebar />
            <section className="fixed z-40 top-[100px] lg1:top-[85px] sm3:top-[75px] overflow-auto left-[200px] lg1:left-[75px] md2:left-[50px] w-[fill] h-[fill] bg-dark-blue-2  pr-0 ">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Movies
                                genreIds={genreIds}
                                rating={rating}
                                search={search}
                                setPage={setPage}
                                page={page}
                            />
                        }
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
                    <Route
                        path="/watch-later"
                        element={<WatchLater />}
                    />
                </Routes>
            </section>
        </section>
    );
};

export default LandingPage;
