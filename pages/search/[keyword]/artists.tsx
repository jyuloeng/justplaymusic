import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { AvatarCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";

export interface SearchKeywordArtistsProps {}

const SearchKeywordArtists: React.FC<SearchKeywordArtistsProps> = () => {
  const { query, isReady } = useRouter();
  const [searchArtistsRes, setSearchArtistsRes] = useState<{
    hasMore?: boolean;
    artistCount?: number;
    artists?: any[];
  }>(null);

  useEffect(() => {
    if (isReady) {
      const { keyword } = query;
      fetch(
        `https://music.qier222.com/api/search?keywords=${keyword}&type=100&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
      )
        .then((res) => res.json())
        .then((data) => {
          const { result } = data;
          setSearchArtistsRes(result);
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
