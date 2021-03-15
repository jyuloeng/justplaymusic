import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";

export interface SearchKeywordPlaylistsProps {}

const SearchKeywordPlaylists: React.FC<SearchKeywordPlaylistsProps> = () => {
  const { query, isReady } = useRouter();

  const [searchPlaylistsRes, setSearchPlaylistsRes] = useState<{
    hasMore?: boolean;
    playlistCount?: number;
    playlists?: any[];
  }>(null);

  useEffect(() => {
    if (isReady) {
      const { keyword } = query;
      fetch(
        `https://music.qier222.com/api/search?keywords=${keyword}&type=1000&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
      )
        .then((res) => res.json())
        .then((data) => {
          const { result } = data;
          setSearchPlaylistsRes(result);
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
            searchPrevText="搜索歌单"
          />
        }
        isShowLoadMore={searchPlaylistsRes?.hasMore}
      >
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
      </ViewMoreCommonContainer>
    </Container>
  );
};

export default SearchKeywordPlaylists;

const Container = styled.div(() => []);
