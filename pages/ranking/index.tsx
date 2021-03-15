import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";

import { MediaCard } from "../../components/cards";
import { TitleBoard, CaptionBoard } from "../../components/boards";
import { getSpecifiedArrayElements } from "../../lib/array";

export interface RankingProps {}

const Ranking: React.FC<RankingProps> = () => {
  const [globalRankList, setGlobalRankList] = useState([]);
  const [officialrankList, setOfficialrankList] = useState([]);
  const handleMorePlaylistClick = () => {};

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/toplist?cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { list } = data;
        const gList = [];
        const oList = [];
        list.forEach((item) => {
          if (item.ToplistType) {
            oList.push(item);
          } else {
            gList.push(item);
          }
        });
        setGlobalRankList(gList);
        setOfficialrankList(oList);
      });
  }, []);

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title="排行榜" info="有你喜欢的ta在榜上吗~" />
      </TitleBoardContainer>

      <CaptionBoardContainer>
        <CaptionBoard caption="官方榜" />
      </CaptionBoardContainer>

      <PlaylistContainer>
        {officialrankList?.map((ranklist) => (
          <MediaCard
            key={ranklist.id}
            cardType="album"
            coverPath={ranklist.coverImgUrl + "?param=512y512"}
            title={ranklist.name}
            caption={ranklist.updateFrequency}
            playCount={ranklist.playCount}
            isCanCaptionClick={false}
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
            cardType="album"
            coverPath={ranklist.coverImgUrl + "?param=512y512"}
            title={ranklist.name}
            caption={ranklist.updateFrequency}
            playCount={ranklist.playCount}
            isCanCaptionClick={false}
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
