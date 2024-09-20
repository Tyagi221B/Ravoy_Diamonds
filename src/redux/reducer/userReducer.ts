// userReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";

const initialState: UserReducerInitialState = {
  user: null,
  loading: true,
  reAuthToken: "", // Add reAuthToken to the initial state
  accessToken:""
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    // Existing actions
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
      localStorage.removeItem("user");
    },

    userLoading: (state) => {
      state.loading = true;
    },

    restoreUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        state.user = JSON.parse(storedUser) as User;
        state.loading = false;
      } else {
        state.loading = false;
        state.user = null;
      }
    },

    // New actions for reAuthToken
    setReAuthToken: (state, action: PayloadAction<string>) => {
      state.reAuthToken = action.payload;
    },

    clearReAuthToken: (state) => {
      state.reAuthToken = "";
    },
  },
});

// Exporting all actions
export const {
  userExist,
  userNotExist,
  userLoading,
  restoreUserFromStorage,
  setReAuthToken,
  clearReAuthToken,
} = userReducer.actions;

export default userReducer.reducer;
