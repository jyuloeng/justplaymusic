import React from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { TitleBoard, CaptionBoard } from "../../../components/boards";
import {
  MiniPlaylistItemCard,
  MediaCard,
  AvatarCard,
} from "../../../components/cards";
import { scrollbarHiddenStyles } from "../../index";
import {
  useSearchArtists,
  useSearchAlbums,
  useSearchMVs,
  useSearchPlaylists,
  useSearchSongs,
} from "../../../hooks";
import {
  ArtistsLoadingContainer,
  MiniPlaylistItemsLoadingContainer,
  MVsLoadingContainer,
  PlaylistsLoadingContainer,
} from "../../../components/containers";

export interface SearchKeywordProps {}

const SearchKeyword: React.FC<SearchKeywordProps> = () => {
  const { t } = useTranslation("search");
  const router = useRouter();

  const {
    searchArtistsRes,
    isLoading: isSearchArtistsLoading,
  } = useSearchArtists({
    keywords: router.query.keyword as string,
    limit: 6,
  });

  const { searchAlbumsRes, isLoading: isSearchAlbumsLoading } = useSearchAlbums(
    {
      keywords: router.query.keyword as string,
      limit: 12,
    }
  );

  const { searchSongsRes, isLoading: isSearchSongsLoading } = useSearchSongs({
    keywords: router.query.keyword as string,
    limit: 16,
  });

  const { searchMVsRes, isLoading: isSearchMVsLoading } = useSearchMVs({
    keywords: router.query.keyword as string,
    limit: 4,
  });

  const {
    searchPlaylistsRes,
    isLoading: isSearchPlaylistsLoading,
  } = useSearchPlaylists({
    keywords: router.query.keyword as string,
    limit: 12,
  });

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard
          type="search"
          title={router.query.keyword}
          searchPrevText={t("title")}
          info={t("subtitle")}
        />
      </TitleBoardContainer>
      <CaptionBoardContainer>
        <CaptionBoard
          caption={t("artists")}
          moreText={
            searchArtistsRes?.hasMore
              ? t("see-all-count-artists", {
                  count: searchArtistsRes?.artistCount,
                })
              : ""
          }
          onMoreClick={() =>
            router.push(`/search/${router.query.keyword}/artists`)
          }
        />
      </CaptionBoardContainer>

      <SearchSimilarArtistsWrapper>
        {isSearchArtistsLoading ? (
          <ArtistsLoadingContainer rows={1} />
        ) : (
          <SearchSimilarArtistsContainer>
            {searchArtistsRes?.artists?.map((artist) => (
              <AvatarCard
                key={artist.id}
                id={artist.id}
                src={artist.picUrl + "?param=512y512"}
                caption={artist.name}
              />
            ))}
          </SearchSimilarArtistsContainer>
        )}
      </SearchSimilarArtistsWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption={t("albums")}
          moreText={
            searchAlbumsRes?.albumCount > 6
              ? t("see-all-count-albums", {
                  count: searchAlbumsRes?.albumCount,
                })
              : ""
          }
          onMoreClick={() =>
            router.push(`/search/${router.query.keyword}/albums`)
          }
        />
      </CaptionBoardContainer>

      <SearchPlaylistsWrapper>
        {isSearchAlbumsLoading ? (
          <PlaylistsLoadingContainer cols={6} />
        ) : (
          <SearchPlaylistsContainer>
            {searchAlbumsRes?.albums?.map((album) => (
              <MediaCard
                key={album.id}
                href={`/album/${album.id}`}
                cardType="album"
                coverPath={album.picUrl + "?param=512y512"}
                title={album.name}
                caption={album.artist.name}
                isShowPlayCount={false}
              />
            ))}
          </SearchPlaylistsContainer>
        )}
      </SearchPlaylistsWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption={t("songs")}
          moreText={
            searchSongsRes?.hasMore
              ? t("see-all-count-songs", { count: searchSongsRes?.songCount })
              : ""
          }
          onMoreClick={() =>
            router.push(`/search/${router.query.keyword}/tracks`)
          }
        />
      </CaptionBoardContainer>

      <SearchSongsContainer>
        {isSearchSongsLoading || !searchSongsRes ? (
          <MiniPlaylistItemsLoadingContainer rows={4} />
        ) : (
          <SearchSongs>
            {searchSongsRes?.songs?.map((song, index) => (
              <MiniPlaylistItemCard
                key={song.id}
                itemType={
                  index === 0 ? "active" : index === 3 ? "disabled" : "default"
                }
                coverPath={song.al.picUrl + "?param=100y100"}
                name={song.name}
                artists={song.ar}
                isShowHover={true}
                onDblClick={(e, id) => console.log(e, id)}
              />
            ))}
          </SearchSongs>
        )}
      </SearchSongsContainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption={t("playlists")}
          moreText={
            searchPlaylistsRes?.hasMore
              ? t("see-all-count-playlists", {
                  count: searchPlaylistsRes?.playlistCount,
                })
              : ""
          }
          onMoreClick={() =>
            router.push(`/search/${router.query.keyword}/playlists`)
          }
        />
      </CaptionBoardContainer>

      <SearchPlaylistsWrapper>
        {isSearchPlaylistsLoading ? (
          <PlaylistsLoadingContainer cols={6} />
        ) : (
          <SearchPlaylistsContainer>
            {searchPlaylistsRes?.playlists?.map((playlist) => (
              <MediaCard
                key={playlist.id}
                href={`/playlist/${playlist.id}`}
                cardType="album"
                coverPath={playlist.coverImgUrl + "?param=512y512"}
                title={playlist.name}
                caption={playlist.description}
                isShowPlayCount={false}
                isCanCaptionClick={false}
              />
            ))}
          </SearchPlaylistsContainer>
        )}
      </SearchPlaylistsWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="Music Videos"
          moreText={
            searchMVsRes?.mvCount > 4
              ? t("see-all-count-mvs", { count: searchMVsRes?.mvCount })
              : ""
          }
          onMoreClick={() => router.push(`/search/${router.query.keyword}/mvs`)}
        />
      </CaptionBoardContainer>

      <SearchMvsWrapper>
        {isSearchMVsLoading ? (
          <MVsLoadingContainer />
        ) : (
          <SearchMvsContainer>
            {searchMVsRes?.mvs?.map((mv) => (
              <MediaCard
                key={mv.id}
                href={`/mv/${mv.id}`}
                cardType="mv"
                coverPath={mv.cover + "?param=464y260"}
                title={mv.name}
                caption={mv.artistName}
                playCount={mv.playCount}
              />
            ))}
          </SearchMvsContainer>
        )}
      </SearchMvsWrapper>
    </Container>
  );
};

