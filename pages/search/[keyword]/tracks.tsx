import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { PlaylistItemCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";

export interface SearchKeywordTracksProps {}

const SearchKeywordTracks: React.FC<SearchKeywordTracksProps> = () => {
  const { query, isReady } = useRouter();
  const [searchSongsRes, setSearchSongsRes] = useState<{
    hasMore?: boolean;
    songCount?: number;
    songs?: any[];
  }>(null);

  useEffect(() => {
    if (isReady) {
      const { keyword } = query;
      fetch(
        `https://music.qier222.com/api/search?keywords=${keyword}&type=1&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
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
    }
  }, [isReady]);

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={
          <TitleBoard
            type="search"
            title={query.keyword}
            searchPrevText="搜索歌曲"
          />
        }
        cols={1}
        mdCols={1}
        gap={0}
        lgGap={0}
        isShowLoadMore={searchSongsRes?.hasMore}
      >
        {searchSongsRes?.songs &&
          searchSongsRes?.songs?.map((song, index) => (
            <PlaylistItemCard
              key={song.id}
              itemType={
                index === 0 ? "active" : index === 3 ? "disabled" : "default"
              }
              coverPath={song.al.picUrl + "?param=100y100"}
              index={index + 1}
              name={song.name}
              artists={song.ar}
              album={song.al.name}
              duration={song.dt}
              isLike={false}
            />
          ))}
      </ViewMoreCommonContainer>
    </Container>
  );
};

export default SearchKeywordTracks;

const Container = styled.div(() => []);
