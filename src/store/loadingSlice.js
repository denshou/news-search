import { configureStore, createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    switchLoading(state) {
      switch (state.isLoading) {
        case true: {
          state.isLoading = false;
          break;
        }
        case false: {
          state.isLoading = true;
          break;
        }
      }
    },
  },
});

const store = configureStore({
  reducer: loadingSlice.reducer,
});

export const loadingActions = loadingSlice.actions;

export default store;
