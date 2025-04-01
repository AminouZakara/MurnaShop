import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Load favorites from AsyncStorage
export const loadFavorites = createAsyncThunk("favorites/loadFavorites", async () => {
  const favoritesData = await AsyncStorage.getItem("favorites");
  return favoritesData ? JSON.parse(favoritesData) : [];
});

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.items.find(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
        AsyncStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      AsyncStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;