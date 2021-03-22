import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface User {
  userId?: number;
  nickname?: string;
  userType?: number;
  vipType?: number;
  avatarUrl?: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
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
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.userReducer.user;

export default userSlice.reducer;
