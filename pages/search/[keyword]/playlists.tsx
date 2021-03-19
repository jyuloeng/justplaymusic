import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";
import { useSearchPlaylists } from "./../../../hooks";

export interface SearchKeywordPlaylistsProps {}

const SearchKeywordPlaylists: React.FC<SearchKeywordPlaylistsProps> = () => {
  const { query } = useRouter();

  const { searchPlaylistsRes } = useSearchPlaylists({
    keywords: query.keyword as string,
  });

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
            href={`/playlist/${playlist.id}`}
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
