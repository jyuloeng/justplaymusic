import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";
import { useSearchMVs } from "../../../hooks";

export interface SearchKeywordMvsProps {}

const SearchKeywordMvs: React.FC<SearchKeywordMvsProps> = () => {
  const { query } = useRouter();

  const { searchMVsRes } = useSearchMVs({
    keywords: query.keyword as string,
  });

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={
          <TitleBoard
            type="search"
            title={query.keyword}
            searchPrevText="搜索MV"
          />
        }
        cols={2}
        mdCols={4}
        isShowLoadMore={searchMVsRes?.mvCount > searchMVsRes?.mvs?.length}
      >
        {searchMVsRes?.mvs?.map((mv) => (
          <MediaCard
            key={mv.id}
            cardType="mv"
            coverPath={mv.cover + "?param=464y260"}
            title={mv.name}
            caption={mv.artistName}
            playCount={mv.playCount}
          />
        ))}
      </ViewMoreCommonContainer>
    </Container>
  );
};

export default SearchKeywordMvs;

const Container = styled.div(() => []);
