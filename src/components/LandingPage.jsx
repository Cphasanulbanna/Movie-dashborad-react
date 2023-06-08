import React from "react";

//packages
import { Routes, Route } from "react-router-dom";

//components
import { Sidebar } from "./Sidebar";
import Header from "./Header";
import Movies from "./pages/movies";
import { MovieSinglePage } from "./pages/MovieSinglePage";

const LandingPage = () => {
    return (
        <section>
            <Header />
            <Sidebar />
            <section className="fixed top-[100px] left-[200px] width-[fill] h-full bg-dark-blue-2 p-[20px]">
                <Routes>
                    <Route
                        path="/"
                        element={<Movies />}
                    />
                    <Route
                        path="/:id"
                        element={<MovieSinglePage />}
                    />
                </Routes>
            </section>
        </section>
    );
};

export default LandingPage;
