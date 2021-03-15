import React, { useEffect, useState } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard, CaptionBoard } from "../../../components/boards";
import {
  MiniPlaylistItemCard,
  MediaCard,
  AvatarCard,
} from "../../../components/cards";
import { getSpecifiedArrayElements } from "../../../lib/array";
import { scrollbarHiddenStyles } from "../../index";

export interface SearchKeywordProps {}

const SearchKeyword: React.FC<SearchKeywordProps> = () => {
  const { query } = useRouter();

  const [searchArtistsRes, setSearchArtistsRes] = useState<{
    hasMore?: boolean;
    artistCount?: number;
    artists?: any[];
  }>(null);

  const [searchAlbumsRes, setSearchAlbumsRes] = useState<{
    albumCount?: number;
    albums?: any[];
  }>(null);

  const [searchSongsRes, setSearchSongsRes] = useState<{
    hasMore?: boolean;
    songCount?: number;
    songs?: any[];
  }>(null);

  const [searchMvsRes, setSearchMvsRes] = useState<{
    mvCount?: number;
    mvs?: any[];
  }>(null);

  const [searchPlaylistsRes, setSearchPlaylistsRes] = useState<{
    hasMore?: boolean;
    playlistCount?: number;
    playlists?: any[];
  }>(null);

  const handleAllMvs = () => {};

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/search?keywords=%E9%82%93%E7%B4%AB%E6%A3%8B&type=100&limit=6&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { result } = data;
        setSearchArtistsRes(result);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/search?keywords=%E9%82%93%E7%B4%AB%E6%A3%8B&type=10&limit=12&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { result } = data;
        setSearchAlbumsRes(result);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/search?keywords=%E9%82%93%E7%B4%AB%E6%A3%8B&type=1&limit=16&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { result } = data;
        const songids = [];
        result.songs.forEach((song) => {
          songids.push(song.id);
        });

        fetch(
          `https://music.qier222.com/api/song/detail?ids=${songids.join(",")}`
        )
          .then((res) => res.json())
          .then((songsData) => {
            setSearchSongsRes({
              hasMore: result.hasMore,
              songCount: result.songCount,
              songs: songsData.songs,
            });
          });
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/search?keywords=%E9%82%93%E7%B4%AB%E6%A3%8B&type=1004&limit=4&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { result } = data;
        setSearchMvsRes(result);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/search?keywords=%E9%82%93%E7%B4%AB%E6%A3%8B&type=1000&limit=12&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { result } = data;
        setSearchPlaylistsRes(result);
      });
  }, []);

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard
          type="search"
          title={query.keyword}
          info="看看有没有你想要的~"
        />
      </TitleBoardContainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="歌手"
          moreText={
            searchArtistsRes?.hasMore
              ? `查看全部 ${searchArtistsRes?.artistCount} 位歌手`
              : ""
          }
        />
      </CaptionBoardContainer>

      <SearchSimilarArtistsWrapper>
        <SearchSimilarArtistsContainer>
          {searchArtistsRes?.artists?.map((artist) => (
            <AvatarCard
              key={artist.id}
              src={artist.picUrl + "?param=512y512"}
              caption={artist.name}
            />
          ))}
        </SearchSimilarArtistsContainer>
      </SearchSimilarArtistsWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="专辑"
          moreText={
            searchAlbumsRes?.albumCount > 6
              ? `查看全部 ${searchAlbumsRes?.albumCount} 张专辑`
              : ""
          }
        />
      </CaptionBoardContainer>

      <SearchPlaylistsWrapper>
        <SearchPlaylistsContainer>
          {searchAlbumsRes?.albums?.map((album) => (
            <MediaCard
              key={album.id}
              cardType="album"
              coverPath={album.picUrl + "?param=512y512"}
              title={album.name}
              caption={album.artist.name}
              isShowPlayCount={false}
            />
          ))}
        </SearchPlaylistsContainer>
      </SearchPlaylistsWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="歌曲"
          moreText={
            searchSongsRes?.hasMore
              ? `查看全部 ${searchSongsRes?.songCount} 首歌曲`
              : ""
          }
        />
      </CaptionBoardContainer>

      <SearchSongsContainer>
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
      </SearchSongsContainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="歌单"
          moreText={
            searchPlaylistsRes?.hasMore
              ? `查看全部 ${searchPlaylistsRes?.playlistCount} 张歌单`
              : ""
          }
        />
      </CaptionBoardContainer>

      <SearchPlaylistsWrapper>
        <SearchPlaylistsContainer>
          {searchPlaylistsRes?.playlists?.map((playlist) => (
            <MediaCard
              key={playlist.id}
              cardType="album"
              coverPath={playlist.coverImgUrl + "?param=512y512"}
              title={playlist.name}
              caption={playlist.description}
              isShowPlayCount={false}
              isCanCaptionClick={false}
            />
          ))}
        </SearchPlaylistsContainer>
      </SearchPlaylistsWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="Music Video"
          moreText={
            searchMvsRes?.mvCount > 4
              ? `查看全部 ${searchMvsRes?.mvCount} 个Mvs`
              : ""
          }
          onMoreClick={handleAllMvs}
        />
      </CaptionBoardContainer>

      <SearchMvsWrapper>
        <SearchMvsContainer>
          {searchMvsRes?.mvs?.map((mv) => (
            <MediaCard
              key={mv.id}
              cardType="mv"
              coverPath={mv.cover + "?param=464y260"}
              title={mv.name}
              caption={mv.artistName}
              playCount={mv.playCount}
            />
          ))}
        </SearchMvsContainer>
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
  tw`grid grid-cols-10 md:grid-cols-6 gap-2 xl:gap-6 md:w-full pr-3 lg:pr-0`,
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

const Container = styled.div(() => []);
