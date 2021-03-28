import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { AvatarCard } from "../../../components/cards";
import {
  ArtistsLoadingContainer,
  ViewMoreCommonContainer,
} from "../../../components/containers";
import { useSearchArtists } from "./../../../hooks";

export interface SearchKeywordArtistsProps {}

const SearchKeywordArtists: React.FC<SearchKeywordArtistsProps> = () => {
  const { t } = useTranslation("search");
  const { query } = useRouter();

  const { searchArtistsRes, isLoading } = useSearchArtists({
    keywords: query.keyword as string,
  });

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={
          <TitleBoard
            type="search"
            title={query.keyword}
            searchPrevText={t("search-type-artist")}
          />
        }
        isShowLoadMore={searchArtistsRes?.hasMore}
        footer={isLoading && <ArtistsLoadingContainer rows={4} />}
      >
        {searchArtistsRes?.artists?.map((artist) => (
          <AvatarCard
            key={artist.id}
            id={artist.id}
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
