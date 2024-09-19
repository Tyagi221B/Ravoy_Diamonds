import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Address, AddressResponse } from "../../types/api-types";

export interface CreateAddressRequest {
  userId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber?: string;
  addressType?: string;
}

export interface UpdateAddressRequest {
  userId: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phoneNumber?: string;
  addressType?: string;
}

export const addressAPI = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/address/`,
    credentials: "include",
  }),
  tagTypes: ["Address", "UserAddresses"],
  endpoints: (builder) => ({
    getAddressesForUser: builder.query<Address[], string>({
      query: (userId) => `addresses/user/${userId}`,
      transformResponse: (response: { addresses: Address[] }) => response.addresses,
      providesTags: [{ type: "UserAddresses", id: "LIST" }],
    }),

    getAddressById: builder.query<Address, string>({
      query: (addressId) => `addresses/${addressId}`,
      providesTags: (result, error, id) => [{ type: "Address", id }],
    }),

    createAddress: builder.mutation<AddressResponse, CreateAddressRequest>({
      query: (newAddress) => ({
        url: "addresses",
        method: "POST",
        body: newAddress,
      }),
      invalidatesTags: [{ type: "UserAddresses", id: "LIST" }],
    }),

    updateAddress: builder.mutation<AddressResponse, { addressId: string; data: UpdateAddressRequest }>({
      query: ({ addressId, data }) => ({
        url: `addresses/${addressId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { addressId }) => [{ type: "Address", id: addressId }],
    }),

    deleteAddress: builder.mutation<AddressResponse, { addressId: string }>({
      query: ({ addressId }) => ({
        url: `addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { addressId }) => [
        { type: "Address", id: addressId },
        { type: "UserAddresses", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAddressesForUserQuery,
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressAPI;
