import { createApi } from "@reduxjs/toolkit/query/react";

// Types
import { IUser } from "@common/types/User";
import { IUserCredentials } from "@auth/types/login";
import {
  ILoginErrorResponseDto,
  ILoginResponseDto,
  IRefreshTokenRequestDto,
  IRefreshTokenResponseDto,
} from "@api/types/AuthServiceDtos";

// Utils
import { baseQueryWithReauth } from "@common/utils/queries";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["User"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<
      ILoginResponseDto | ILoginErrorResponseDto,
      IUserCredentials
    >({
      query: (credentials) => {
        return {
          url: "auth/login",
          method: "POST",
          body: credentials,
        };
      },
    }),
    refreshToken: builder.mutation<
      IRefreshTokenResponseDto,
      IRefreshTokenRequestDto
    >({
      query: ({ refreshToken }) => {
        return {
          url: "auth/refresh",
          method: "POST",
          body: {
            refresh_token: refreshToken,
          },
        };
      },
    }),
    getUser: builder.query<IUser, string>({
      query: () => "auth/user",
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useGetUserQuery } =
  authApi;
