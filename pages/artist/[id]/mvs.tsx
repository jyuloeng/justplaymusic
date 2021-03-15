import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../../components/boards";
import { MediaCard } from "../../../components/cards";
import { ViewMoreCommonContainer } from "../../../components/containers";

export interface ArtistIdMvsProps {}

const ArtistIdMvs: React.FC<ArtistIdMvsProps> = () => {
  const { query, isReady } = useRouter();
  const [searchMvsResult, setSearchMvsResult] = useState<{
    code?: number;
    hasMore?: boolean;
    mvs?: any[];
  }>(null);

  useEffect(() => {
    if (isReady) {
      const { id } = query;

      fetch(
        `https://music.qier222.com/api/artist/mv?id=${id}&limit=16&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchMvsResult(data);
        });
    }
  }, [isReady]);

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
