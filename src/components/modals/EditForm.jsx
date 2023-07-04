import React, { useEffect, useRef, useState } from "react";

//packages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import ModalWrapper from "../general/ModalWrapper";
import { Input } from "../fields/Input";
import StarRating from "../general/StarRating";

//icons
import editImage from "../../assets/icons/edit-image.png";
import axiosConfig from "../../../axiosConfig";
import CheckBox from "../../components/fields/CheckBox";
import close from "../../assets/icons/close.png";

//store
import { useUpdateMovies, useUserDataStore } from "../zustand/store";

//functions
import Notification from "../../assets/general/utils/Notification";
import ButtonLoader from "../general/Button-loader/ButtonLoader";

export const EditForm = ({ showEditModal, setShowEditModal, movie }) => {
    //states
    const [genres, setGenres] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errors, setErrors] = useState({});
    const [posterPreview, setPosterPreview] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: movie?.name,
        year: movie?.year || "",
        rating: movie?.rating || "",
        leadactor: movie?.leadactor || "",
        description: movie?.description || "",
        poster: movie?.poster,
        genre: movie?.genre?.map((item) => item?._id) || [],
        gallery: movie?.gallery || [],
    });

    const [galleryPreview, setGalleryPreview] = useState([]);

    const { updateMoviesList } = useUpdateMovies();
    const { userdata } = useUserDataStore();

    const access_token = userdata?.access_token;
    const fileInputRef = useRef(null);
    const filesInputRef = useRef(null);

    //fetchGenres
    const fetchGenres = async () => {
        try {
            const controller = new AbortController();
            const response = await axiosConfig.get("/genres", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                signal: controller.signal,
            });
            setGenres(response.data?.genres);
            controller.abort();
        } catch (error) {}
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    //opening file input to upload image
    const openFileInput = () => {
        fileInputRef.current.click();
    };

    const openFilesInput = () => {
        filesInputRef.current.click();
    };

    //setting data
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "year" ? Number(value) : value,
        }));
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
        setPosterPreview(URL.createObjectURL(selectedFile));
    };

    // Example usage
    useEffect(() => {}, [formData]);

    //updating movie
    const updateMovieData = async () => {
        try {
            setLoading(true);
            updateMoviesList();
            const isEqual = checkDataEquality(prevFormDataRef.current, formData);
            if (!isEqual) {
                const newFomrData = new FormData();
                newFomrData.append("name", formData?.name);
                newFomrData.append("year", formData?.year);
                newFomrData.append("rating", formData?.rating);
                newFomrData.append("description", formData?.description);
                newFomrData.append("poster", formData?.poster);
                newFomrData.append("genre", formData?.genre);
                Array.from(formData?.gallery)?.forEach((file) => {
                    newFomrData.append("gallery", file);
                });

                const response = await axiosConfig.put(`/movies/${movie?._id}`, newFomrData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${access_token}`,
                    },
                    onUploadProgress,
                });

                setUploadProgress(0);

                Notification("Movie updated", "success");
                setShowEditModal(false);
            } else {
                Notification("Please modify data to update", "error");
            }
        } catch (error) {
            Notification(error?.response?.data?.message, "error");
        } finally {
            setLoading(false);
        }
    };

    //selecting / unselecting genres
    const selectGenres = (genreId) => {
        setFormData((prev) => {
            if (!prev?.genre?.includes(genreId)) {
                return { ...prev, genre: [...prev?.genre, genreId] };
            }
            return { ...prev, genre: prev.genre.filter((id) => id !== genreId) };
        });
    };

    //closing edit form
    const closeModal = () => {
        setShowEditModal(false);
    };

    const handleGalleryChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, ...Array.from(e.target.files)],
        }));
        setGalleryPreview((prev) => [
            ...prev,
            ...Array.from(e.target.files).map((file) => URL.createObjectURL(file)),
        ]);
    };

    const closePreview = (preview, index) => {
        setGalleryPreview((prev) => [...prev.filter((item) => item !== preview)]);
        setFormData((prev) => {
            const newGallery = [...prev.gallery]; // Clone the existing gallery array
            newGallery.splice(index, 1); // Remove the item at the specified index
            return { ...prev, gallery: newGallery }; // Update the formData object with the modified gallery array
        });
    };

    const prevFormDataRef = useRef(null);
    const [prevData, setPrevData] = useState({});

    useEffect(() => {
        setPrevData(formData);
    }, []);
    prevFormDataRef.current = prevData;

    function checkDataEquality(obj1, obj2) {
        for (let key in obj1) {
            if (obj1[key] !== obj2[key]) {
                return false; // Found a mismatch, objects are not equal
            }
        }
        return true; // All values are equal
    }

    //image upload progress
    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (formData?.poster !== prevFormDataRef?.current.poster) {
            setUploadProgress(percent);
        }
    };

    const inputStyle = {
        background: "#082335",
        borderRadius: "5px",
        border: "2px solid #336a8c",
        color: "#418cb3",
    };
    return (
        <>
            <ToastContainer />
            <ModalWrapper
                state={showEditModal}
                closeModal={closeModal}
                style={{ width: "75%" }}
            >
                <div className="flex flex-col overflow-y-scroll max-h-[450px] pb-7">
                    <div className="flex gap-[15px] justify-between lg2:flex-col">
                        {/* leftbox  */}
                        <div className="flex gap-[15px] flex-col w-[48%] lg2:w-full">
                            <div className="flex flex-col gap-[8px] ">
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
                                        placeholder={movie?.name}
                                        css={inputStyle}
                                        value={movie?.name}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[8px] ">
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
                                        type={"text"}
                                        handleDataChange={handleDataChange}
                                        errors={errors?.year}
                                        placeholder={movie?.year}
                                        css={inputStyle}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-[8px] ">
                                <div className="flex flex-col gap-[5px] relative">
                                    <label
                                        htmlFor="name"
                                        className="text-light-white"
                                    >
                                        Details
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder={movie?.description || "Add movie details"}
                                        onChange={handleDataChange}
                                        style={inputStyle}
                                        className="p-[10px] min-h-[120px] max-h-[120px] lg5:min-h-[70px]"
                                    ></textarea>
                                    <span className="absolute left-0 bottom-[-20px] text-[12px] text-[red]">
                                        {errors?.description}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[5px] relative">
                                <label
                                    htmlFor="name"
                                    className="text-light-white"
                                >
                                    Movie gallery
                                </label>

                                <div
                                    style={inputStyle}
                                    onClick={openFilesInput}
                                    className="relative  h-[60px] rounded-[5px] hover:opacity-[0.8] overflow-hidden flex justify-between px-[20px] items-center cursor-pointer"
                                >
                                    {formData?.gallery.length !==
                                    prevFormDataRef.current?.gallery?.length ? (
                                        <h1 className="whitespace-nowrap text-ellipsis overflow-hidden px-[6px]">
                                            {formData?.gallery?.map((item) => item.name + ", ")}
                                        </h1>
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
                                        name="gallery"
                                        type="file"
                                        multiple
                                        onChange={handleGalleryChange}
                                        className="absolute z-[-1]  h-[100%] w-[100%] opacity-0"
                                        ref={filesInputRef}
                                    />
                                    <div className="absolute z-20  right-[15px]">
                                        {formData?.gallery?.length
                                            ? ""
                                            : " click here to upload images"}
                                    </div>
                                </div>

                                <p
                                    onMouseOver={(e) => e.stopPropagation()}
                                    className="absolute left-0 bottom-[-20px] text-[12px] text-[red]"
                                >
                                    {errors.poster}
                                </p>
                            </div>
                            <div className="flex items-center gap-[15px]">
                                {galleryPreview?.map((item, index) => {
                                    if (item) {
                                        return (
                                            <div
                                                key={index}
                                                className="w-[50px] relative max-h-[50px]"
                                            >
                                                {/* {item && (<></>)} */}
                                                <div
                                                    onClick={() => closePreview(item, index)}
                                                    className=" w-[15px] f-[15px] cursor-pointer top-[-8px] absolute right-[-6px] h-[15px] p-[3px] bg-[#dfdfdf] overflow-hidden rounded-full"
                                                >
                                                    <img
                                                        src={close}
                                                        alt="close"
                                                    />
                                                </div>
                                                <img
                                                    className="h-[50px]"
                                                    src={item}
                                                    alt="preview"
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        {/* leftbox edning  */}

                        {/* right box  */}

                        <div className="flex gap-[15px] flex-col w-[48%] lg2:w-full">
                            <div className="flex flex-col gap-[5px]">
                                <h3> Genres</h3>
                                <div
                                    style={inputStyle}
                                    className="flex items-center flex-wrap gap-[15px] p-[7px] max-h-[100px] md2:max-h-[80px] overflow-y-scroll"
                                >
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
                            <div className="flex flex-col gap-[8px] ">
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
                                        placeholder={movie?.leadactor}
                                    />
                                </div>
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
                            <div className="flex flex-col gap-[8px] ">
                                <div className="flex flex-col gap-[5px]">
                                    <label
                                        htmlFor="name"
                                        className="text-light-white"
                                    >
                                        Movie poster
                                    </label>
                                    <div
                                        onClick={openFileInput}
                                        className="relative w-[160px] h-[150px] rounded-[5px] overflow-hidden flex justify-center items-center"
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
                                            className="absolute z-[-1] h-[100%] w-[100%] opacity-0"
                                            ref={fileInputRef}
                                        />
                                        <div className="absolute z-20 inset-0  cursor-pointer opacity-[0.7]">
                                            <img
                                                src={
                                                    posterPreview
                                                        ? posterPreview
                                                        : movie?.poster?.url
                                                }
                                                alt="poster"
                                                className="contain"
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
                                                <span className="text-[#111]">
                                                    {uploadProgress}%
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* rightbox ending  */}
                    </div>

                    <button
                        className="mt-5 btn border-blue"
                        onClick={updateMovieData}
                    >
                        {isLoading ? <ButtonLoader /> : "Update"}
                    </button>
                </div>
            </ModalWrapper>
            <ToastContainer />
        </>
    );
};
