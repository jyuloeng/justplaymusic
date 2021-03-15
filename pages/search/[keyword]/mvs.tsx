import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";

export interface SearchKeywordMvsProps {}

const SearchKeywordMvs: React.FC<SearchKeywordMvsProps> = () => {
  const { query, isReady } = useRouter();
  const [searchMvsResult, setSearchMvsRes] = useState<{
    mvCount?: number;
    mvs?: any[];
  }>(null);

  useEffect(() => {
    if (isReady) {
      const { keyword } = query;
      fetch(
        `https://music.qier222.com/api/search?keywords=${keyword}&type=1004&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
      )
        .then((res) => res.json())
        .then((data) => {
          const { result } = data;
          setSearchMvsRes(result);
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
            searchPrevText="搜索MV"
          />
        }
        cols={2}
        mdCols={4}
        isShowLoadMore={searchMvsResult?.mvCount > searchMvsResult?.mvs?.length}
      >
        {searchMvsResult?.mvs?.map((mv) => (
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
