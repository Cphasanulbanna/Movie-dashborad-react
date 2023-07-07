import React, { useState, useEffect, useRef } from "react";

//packages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import CheckBox from "../fields/CheckBox";
import StarRating from "../general/StarRating";
import { Input } from "../fields/Input";
import ButtonLoader from "../general/Button-loader/ButtonLoader";
import Notification from "../../assets/general/utils/Notification";

//icons
import editImage from "../../assets/icons/edit-image.png";

import { useUpdateMovies } from "../zustand/store";
import { axiosInstance } from "../../../interceptor";
import { addMovieSchema } from "../schemas";

export const AddMovies = () => {
    const [formData, setFormData] = useState({
        name: "",
        year: "",
        rating: "",
        leadactor: "",
        description: "",
        poster: "",
        genre: [],
    });

    const [genres, setGenres] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const posterRef = useRef(null);
    const { updateMoviesList } = useUpdateMovies();

    const fetchGenres = async () => {
        try {
            const controller = new AbortController();
            const response = await axiosInstance("/genres", {
                method: "GET",
                signal: controller.signal,
            });
            setGenres(response.data.genres);
            controller.abort();
        } catch (error) {}
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const openFileInput = () => {
        fileInputRef.current.click();
    };

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleRating = (rate) => {
        setFormData((prev) => ({ ...prev, ["rating"]: rate }));
    };

    const handlePosterChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData((prev) => ({ ...prev, ["poster"]: selectedFile }));
        setErrors((prev) => ({ ...prev, ["poster"]: "" }));
    };

    const selectGenres = (genreId) => {
        setFormData((prev) => {
            if (!prev?.genre.includes(genreId)) {
                return { ...prev, genre: [...prev?.genre, genreId] };
            }
            return { ...prev, genre: prev.genre.filter((id) => id !== genreId) };
        });
    };

    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (formData?.poster) {
            setUploadProgress(percent);
        }
    };

    const AddMovie = async (e) => {
        try {
            updateMoviesList();
            setSubmitting(true);
            e.preventDefault();

            const newFomrData = new FormData();
            newFomrData.append("name", formData.name);
            newFomrData.append("year", formData.year);
            newFomrData.append("rating", formData.rating);
            newFomrData.append("leadactor", formData.leadactor);
            newFomrData.append("description", formData.description);
            newFomrData.append("poster", formData.poster);
            newFomrData.append("genre", formData.genre);

            await addMovieSchema.validate(formData, { abortEarly: false });

            await axiosInstance(`/movies/`, newFomrData, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress,
            });

            setUploadProgress(0);
            Notification("Movie added", "success");
            resetForm();
        } catch (error) {
            const validationErrors = {};
            error.inner?.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            Notification(error?.response?.data?.message, "error");
            setErrors(validationErrors);
        } finally {
            setSubmitting(false);
            setUploadProgress(0);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            year: "",
            rating: "",
            leadactor: "",
            description: "",
            poster: "",
            genre: [],
        });
        setErrors({});
    };

    return (
        <section className="p-[30px] sm3:p-[15px]">
            <form
                onSubmit={AddMovie}
                action=""
                className="flex justify-between gap-[25px] md4:flex-col"
            >
                <div className="left flex-colum gap-[20px] w-[48%] md4:w-full">
                    <div className="flex-colum gap-[5px]">
                        <label
                            htmlFor="name"
                            className="text-light-white"
                        >
                            Movie name
                        </label>
                        <Input
                            formData={formData}
                            name="name"
                            type="text"
                            handleDataChange={handleDataChange}
                            errors={errors?.name}
                        />
                    </div>

                    <div className="flex-colum gap-[5px]">
                        <label
                            htmlFor="name"
                            className="text-light-white"
                        >
                            Release year
                        </label>
                        <Input
                            formData={formData}
                            name="year"
                            type="text"
                            handleDataChange={handleDataChange}
                            errors={errors?.year}
                        />
                    </div>

                    <div className="flex-colum gap-[5px]">
                        <label
                            htmlFor="name"
                            className="text-light-white"
                        >
                            Lead Actor
                        </label>
                        <Input
                            formData={formData}
                            name="leadactor"
                            type="text"
                            handleDataChange={handleDataChange}
                            errors={errors?.leadactor}
                        />
                    </div>

                    <div className="flex-colum gap-[5px] relative">
                        <label
                            htmlFor="name"
                            className="text-light-white"
                        >
                            Details
                        </label>
                        <textarea
                            placeholder="Add movie details"
                            name="description"
                            onChange={handleDataChange}
                            className="p-[10px] min-h-[120px] max-h-[120px] sm3:min-h-[70px] input"
                        ></textarea>
                        <span className="error">{errors?.description}</span>
                    </div>
                </div>
                <div className="right flex gap-[20px] flex-col w-[48%]  md4:w-full">
                    <div>
                        <h3> Genres</h3>
                        <div className="flex items-center flex-wrap gap-[15px] border-blue rounded-[4px] p-[8px] max-h-[100px] sm3:max-h-[80px] overflow-y-scroll">
                            {genres?.map((genre) => (
                                <CheckBox
                                    key={genre?._id}
                                    handleClick={() => selectGenres(genre?._id)}
                                    genre={genre}
                                    formData={formData}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex-colum gap-[5px] relative">
                        <label
                            htmlFor="name"
                            className="text-light-white"
                        >
                            Movie poster
                        </label>
                        {uploadProgress && uploadProgress > 0 ? (
                            <div className="w-[100%] rounded-[4px] overflow-hidden h-[60px] border-blue flex items-center">
                                <div
                                    style={
                                        uploadProgress > 0
                                            ? { width: `${uploadProgress}%` }
                                            : { width: "0" }
                                    }
                                    className="h-[60px] bg-[#2faeae] rounded-[4px] overflow-hidden border border-[#dfdfdf]"
                                >
                                    uploading {formData?.poster.name}...{" "}
                                    <span className="text-[#111]">{uploadProgress}%</span>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={openFileInput}
                                className="relative h-[60px] hover:opacity-[0.8] rounded-[5px] overflow-hidden flex justify-between px-[20px] items-center input cursor-pointer"
                            >
                                {formData?.poster ? (
                                    <h1>{formData?.poster?.name}</h1>
                                ) : (
                                    <>
                                        <div
                                            style={{ border: "1px dashed #336a8c" }}
                                            className="absolute inset-[5px]"
                                        ></div>
                                        <div className="w-[20px] h-[20px] z-[100] ">
                                            <img
                                                src={editImage}
                                                alt="edit-image"
                                            />
                                        </div>
                                    </>
                                )}

                                <input
                                    name="poster"
                                    type="file"
                                    onChange={handlePosterChange}
                                    className="absolute z-[-1]  h-[100%] w-[100%] opacity-0"
                                    ref={posterRef}
                                />
                                <div className="absolute z-20  right-[15px]">
                                    {formData?.poster ? "Change image" : "upload image"}
                                </div>
                            </div>
                        )}
                        <p className="error">{errors.poster}</p>
                    </div>
                    <div className="flex-colum gap-[5px]">
                        <label
                            htmlFor="rating"
                            className="text-light-white"
                        >
                            Rating
                        </label>
                        <StarRating
                            dimension={"40px"}
                            handleRating={handleRating}
                            name="rating"
                            rating={formData?.rating}
                        />
                    </div>
                    <button
                        style={{ background: "rgb(12, 63, 102)" }}
                        className="btn min-w-[130px] h-[42px]"
                        onClick={AddMovie}
                    >
                        {isSubmitting ? <ButtonLoader /> : "Add Movie"}
                    </button>
                </div>
            </form>
            {/* )} */}
            <ToastContainer />
        </section>
    );
};

export default AddMovies;
