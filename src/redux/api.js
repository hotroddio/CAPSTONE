// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (registerUser) => ({
        url: "/users",
        method: "POST",
        body: registerUser,
      }),
    }),
    login: builder.mutation({
      query: (loginUser) => ({
        url: "auth/login",
        method: "POST",
        body: loginUser,
      }),
    }),
    account: builder.query({
      query: ({ token, id }) => ({
        url: `users/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    estoreList: builder.query({
      query: () => ({
        url: "products",
      }),
    }),
    estoreListItem: builder.query({
      query: ({ token, id }) => ({
        url: `products/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserId: builder.query({
      query: () => ({
        url: `/users`,
      }),
    }),
    cart: builder.query({
      query: ({ token, id }) => ({
        url: `carts/user/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    addCartItem: builder.query({
      query: ({ token, id, productId, quantity }) => ({
        url: `carts/${id}`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: id,
          date: "",
          products: [{ productId, quantity }],
        }),
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAccountQuery,
  useEstoreListQuery,
  useEstoreListItemQuery,
  useGetUserIdQuery,
  useCartQuery,
  useAddCartItemQuery,
} = apiSlice;
