import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../services/userSlice.js"

// Create the Redux store directly with a single reducer
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
