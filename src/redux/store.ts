import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { userAPI } from "./api/UserApi";
import { addressAPI } from "./api/AddressApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer:{
    [userReducer.name]: userReducer.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [addressAPI.reducerPath]: addressAPI.reducer,
  },
  middleware: (mid) => mid().concat(
    userAPI.middleware,
    addressAPI.middleware,
  )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;