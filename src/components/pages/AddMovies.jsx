import React from "react";
import CheckBox from "../fields/CheckBox";
import StarRating from "../general/StarRating";
import { Input } from "../fields/Input";
import { useState } from "react";
import axiosConfig from "../../../axiosConfig";
import { useEffect } from "react";
import { useRef } from "react";
import editImage from "../../assets/icons/edit-image.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errors, setErrors] = useState({});
    const [posterPreview, setPosterPreview] = useState(null);

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmZWIyZDg4NjM2MDdhOWJmYzU0NTciLCJpYXQiOjE2ODYxNDIyNDF9._s-rFH4k8juDUIFFhMFCO8fat3Wx9UbhiGUODd-KdgQ";

    const fetchGenres = async () => {
        try {
            const response = await axiosConfig.get("/genres", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGenres(response.data.genres);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click event
    };

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        if (name === "genre") {
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleRating = (rate) => {
        setFormData((prev) => ({ ...prev, ["rating"]: rate }));
    };

    const handlePosterChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData((prev) => ({ ...prev, ["poster"]: selectedFile }));
        setPosterPreview(URL.createObjectURL(selectedFile));
    };

    const notify = () =>
        toast.success("Movie updated !", {
            hideProgressBar: true,
            autoClose: 1500,
            pauseOnHover: false,
            theme: "colored",
            position: "bottom-center",
        });

    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (formData?.poster) {
            setUploadProgress(percent);
        }
    };

    const selectGenres = (genreId) => {
        setFormData((prev) => {
            if (!prev?.genre.includes(genreId)) {
                return { ...prev, genre: [...prev?.genre, genreId] };
            }
            return { ...prev, genre: prev.genre.filter((id) => id !== genreId) };
        });
    };

    const inputStyle = {
        background: "#082335",
        borderRadius: "5px",
        border: "2px solid #336a8c",
        color: "#418cb3",
    };

    const AddMovie = async () => {
        try {
            const response = await axiosConfig.put(`/movies/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress,
            });
            updateMoviesList();
            setUploadProgress(0);
            notify();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="p-[30px]">
            <form
                action=""
                className="flex justify-between gap-[25px]"
            >
                <div className="left flex flex-col gap-[20px] w-[48%]">
                    <div className="flex flex-col gap-[5px]">
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
                            // placeholder={movie?.name}
                            css={inputStyle}
                        />
                    </div>

                    <div className="flex flex-col gap-[5px]">
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
                            // placeholder={movie?.year}
                            css={inputStyle}
                        />
                    </div>

                    <div className="flex flex-col gap-[5px]">
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
                            css={inputStyle}
                            // placeholder={movie?.leadactor}
                        />
                    </div>

                    <div className="flex flex-col gap-[5px] relative">
                        <label
                            htmlFor="name"
                            className="text-light-white"
                        >
                            Details
                        </label>
                        <textarea
                            name="description"
                            // placeholder={movie?.description}
                            onChange={handleDataChange}
                            style={inputStyle}
                            className="p-[10px] min-h-[120px] max-h-[120px]"
                        />
                        <span className="absolute left-0 bottom-[-20px] text-[12px] text-[red]">
                            {errors?.description}
                        </span>
                    </div>
                </div>
                <div className="right flex gap-[20px] flex-col w-[48%]">
                    <div>
                        <h3> Genres</h3>
                        <div className="flex items-center flex-wrap gap-[15px]">
                            {genres?.map((genre) => (
                                <CheckBox
                                    key={genre?._id}
                                    handleClick={() => selectGenres(genre?._id)}
                                    genre={genre}
                                    formData={formData}
                                    // currentGenres={movie.genre}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-[5px]">
                        <label
                            htmlFor="name"
                            className="text-light-white"
                        >
                            Movie poster
                        </label>
                        <div
                            onClick={handleButtonClick}
                            className="relative w-[230px] h-[150px] rounded-[5px] overflow-hidden flex justify-center items-center"
                        >
                            <div className="w-[35px] h-[35px] cursor-pointer z-[100] hover:opacity-[0.8]">
                                <img
                                    src={editImage}
                                    alt="edit-image"
                                />
                            </div>
                            <input
                                name="poster"
                                type="file"
                                onChange={handlePosterChange}
                                className="absolute z-[-1] bg-[red] h-[100%] w-[100%] opacity-0"
                                ref={fileInputRef}
                            />
                            <div className="absolute z-20 inset-0 bg-[green] cursor-pointer opacity-[0.7]">
                                <img
                                    src={posterPreview}
                                    alt="poster"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {uploadProgress > 1 && (
                            <div className="w-[100%] rounded-[4px] overflow-hidden h-[30px] border-blue flex items-center">
                                <div
                                    style={
                                        uploadProgress > 0
                                            ? { width: `${uploadProgress}%` }
                                            : { width: "0" }
                                    }
                                    className="h-[30px] bg-[#2faeae] rounded-[4px] overflow-hidden border border-[#dfdfdf]"
                                >
                                    uploading {formData?.poster.name}...{" "}
                                    <span className="text-[#111]">{uploadProgress}%</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-[5px]">
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
                </div>
            </form>
            <ToastContainer />
        </section>
    );
};

export default AddMovies;
