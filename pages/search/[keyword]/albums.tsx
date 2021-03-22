import React from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";
import { useSearchAlbums } from "./../../../hooks";
import { useRouter } from "next/router";

export interface SearchKeywordAlbumsProps {}

const SearchKeywordAlbums: React.FC<SearchKeywordAlbumsProps> = () => {
  const { t } = useTranslation("search");
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
            searchPrevText={t("search-type-album")}
          />
        }
        isShowLoadMore={
          searchAlbumsRes?.albumCount > searchAlbumsRes?.albums?.length
        }
      >
        {searchAlbumsRes?.albums?.map((album) => (
          <MediaCard
            key={album.id}
            href={`/album/${album.id}`}
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
