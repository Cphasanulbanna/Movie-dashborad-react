import React, { useEffect, useRef, useState } from "react";

import { ToastContainer } from "react-toastify";

//components
import ConfirmDelete from "../modals/ConfirmDelete";
import Skelton from "../general/skelton-loader/Skelton";
import ButtonLoader from "../general/Button-loader/ButtonLoader";

//icons
import edit from "../../assets/icons/edit-movie.png";
import remove from "../../assets/icons/delete.png";
import add from "../../assets/icons/add.png";

import Notification from "../../assets/general/utils/Notification";
import { axiosInstance } from "../../../interceptor";

const Genres = () => {
    const [genres, setGenres] = useState([]);
    const [genreTitle, setGenreTitle] = useState("");

    //if of genre to edit
    const [genreId, setGerneId] = useState("");
    const [genreIdToDelete, setGerneIdToDelete] = useState("");

    //genre name to update
    const [editedGenre, setEditedGenre] = useState("");

    const [showAddInput, setShowAddInput] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [addButtonLoader, setAddButtonLoader] = useState(false);
    const [editButtonloader, setEditButtonLoader] = useState(false);
    const [deletButtonLoader, setDeleteButtonLoader] = useState(false);

    const addGenreRef = useRef(null);

    let controller = new AbortController();
    const fetchGenres = async () => {
        try {
            const response = await axiosInstance("/genres", {
                method: "GET",
                signal: controller.signal,
            });

            setGenres(response.data?.genres);
            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        fetchGenres();

        return () => {
            controller.abort();
        };
    }, []);

    const addGenre = async () => {
        try {
            setAddButtonLoader(true);
            if (genreTitle) {
                const response = await axiosInstance("/genres", {
                    method: "POST",
                    data: {
                        title: genreTitle,
                    },
                });

                setGenres(response.data?.genres);
                setGenreTitle("");
                setShowAddInput(false);
                Notification("Genre added", "success");
            }
        } catch (error) {
            Notification(error?.response?.data?.message, "error");
        } finally {
            setAddButtonLoader(false);
        }
    };

    const handleAddInput = () => {
        setShowAddInput((prev) => !prev);
    };

    useEffect(() => {
        addGenreRef.current?.focus();
    }, [showAddInput]);

    const handleGenreChange = (e) => {
        const value = e.target.value.toLowerCase();
        setGenreTitle(value);
    };

    const handleEnterkeyFunction = (e) => {
        if (genreTitle) {
            if (e.key === "Enter") {
                addGenre();
            }
        }
    };

    const handleGenreEdit = (genre) => {
        setEditedGenre(genre?.title);
        setGerneId(genre?._id);
    };

    const deleteGenre = async () => {
        try {
            setDeleteButtonLoader(true);
            await axiosInstance("/genres", {
                method: "DELETE",
                data: {
                    _id: genreIdToDelete,
                },
            });
            setGenres((prev) => prev.filter((genre) => genre._id !== genreIdToDelete));
            setShowDeleteModal(false);
            Notification("Genre deleted", "success");
        } catch (error) {
            Notification(error?.response?.data?.message, "error");
        } finally {
            setDeleteButtonLoader(false);
        }
    };

    const updateGenre = async (id) => {
        try {
            setEditButtonLoader(true);
            if (!editedGenre) {
                setGerneId(null);
            } else {
                const resposne = await axiosInstance("/genres", {
                    method: "PUT",
                    data: { _id: id, title: editedGenre },
                });
                setGenres(resposne.data?.genres);
                setGerneId(null);
                setEditedGenre("");
                Notification("Genre updated", "success");
            }
        } catch (error) {
            Notification(error?.response?.data?.message, "error");
        } finally {
            setEditButtonLoader;
        }
    };

    const handleEditedGenreChange = (e) => {
        const value = e.target.value.toLowerCase();
        setEditedGenre(value);
    };

    const cancelEdit = () => {
        setGerneId(null);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <section className="h-[fill] w-[fill] overflow-y-scroll py-[20px]">
            <ToastContainer limit={1} />
            {showDeleteModal && (
                <ConfirmDelete
                    deleteItem={deleteGenre}
                    state={showDeleteModal}
                    closeModal={closeDeleteModal}
                    buttonLoader={deletButtonLoader}
                />
            )}
            <section className="mx-[auto] w-[85%] sm3:w-[95%] pb-[40px]">
                <div className="flex items-center justify-center relative mb-[30px]">
                    <h1 className="font-bold text-center text-[32px] sm3:text-[20px] md2:text-[24px] md4:text-[26px] lg2:text-[30px] sm2:text-[18px]">
                        Manage Genres
                    </h1>
                    <div
                        onClick={handleAddInput}
                        className="w-[35px] h-[35px] md1:w-[30px] md1:h-[30px] sm3:h-[25px] sm3:w-[25px] icon cursor-pointer absolute right-[10px] top-[50%] translate-y-[-50%]"
                    >
                        <img
                            src={add}
                            alt="add"
                        />
                    </div>
                </div>

                {showAddInput && (
                    <div className="mb-[20px] flex justify-between items-center h-[48px] lg2:h-[40px] bg-[#f1f1f1] pr-[2px]">
                        <input
                            className="w-[fill] p-[7px] text-[16px] h-[100%]"
                            type="text"
                            placeholder="type here"
                            value={genreTitle}
                            onChange={handleGenreChange}
                            onKeyDown={handleEnterkeyFunction}
                            ref={addGenreRef}
                        />
                        <div
                            onClick={addGenre}
                            style={{ background: "#062030" }}
                            className={` text-[#f2f2f2] cursor-pointer overflow-hidden h-[45px]  lg2:h-[40px] sm3:text-[14px] px-[15px] right-[2px] flex justify-center items-center 
                           `}
                        >
                            {addButtonLoader ? <ButtonLoader /> : "Add"}
                        </div>
                    </div>
                )}

                <ul className="flex flex-col h-[100%] justify-center w-[100%] gap-[15px] md1:gap-[10px] sm3:gap-[6px] ">
                    {isLoading ? (
                        <Skelton
                            type={"rectangle"}
                            count={genres?.length}
                        />
                    ) : (
                        genres?.map((genre, index) => {
                            if (genre._id === genreId) {
                                return (
                                    <div
                                        key={genre?._id}
                                        className="flex items-center h-[48px] justify-between w-[100%] px-[15px] pl-0 bg-dark-blue md1:h-[40px] input"
                                    >
                                        <div className="w-[fill]">
                                            <input
                                                className="h-[48px] md1:h-[40px] w-[fill] pl-[15px] bg-[inherit]"
                                                type="text"
                                                placeholder={"movie genre"}
                                                value={editedGenre}
                                                onChange={handleEditedGenreChange}
                                            />
                                        </div>
                                        <div className="flex gap-[12px] items-center h-[fill] sm3:gap-0">
                                            {genreId === genre?._id ? (
                                                <div
                                                    onClick={cancelEdit}
                                                    className=" px-[10px] cursor-pointer h-[100%] flex items-center sm3:text-[14px]"
                                                >
                                                    cancel
                                                </div>
                                            ) : (
                                                <div className="w-[25px] h-[25px] cursor-pointer sm3:text-[14px]">
                                                    <img
                                                        src={edit}
                                                        alt="edit"
                                                    />
                                                </div>
                                            )}
                                            <div
                                                onClick={() => updateGenre(genre?._id)}
                                                className=" p-[10px] cursor-pointer h-[100%] flex items-center"
                                            >
                                                {editButtonloader ? <ButtonLoader /> : "save"}
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <li
                                        style={
                                            index % 2 === 0
                                                ? { backgroundColor: "rgb(1, 29, 48)" }
                                                : { backgroundColor: "#001220" }
                                        }
                                        className="bg-dark-blue w-[100%] py-[15px] sm3:py-[10px] sm3:px-[15px] px-[20px] h-[48px] lg2:h-[50px] md1:h-[40px] flex justify-between items-center"
                                        key={genre?._id}
                                    >
                                        <h2 className="text-[18px] font-bold lg2:text-[16px]">
                                            {" "}
                                            {genre?.title}
                                        </h2>
                                        <div className="flex items-center gap-[15px] md1:gap-[3px]">
                                            <div
                                                onClick={() => handleGenreEdit(genre)}
                                                className="w-[25px] h-[25px] cursor-pointer mr-[15px] md1:mr-[8px] icon md3:w-[22px] md3:h-[22px] sm3:h-[16px] sm3:w-[16px]"
                                            >
                                                <img
                                                    src={edit}
                                                    alt="edit"
                                                />
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setShowDeleteModal(true);
                                                    setGerneIdToDelete(genre?._id);
                                                }}
                                                className="w-[25px] h-[25px] cursor-pointer icon md3:w-[22px] md3:h-[22px] sm3:h-[16px] sm3:w-[16px]"
                                            >
                                                <img
                                                    src={remove}
                                                    alt="delete"
                                                />
                                            </div>
                                        </div>
                                    </li>
                                );
                            }
                        })
                    )}
                </ul>
            </section>
        </section>
    );
};

export default Genres;
