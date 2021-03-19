import React from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { MediaCard } from "../../components/cards";
import { TitleBoard, CaptionBoard } from "../../components/boards";
import { useToplist } from "../../hooks";

export interface RankingProps {}

const Ranking: React.FC<RankingProps> = () => {
  const router = useRouter();
  const { globalRankList, officialRankList, isLoading, data } = useToplist();

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title="排行榜" info="有你喜欢的ta在榜上吗~" />
      </TitleBoardContainer>

      <CaptionBoardContainer>
        <CaptionBoard caption="官方榜" />
      </CaptionBoardContainer>

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

      <CaptionBoardContainer>
        <CaptionBoard caption="全球榜" />
      </CaptionBoardContainer>

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
    </Container>
  );
};

export default Ranking;

const PlaylistContainer = styled.div(() => [
  tw`grid grid-cols-3 md:grid-cols-5 gap-2 lg:gap-6 mx-3 lg:mx-7`,
]);

const CaptionBoardContainer = styled.div(() => [
  tw`flex justify-between items-center 
    mt-2 lg:mt-7 mx-2 lg:mx-7 mb-3 lg:mb-6`,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => [tw``]);
