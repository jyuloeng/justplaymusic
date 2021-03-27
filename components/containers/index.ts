import tw from "twin.macro";

export { default as ViewMoreCommonContainer } from "./view-more-common-container";
export { default as LoadingContainer } from "./loading-container";
export { default as ErrorContainer } from "./error-container";
export { default as PlaylistsLoadingContainer } from "./playlists-loading-container";
export { default as ArtistsLoadingContainer } from "./artists-loading-container";
export { default as MobileArtistsLoadingContainer } from "./mobile-artists-loading-container";
export { default as MVsLoadingContainer } from "./mvs-loading-container";
export { default as PlaylistItemsLoadingContainer } from "./playlist-items-loading-container";
export { default as MiniPlaylistItemsLoadingContainer } from "./mini-playlist-items-loading-container";

export type { ViewMoreCommonContainerProps } from "./view-more-common-container";
export type { LoadingContainerProps } from "./loading-container";
export type { ErrorContainerProps } from "./error-container";
export type { PlaylistsLoadingContainerProps } from "./playlists-loading-container";
export type { ArtistsLoadingContainerProps } from "./artists-loading-container";
export type { MobileArtistsLoadingContainerProps } from "./mobile-artists-loading-container";
export type { MVsLoadingContainerProps } from "./mvs-loading-container";
export type { PlaylistItemsLoadingContainerProps } from "./playlist-items-loading-container";
export type { MiniPlaylistItemsLoadingContainerProps } from "./mini-playlist-items-loading-container";

export const BaseSkeletonStyles = tw`bg-background rounded-md`;
