import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

interface SendReAuthOtpResponse {
  message: string;
  status: string;
}

interface VerifyReAuthOtpRequest {
  otp: string;
}

interface VerifyReAuthOtpResponse {
  message: string;
  reAuthToken: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/auth/`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.userReducer.accessToken; // Access token from Redux

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendReAuthOtp: builder.mutation<SendReAuthOtpResponse, void>({
      query: () => ({
        url: "send-reauth-otp",
        method: "POST",
      }),
    }),
    verifyReAuthOtp: builder.mutation<VerifyReAuthOtpResponse, VerifyReAuthOtpRequest>({
      query: (credentials) => ({
        url: "verify-reauth-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    // Add other auth endpoints as needed
  }),
});

export const {
  useSendReAuthOtpMutation,
  useVerifyReAuthOtpMutation,
} = authApi;
