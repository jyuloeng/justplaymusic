import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";
import { useArtistMV } from "../../../hooks";

export interface ArtistIdMvsProps {}

const ArtistIdMvs: React.FC<ArtistIdMvsProps> = () => {
  const { query } = useRouter();

  const { data: searchMvsResult, isLoading: isMVLoading } = useArtistMV({
    id: query.id as string,
    limit: 24,
  });

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={
          searchMvsResult?.mvs?.length > 0 && (
            <TitleBoard
              title={searchMvsResult?.mvs[0]?.artistName + " 's Music Video"}
            />
          )
        }
        cols={2}
        mdCols={4}
        isShowLoadMore={searchMvsResult?.hasMore}
      >
        {searchMvsResult?.mvs?.map((mv) => (
          <MediaCard
            key={mv.id}
            href={`/mv/${mv.id}`}
            cardType="mv"
            coverPath={mv.imgurl16v9 + "?param=464y260"}
            title={mv.name}
            caption={mv.artistName}
            playCount={mv.playCount}
          />
        ))}
      </ViewMoreCommonContainer>
    </Container>
  );
};

export default ArtistIdMvs;

const Container = styled.div(() => []);
