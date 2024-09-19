import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";

export interface RequestOtpRequest {
  phone: string;  
}

export interface RequestOtpResponse {
  message: string;  
}

export interface VerifyOtpRequest {
  phone: string;
  otp: any;
}

export interface VerifyOtpResponse {
  success?: boolean;   
  message: string;
  accessToken:string;
  refreshToken:string;   
  status:string;
  user: User;
  register?: boolean;
}

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
    credentials: "include",
  }),
  tagTypes:["users"],
  endpoints: (builder) => ({
    requestOtp: builder.mutation<RequestOtpResponse, RequestOtpRequest>({
      query: ({ phone }) => ({
        url: "send-otp",
        method: "POST",
        body: { phone },
      }),
      invalidatesTags:["users"]
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: ({ phone, otp }) => ({
        url: "verify-otp",
        method: "POST",
        body: { phone, otp },
      }),
      invalidatesTags:["users"]

    }),
    registerUser: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),

    // getUser: builder.query<UserResponse, string>({
    //   query: (phone) => `getuser/${encodeURIComponent(phone)}`,
    //   providesTags: (result) => [{ type: "users", id: result?.user?.id }],
    // }),
    
  }),
})

export const getUser = async (phone: string) => {
  try { 
    const encodedPhone = encodeURIComponent(phone);
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/getuser/${encodedPhone}`,
      { withCredentials: true } // Ensure cookies are included
    );

    return data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};



export const {
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useRegisterUserMutation
} = userAPI;