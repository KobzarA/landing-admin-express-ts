import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../config";
import { IUser, IUserWithPassword } from "../interfaces/models";
import { IResponse } from "../interfaces/api";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE, credentials: "include" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IResponse<Array<IUser>>, void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getUserByName: builder.query<IUser, string>({
      query: (name) => `users/${name}`,
    }),
    updateUser: builder.mutation({
      query: ({
        username,
        newUserData,
      }: {
        username: string;
        newUserData: Partial<IUser>;
      }) => ({
        url: `users/${username}`,
        method: "PUT",
        body: newUserData,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (username) => ({
        url: `users/${username}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (body: IUserWithPassword) => ({
        url: `users/createUser`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUserByNameQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
} = usersApi;
