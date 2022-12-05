import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

// Types
import { RootState } from "src/store";

// Consts
import { API_URL } from "@config/consts";

// Slices
import { AuthActions } from "@auth/store/slice";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult: any = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      api.dispatch(AuthActions.setAccessToken(refreshResult.data.access_token));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(AuthActions.logout());
    }
  }
  return result;
};
