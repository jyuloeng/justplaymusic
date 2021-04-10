import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { tuple } from "../../lib/type";

export interface User {
  userId?: number;
  nickname?: string;
  userType?: number;
  vipType?: number;
  avatarUrl?: string;
}

const LoginModeTypes = tuple("account", "search", "");
type LoginModeType = typeof LoginModeTypes[number];

interface UserState {
  user?: User | null;
  likedList?: any[];
  token?: string;
  cookie?: string;
  loginMode?: LoginModeType;
}

const initialState: UserState = {
  user: null,
  likedList: [],
  token: "",
  cookie: "",
  loginMode: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setLikedList: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        likedList: action.payload,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    setCookie: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        cookie: action.payload,
      };
    },
    setLoginMode: (state, action: PayloadAction<LoginModeType>) => {
      return {
        ...state,
        loginMode: action.payload,
      };
    },
  },
});

export const {
  setUser,
  setLikedList,
  setToken,
  setCookie,
  setLoginMode,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.userReducer.user;
export const selectLikedList = (state: RootState) =>
  state.userReducer.likedList;
export const selectToken = (state: RootState) => state.userReducer.token;
export const selectCookie = (state: RootState) => state.userReducer.cookie;
export const selectLoginMode = (state: RootState) =>
  state.userReducer.loginMode;

export default userSlice.reducer;
