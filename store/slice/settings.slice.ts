import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { tuple, tupleNum } from "../../lib/type";

const LanguageTypes = tuple("zh", "en");
export type LanguageType = typeof LanguageTypes[number];

const StyleTypes = tuple("auto", "light", "dark");
export type StyleType = typeof StyleTypes[number];

const QualityTypes = tuple("128", "192", "320", "flac");
export type QualityType = typeof QualityTypes[number];

const LyricsBackgroundTypes = tuple("auto", "blur");
export type LyricsBackgroundType = typeof LyricsBackgroundTypes[number];

const LyricsSizeTypes = tupleNum(17, 20, 24, 30);
export type LyricsSizeType = typeof LyricsSizeTypes[number];

interface SettingsState {
  language?: LanguageType;
  style?: StyleType;
  quality?: QualityType;
  lyricsTranslation?: boolean;
  lyricsBackground?: LyricsBackgroundType;
  lyricsSize?: LyricsSizeType;
  autoCacheSong?: boolean;
}

const initialState: SettingsState = {
  language: "zh",
  style: "auto",
  quality: "192",
  lyricsTranslation: false,
  lyricsBackground: "auto",
  lyricsSize: 20,
  autoCacheSong: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageType>) => {
      return {
        ...state,
        language: action.payload,
      };
    },
    setStyle: (state, action: PayloadAction<StyleType>) => {
      return {
        ...state,
        style: action.payload,
      };
    },
    setQuality: (state, action: PayloadAction<QualityType>) => {
      return {
        ...state,
        quality: action.payload,
      };
    },
    setLyricsTranslation: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        lyricsTranslation: action.payload,
      };
    },
    setLyricsBackground: (
      state,
      action: PayloadAction<LyricsBackgroundType>
    ) => {
      return {
        ...state,
        lyricsBackground: action.payload,
      };
    },
    setLyricsSize: (state, action: PayloadAction<LyricsSizeType>) => {
      return {
        ...state,
        lyricsSize: action.payload,
      };
    },
    setAutoCacheSong: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        autoCacheSong: action.payload,
      };
    },
  },
});

export const {
  setLanguage,
  setStyle,
  setQuality,
  setLyricsTranslation,
  setLyricsBackground,
  setLyricsSize,
  setAutoCacheSong,
} = settingsSlice.actions;

export const selectLanguage = (state: RootState) =>
  state.persistedReducer.settingsReducer.language;
export const selectStyle = (state: RootState) =>
  state.persistedReducer.settingsReducer.style;
export const selectQuality = (state: RootState) =>
  state.persistedReducer.settingsReducer.quality;
export const selectLyricsTranslation = (state: RootState) =>
  state.persistedReducer.settingsReducer.lyricsTranslation;
export const selectLyricsBackground = (state: RootState) =>
  state.persistedReducer.settingsReducer.lyricsBackground;
export const selectLyricsSize = (state: RootState) =>
  state.persistedReducer.settingsReducer.lyricsSize;
export const selectAutoCacheSong = (state: RootState) =>
  state.persistedReducer.settingsReducer.autoCacheSong;

export default settingsSlice.reducer;
