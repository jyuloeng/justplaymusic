import React from "react";
import tw, { styled, css } from "twin.macro";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";
import { useSearchAlbums } from "./../../../hooks";
import { useRouter } from "next/router";

export interface SearchKeywordAlbumsProps {}

const SearchKeywordAlbums: React.FC<SearchKeywordAlbumsProps> = () => {
  const { query } = useRouter();

  const { searchAlbumsRes } = useSearchAlbums({
    keywords: query.keyword as string,
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
