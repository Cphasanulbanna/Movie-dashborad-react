import { create } from "zustand";
import Cookies from "js-cookie";

export const useShowDeletemodal = create((set) => ({
    showDeleteModal: false,
    setShowDeleteModal: (value) => set({ showDeleteModal: value }),
}));

export const useGenres = create((set) => ({
    genres: [],
    updateGenres: (value) => set({ genres: value }),
}));

const userData = JSON.parse(localStorage.getItem("user_data"));
const userDataInitialState = {
    access_token: "",
    username: "",
    role: "",
    email: "",
    profile_pic: "",
    id: "",
};
export const useUserDataStore = create((set) => ({
    userdata: userData ? userData : userDataInitialState,
    updateUserData: (newValue) => {
        set((state) => {
            const updatedData = { ...state.userdata, ...newValue };
            localStorage.setItem("user_data", JSON.stringify(updatedData));
            return { userdata: updatedData };
        });
    },
    logout: () => {
        set(() => {
            localStorage.clear();
            Cookies.remove("refreshToken");
            return { userdata: userDataInitialState };
        });
    },
}));
