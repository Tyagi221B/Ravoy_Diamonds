import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { userAPI } from "./api/UserApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer:{
    [userReducer.name]: userReducer.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (mid) => mid().concat(
    userAPI.middleware
  )
});

export type RootState = ReturnType<typeof store.getState>;