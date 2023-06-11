import React, { useState, useEffect, useRef } from "react";

//packages
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import CheckBox from "../fields/CheckBox";
import StarRating from "../general/StarRating";
import { Input } from "../fields/Input";

//icons
import editImage from "../../assets/icons/edit-image.png";

//axios
import axiosConfig from "../../../axiosConfig";

//store
import { useUserDataStore } from "../zustand/store";

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

    //form  fields validation
    const formSchema = yup.object().shape({
        name: yup.string().required("Movie name is required"),
        year: yup.string().required("Year is required"),
        poster: yup.string().required("Movie poster is required"),
    });

    const { userdata } = useUserDataStore();
    const access_token = userdata?.access_token;
    const fileInputRef = useRef(null);

    //fetch all genres
    const fetchGenres = async () => {
        try {
            const response = await axiosConfig.get("/genres", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setGenres(response.data.genres);
        } catch (error) {}
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    //opening file input to upload image
    const openFileInput = () => {
        fileInputRef.current.click();
    };

    //setting formdata
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    //setting rating
    const handleRating = (rate) => {
        setFormData((prev) => ({ ...prev, ["rating"]: rate }));
    };

    //setting movie poster
    const handlePosterChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData((prev) => ({ ...prev, ["poster"]: selectedFile }));
        setErrors((prev) => ({ ...prev, ["poster"]: "" }));
    };

    //success message
    const notify = () =>
        toast.success("Movie updated !", {
            hideProgressBar: true,
            autoClose: 1500,
            pauseOnHover: false,
            theme: "colored",
            position: "bottom-center",
        });

    //image upload progress
    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (formData?.poster) {
            setUploadProgress(percent);
        }
    };

    //selecting/unselecting gernes
    const selectGenres = (genreId) => {
        setFormData((prev) => {
            if (!prev?.genre.includes(genreId)) {
                return { ...prev, genre: [...prev?.genre, genreId] };
            }
            return { ...prev, genre: prev.genre.filter((id) => id !== genreId) };
        });
    };

    //adding new movie function
    const AddMovie = async (e) => {
        try {
            e.preventDefault();
            await formSchema.validate(formData, { abortEarly: false });

            const response = await axiosConfig.post(`/movies/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },

                onUploadProgress,
            });
            updateMoviesList();
            setUploadProgress(0);
            notify();
        } catch (error) {
            const validationErrors = {};
            error.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    };

    const inputStyle = {
        background: "#082335",
        borderRadius: "5px",
        border: "2px solid #336a8c",
        color: "#418cb3",
    };

    return (
        <section className="p-[30px]">
            <form
                onSubmit={AddMovie}
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
                    <div className="flex flex-col gap-[5px] relative">
                        <label
                            htmlFor="name"
                            className="text-light-white"
                        >
                            Movie poster
                        </label>
                        <div
                            style={inputStyle}
                            onClick={openFileInput}
                            className="relative  h-[60px] rounded-[5px] hover:opacity-[0.8] overflow-hidden flex justify-between px-[20px] items-center cursor-pointer"
                        >
                            {formData?.poster ? (
                                <h1>{formData?.poster?.name}</h1>
                            ) : (
                                <>
                                    {" "}
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
                                ref={fileInputRef}
                            />
                            <div className="absolute z-20  right-[15px]">
                                {formData?.poster ? "Change image" : " click here to upload image"}
                            </div>
                        </div>
                        <p
                            onMouseOver={(e) => e.stopPropagation()}
                            className="absolute left-0 bottom-[-20px] text-[12px] text-[red]"
                        >
                            {errors.poster}
                        </p>

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
                    <button
                        className="btn border-blue"
                        onClick={AddMovie}
                    >
                        Add Movie
                    </button>
                </div>
            </form>
            <ToastContainer />
        </section>
    );
};

export default AddMovies;
