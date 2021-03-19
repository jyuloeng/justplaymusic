import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { AvatarCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";
import { useSearchArtists } from "./../../../hooks";

export interface SearchKeywordArtistsProps {}

const SearchKeywordArtists: React.FC<SearchKeywordArtistsProps> = () => {
  const { query } = useRouter();

  const { searchArtistsRes } = useSearchArtists({
    keywords: query.keyword as string,
  });

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={
          <TitleBoard
            type="search"
            title={query.keyword}
            searchPrevText="搜索歌手"
          />
        }
        isShowLoadMore={searchArtistsRes?.hasMore}
      >
        {searchArtistsRes?.artists?.map((artist) => (
          <AvatarCard
            key={artist.id}
            src={artist.picUrl + "?param=512y512"}
            caption={artist.name}
          />
        ))}
      </ViewMoreCommonContainer>
    </Container>
  );
};

export default SearchKeywordArtists;

const Container = styled.div(() => []);
