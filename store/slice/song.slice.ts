import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { tuple } from "../../lib/type";
import { useQuery } from "react-query";
import request from "../../lib/request";

const PlayModeTypes = tuple("repeat", "shuffle");
type PlayModeType = typeof PlayModeTypes[number];

const PlayStatusTypes = tuple("play", "pause", "playing");
type PlayStatusType = typeof PlayStatusTypes[number];

interface SongState {
  songlist?: any[];
  currentSong?: any;
  current?: number;
  shuffledPlayQuene?: number[];
  shuffledPlayCurrent?: number;
  playMode?: PlayModeType;
  playStatus?: PlayStatusType;
  volume?: number; //  [0, 1]
  volumeBeforeMute?: number;
  mute?: boolean;
}

const initialState: SongState = {
  songlist: [],
  currentSong: {},
  current: 0,
  shuffledPlayQuene: [0],
  shuffledPlayCurrent: 0,
  playMode: "repeat",
  playStatus: "playing",
  volume: 0.5,
  volumeBeforeMute: 0.5,
  mute: false,
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSonglist: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        songlist: action.payload,
      };
    },
    setCurrentSong: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        currentSong: action.payload,
      };
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        current: action.payload,
      };
    },
    setShuffledPlayQuene: (state, action: PayloadAction<number[]>) => {
      return {
        ...state,
        shuffledPlayQuene: action.payload,
      };
    },
    setShuffledCurrent: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        shuffledPlayCurrent: action.payload,
      };
    },
    setPlayMode: (state, action: PayloadAction<PlayModeType>) => {
      return {
        ...state,
        playMode: action.payload,
      };
    },
    setPlayStatus: (state, action: PayloadAction<PlayStatusType>) => {
      return {
        ...state,
        playStatus: action.payload,
      };
    },
    setVolume: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        volume: action.payload,
      };
    },
    setVolumeBeforeMute: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        volumeBeforeMute: action.payload,
      };
    },
    setMute: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        mute: action.payload,
      };
    },
  },
});

export const {
  setSonglist,
  setCurrentSong,
  setCurrent,
  setShuffledPlayQuene,
  setShuffledCurrent,
  setPlayMode,
  setPlayStatus,
  setVolume,
  setVolumeBeforeMute,
  setMute,
} = songSlice.actions;

export const selectSonglist = (state: RootState) =>
  state.persistedReducer.songReducer.songlist;

export const selectCurrentSong = (state: RootState) =>
  state.persistedReducer.songReducer.currentSong;

export const selectCurrent = (state: RootState) =>
  state.persistedReducer.songReducer.current;

export const selectShuffledPlayQuene = (state: RootState) =>
  state.persistedReducer.songReducer.shuffledPlayQuene;

export const selectShuffledCurrent = (state: RootState) =>
  state.persistedReducer.songReducer.shuffledPlayCurrent;

export const selectPlayMode = (state: RootState) =>
  state.persistedReducer.songReducer.playMode;

export const selectPlayStatus = (state: RootState) =>
  state.persistedReducer.songReducer.playStatus;

export const selectVolume = (state: RootState) =>
  state.persistedReducer.songReducer.volume;

export const selectVolumeBeforeMute = (state: RootState) =>
  state.persistedReducer.songReducer.volumeBeforeMute;

export const selectMute = (state: RootState) =>
  state.persistedReducer.songReducer.mute;

export const getCurrentSong = () => (dispatch: AppDispatch) =>
  request
    .get("https://music.qier222.com/api/song/url?id=33894312")
    .then((res) => {
      dispatch(setCurrentSong(res.data.data));
    });

export default songSlice.reducer;
