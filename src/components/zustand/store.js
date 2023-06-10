import { create } from "zustand";

export const useQueryStore = create((set) => ({
    query: "",
    updateQuery: (value) => set({ query: value }),
}));

export const useUpdateMovies = create((set) => ({
    updatemovies: false,
    updateMoviesList: () => set((state) => ({ updatemovies: !state.updatemovies })),
}));
