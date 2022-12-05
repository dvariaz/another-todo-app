import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { RootState } from "src/store";
import { IUser } from "@common/types/User";
import { IAuthTokens } from "@auth/store/slice.types";

interface IAuthState {
  userLogged: IUser | null;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// Initial States
const authInitialState: IAuthState = {
  userLogged: null,
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
};

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setUserLogged: (state, action: PayloadAction<IUser>) => {
      state.userLogged = action.payload;
    },
    setTokens: (state, action: PayloadAction<IAuthTokens>) => {
      state.tokens = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.tokens.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.tokens.refreshToken = action.payload;
    },
    logout: (state) => {
      state.userLogged = null;
      state.tokens.accessToken = "";
      state.tokens.refreshToken = "";
    },
  },
});

// Action creators
export const AuthActions = authSlice.actions;

// Selectors
export const AuthSelectors = {
  isLogged: (state: RootState) => !!state[authSlice.name].userLogged,
};
