import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import {
  MVsLoadingContainer,
  ViewMoreCommonContainer,
} from "../../../components/containers";
import { useSearchMVs } from "../../../hooks";

export interface SearchKeywordMvsProps {}

const SearchKeywordMvs: React.FC<SearchKeywordMvsProps> = () => {
  const { t } = useTranslation("search");
  const { query } = useRouter();

  const { searchMVsRes, isLoading } = useSearchMVs({
    keywords: query.keyword as string,
  });

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={
          <TitleBoard
            type="search"
            title={query.keyword}
            searchPrevText={t("search-type-mv")}
          />
        }
        cols={2}
        mdCols={4}
        isShowLoadMore={searchMVsRes?.mvCount > searchMVsRes?.mvs?.length}
        footer={
          isLoading && <MVsLoadingContainer isNeedMarginX={false} rows={4} />
        }
      >
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
      </ViewMoreCommonContainer>
    </Container>
  );
};

export default SearchKeywordMvs;

const Container = styled.div(() => []);
