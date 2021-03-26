import React, { useState } from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { MediaCard } from "../../components/cards";
import { TitleBoard, CaptionBoard } from "../../components/boards";
import { PlaylistsLoadingContainer } from "../../components/containers";
import { useToplist } from "../../hooks";

export interface RankingProps {}

const Ranking: React.FC<RankingProps> = () => {
  const { t } = useTranslation("ranking");
  const router = useRouter();
  const { globalRankList, officialRankList, isLoading, data } = useToplist();

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title={t("title")} info={t("subtitle")} />
      </TitleBoardContainer>

      <CaptionBoardContainer>
        <CaptionBoard caption={t("official-list")} />
      </CaptionBoardContainer>

      {isLoading ? (
        <PlaylistsLoadingContainer rows={1} isOverflow={false} />
      ) : (
        <PlaylistContainer>
          {officialRankList?.map((ranklist) => (
            <MediaCard
              key={ranklist.id}
              href={`/playlist/${ranklist.id}`}
              cardType="album"
              coverPath={ranklist.coverImgUrl + "?param=512y512"}
              title={ranklist.name}
              caption={ranklist.updateFrequency}
              playCount={ranklist.playCount}
              isCanCaptionClick={false}
              onTitleClick={() => router.push(`/playlist/${ranklist.id}`)}
            />
          ))}
        </PlaylistContainer>
      )}

      <CaptionBoardContainer>
        <CaptionBoard caption={t("global-list")} />
      </CaptionBoardContainer>

      {isLoading ? (
        <PlaylistsLoadingContainer rows={4} isOverflow={false} />
      ) : (
        <PlaylistContainer>
          {globalRankList?.map((ranklist) => (
            <MediaCard
              key={ranklist.id}
              href={`/playlist/${ranklist.id}`}
              cardType="album"
              coverPath={ranklist.coverImgUrl + "?param=512y512"}
              title={ranklist.name}
              caption={ranklist.updateFrequency}
              playCount={ranklist.playCount}
              isCanCaptionClick={false}
              onTitleClick={() => router.push(`/playlist/${ranklist.id}`)}
            />
          ))}
        </PlaylistContainer>
      )}
    </Container>
  );
};

export default Ranking;

const PlaylistContainer = styled.div(() => [
  tw`grid grid-cols-3 md:grid-cols-5  
  gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 
  gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12
  mx-3 lg:mx-7`,
]);

const CaptionBoardContainer = styled.div(() => [
  tw`flex justify-between items-center 
    mt-2 lg:mt-7 mx-2 lg:mx-7 mb-3 lg:mb-6`,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => [tw``]);
