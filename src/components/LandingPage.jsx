import React from "react";

//packages
import { Routes, Route } from "react-router-dom";

//components
import { Sidebar } from "./Sidebar";
import Header from "./Header";
import Movies from "./pages/movies";

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
                </Routes>
            </section>
        </section>
    );
};

export default LandingPage;
