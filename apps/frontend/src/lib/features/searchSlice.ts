import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

interface SearchState {
  searchQuery: string;
  searchResults: Product[];
  isSearchOpen: boolean;
}

const initialState: SearchState = {
  searchQuery: "",
  searchResults: [],
  isSearchOpen: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSearchResults(state, action: PayloadAction<Product[]>) {
      state.searchResults = action.payload;
    },
    setIsSearchOpen(state, action: PayloadAction<boolean>) {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults, setIsSearchOpen } =
  searchSlice.actions;
export default searchSlice.reducer;