export default SearchKeyword;

const SearchMvsContainer = styled.div(() => [
  tw`grid grid-cols-4 gap-2 lg:gap-6 pr-3 lg:pr-0`,
  css`
    @media (max-width: 767px) {
      width: 1114px;
    }
  `,
]);

const SearchMvsWrapper = styled.div(() => [
  scrollbarHiddenStyles,
  tw`pl-3 lg:pl-0 lg:mx-7 overflow-x-scroll md:overflow-visible`,
]);

const SearchPlaylistsContainer = styled.div(() => [
  tw`grid grid-cols-10 md:grid-cols-6 
    gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 
    gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12
    md:w-full pr-3 lg:pr-0`,
  css`
    width: 1280px;
  `,
]);

const SearchPlaylistsWrapper = styled.div(() => [
  scrollbarHiddenStyles,
  tw`pl-3 lg:pl-0 lg:mx-7 overflow-x-scroll lg:overflow-visible`,
]);

const SearchSongs = styled.div(() => [
  tw`grid grid-cols-4 gap-2 md:w-full ml-3 md:ml-0 pr-3 md:pr-0`,
  css`
    width: 800px;
  `,
]);

const SearchSongsContainer = styled.div(() => [
  scrollbarHiddenStyles,
  tw`lg:mx-5 overflow-x-scroll`,
]);

const SearchSimilarArtistsContainer = styled(SearchPlaylistsContainer)(() => [
  tw`grid-cols-6 md:grid-cols-6 pr-3 lg:pr-0`,
  css`
    width: 652px;
  `,
]);

const SearchSimilarArtistsWrapper = styled(SearchPlaylistsWrapper)(() => [
  tw`ml-0 pl-3 lg:pl-0`,
]);

const CaptionBoardContainer = styled.div(() => [
  tw`flex justify-between items-center 
    mt-2 lg:mt-7 mx-2 lg:mx-7 mb-3 lg:mb-6`,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => [tw`pb-4 md:pb-12`]);
