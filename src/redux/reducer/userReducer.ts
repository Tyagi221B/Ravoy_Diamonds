import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";

const initialState: UserReducerInitialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    // Action when the user is successfully authenticated
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      // Persist the user in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // Action when the user is logged out or doesn't exist
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
      // Clear user data from localStorage
      localStorage.removeItem("user");
    },

    // Action to handle loading state (useful when initializing the app)
    userLoading: (state) => {
      state.loading = true;
    },

    // Action to restore user from localStorage during app initialization
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
  },
});

// Exporting all actions
export const { userExist, userNotExist, userLoading, restoreUserFromStorage } = userReducer.actions;
export default userReducer.reducer;
