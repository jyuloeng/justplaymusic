import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";
import { useReady } from "../../../hooks";

export interface SearchKeywordAlbumsProps {}

const SearchKeywordAlbums: React.FC<SearchKeywordAlbumsProps> = () => {
  const [searchAlbumsRes, setSearchAlbumsRes] = useState<{
    albumCount?: number;
    albums?: any[];
  }>(null);

  const { query } = useReady((router) => {
    fetch(
      `https://music.qier222.com/api/search?keywords=${router.query.keyword}&type=10&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
    )
      .then((res) => res.json())
      .then((data) => {
        const { result } = data;
        setSearchAlbumsRes(result);
      });
  });

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={
          <TitleBoard
            type="search"
            title={query.keyword}
            searchPrevText="搜索专辑"
          />
        }
        isShowLoadMore={
          searchAlbumsRes?.albumCount > searchAlbumsRes?.albums?.length
        }
      >
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
      </ViewMoreCommonContainer>
    </Container>
  );
};

export default SearchKeywordAlbums;

const Container = styled.div(() => []);
