import React, { useEffect, useState } from "react";
import axiosConfig from "../../../axiosConfig";

import edit from "../../assets/icons/edit-movie.png";
import remove from "../../assets/icons/delete.png";
import add from "../../assets/icons/add.png";

const Genres = () => {
    const [genres, setGenres] = useState([]);
    const [genreTitle, setGenreTitle] = useState("");
    const [showAddInput, setShowAddInput] = useState(false);
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

    const addGenre = async () => {
        try {
            if (genreTitle) {
                const resposne = await axiosConfig.post("/genres", {
                    title: genreTitle,
                });
                console.log(resposne.data);
                setGenres(resposne.data?.genres);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddInput = () => {
        setShowAddInput((prev) => !prev);
    };

    const handleGenreChange = (e) => {
        const value = e.target.value.toLowerCase();
        setGenreTitle(value);
    };

    const deleteGenre = async () => {};

    const updateGenre = async () => {};

    // const animation = showAddInput
    //     ? { transition: "all 0.4s ease-in-out", height: "0", overflow: "hidden" }
    //     : { transition: "all 0.4s ease-in-out", height: "48px" };
    return (
        <section className="h-[fill] w-[fill]">
            <section className="mx-[auto] w-[85%] ">
                <div className="flex items-center justify-center relative mb-[30px]">
                    <h1 className="font-bold text-center text-[32px]">Manage Genres</h1>
                    <div
                        onClick={handleAddInput}
                        className="w-[35px] h-[35px] icon cursor-pointer absolute right-[10px] top-[50%] translate-y-[-50%]"
                    >
                        <img
                            src={add}
                            alt="add"
                        />
                    </div>
                </div>

                {showAddInput && (
                    <div
                        // style={animation}
                        className="mb-[20px] flex justify-between items-center h-[48px] bg-[#f1f1f1] pr-[2px]"
                    >
                        <input
                            className="w-[fill] p-[7px] text-[16px] h-[100%]"
                            type="text"
                            placeholder="type here"
                            value={genreTitle}
                            onChange={handleGenreChange}
                        />
                        <div
                            onClick={addGenre}
                            style={{ background: "#062030" }}
                            className={` text-[#f2f2f2] cursor-pointer overflow-hidden h-[45px] px-[15px] right-[2px] flex justify-center items-center 
                           `}
                        >
                            Add
                        </div>
                    </div>
                )}

                <ul className="flex flex-wrap items-center justify-center w-[100%] max-h-[500px] gap-[15px] overflow-y-scroll">
                    {genres?.map((genre, index) => (
                        <li
                            style={
                                index % 2 === 0
                                    ? { backgroundColor: "rgb(1, 29, 48)" }
                                    : { backgroundColor: "#001220" }
                            }
                            className="bg-dark-blue w-[100%] py-[15px] px-[20px]  flex justify-between items-center"
                            key={genre?._id}
                        >
                            <h2 className="text-[18px] font-bold"> {genre?.title}</h2>
                            <div className="flex items-center gap-[15px]">
                                <div className="w-[25px] h-[25px] cursor-pointer mr-[15px] icon">
                                    <img
                                        src={edit}
                                        alt="edit"
                                    />
                                </div>
                                <div className="w-[25px] h-[25px] cursor-pointer icon">
                                    <img
                                        src={remove}
                                        alt="delete"
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
};

export default Genres;
