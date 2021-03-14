import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";

import { useRouter } from "next/router";
import { MediaCard } from "../../components/cards";
import { TitleBoard, CaptionBoard } from "../../components/boards";
import { Button } from "../../components/buttons";
import { MainText, CaptionText } from "../../styles/typography";
import { IconLoading } from "../../styles/icons";

export interface PlaylistProps {}

const coverPath =
  "https://p2.music.126.net/2Ctl_VC8ZzxIiitZQFyy3A==/109951163966538110.jpg?param=512y512";

const hotPlaylistMenu = [
  {
    name: "推荐歌单",
  },
  {
    name: "精品歌单",
  },
  {
    name: "官方歌单",
  },
  {
    name: "华语",
  },
  {
    name: "流行",
  },
  {
    name: "摇滚",
  },
  {
    name: "民谣",
  },
  {
    name: "电子",
  },
];

const Playlist: React.FC<PlaylistProps> = () => {
  const router = useRouter();

  const [personalizedPlaylist, setPersonalizedPlaylist] = useState([]);
  const handleMorePlaylistClick = () => {};

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/personalized?limit=10&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => setPersonalizedPlaylist(data.result));
  }, []);

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title="歌单" info="看看今天有什么新的歌单吧~" />
      </TitleBoardContainer>

      <CaptionBoardContainer>
        <Button isShowHover={false} onClick={handleMorePlaylistClick}>
          <MainText bold>全部歌单</MainText>
        </Button>
        <Buttons>
          {hotPlaylistMenu.map((menu) => (
            <Button key={menu.name}>
              <CaptionText bold>{menu.name}</CaptionText>
            </Button>
          ))}
        </Buttons>
      </CaptionBoardContainer>

      <MobileCaptionBoardContainer>
        <CaptionBoard
          caption="全部歌单"
          moreText="更多"
          onMoreClick={handleMorePlaylistClick}
        />
      </MobileCaptionBoardContainer>

      <PlaylistContainer>
        {personalizedPlaylist?.map((playlist) => (
          <MediaCard
            key={playlist.id}
            cardType="album"
            coverPath={playlist.picUrl + "?param=512y512"}
            title={playlist.name}
            caption={playlist.copywriter}
            playCount={playlist.playCount}
            isCanCaptionClick={false}
          />
        ))}
      </PlaylistContainer>

      <LoadMoreContainer>
        <Button icon={<IconLoading />}>
          <CaptionText bold>加载更多</CaptionText>
        </Button>
      </LoadMoreContainer>
    </Container>
  );
};

export default Playlist;

const LoadMoreContainer = styled.div(() => [tw`flex justify-center w-full my-5 md:my-6`]);

const PlaylistContainer = styled.div(() => [
  tw`grid grid-cols-3 md:grid-cols-5 gap-2 lg:gap-6 mx-3 lg:mx-7`,
]);

const MobileCaptionBoardContainer = styled.div(() => [
  tw`block md:hidden mt-2 lg:mt-7 mx-2 lg:mx-7 mb-3 lg:mb-6`,
]);

const Buttons = styled.div(() => [tw`flex`]);

const CaptionBoardContainer = styled.div(() => [
  tw`hidden md:flex justify-between items-center 
    mt-2 lg:mt-7 mx-2 lg:mx-7 mb-3 lg:mb-6`,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => []);
