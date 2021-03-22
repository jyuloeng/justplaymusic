import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { MediaCard } from "../../components/cards";
import { TitleBoard, CaptionBoard } from "../../components/boards";
import { Button } from "../../components/buttons";
import { MainText, CaptionText } from "../../styles/typography";
import { IconLoading } from "../../styles/icons";
import { usePersonalizedPlaylist } from "../../hooks";

export interface PlaylistProps {}

const Playlist: React.FC<PlaylistProps> = () => {
  const { t } = useTranslation('playlist');

  const hotPlaylistMenu = [
    {
      name: t("recommended"),
    },
    {
      name: t("boutique"),
    },
    {
      name: t("official"),
    },
    {
      name: t("chinese"),
    },
    {
      name: t("popular"),
    },
    {
      name: t("rock"),
    },
    {
      name: t("ballad"),
    },
    {
      name: t("electronic"),
    },
  ];

  const router = useRouter();

  const [limit, setLimit] = useState(10);
  const handleMorePlaylistClick = () => {
    setLimit((value) => (value += 10));
  };

  const {
    personalizedPlaylist,
    setPersonalizedPlaylist,
    isLoading,
    error,
  } = usePersonalizedPlaylist(limit);

  return (
    <Container>
      <>
        <TitleBoardContainer>
          <TitleBoard title={t("title")} info={t("subtitle")} />
        </TitleBoardContainer>

        <CaptionBoardContainer>
          <Button isShowHover={false}>
            <MainText bold>{t("all")}</MainText>
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
            caption={t("all")}
            moreText={t("more")}
            onMoreClick={handleMorePlaylistClick}
          />
        </MobileCaptionBoardContainer>

        <PlaylistContainer>
          {personalizedPlaylist?.map((playlist) => (
            <MediaCard
              key={playlist.id}
              href={`/playlist/${playlist.id}`}
              cardType="album"
              coverPath={playlist.picUrl + "?param=512y512"}
              title={playlist.name}
              caption={playlist.copywriter}
              playCount={playlist.playCount}
              isCanCaptionClick={false}
              onTitleClick={() => router.push(`/playlist/${playlist.id}`)}
            />
          ))}
        </PlaylistContainer>

        <LoadMoreContainer>
          <Button icon={<IconLoading />} onClick={handleMorePlaylistClick}>
            <CaptionText bold>{t("load-more")}</CaptionText>
          </Button>
        </LoadMoreContainer>
      </>
    </Container>
  );
};

export default Playlist;

const LoadMoreContainer = styled.div(() => [
  tw`flex justify-center w-full my-5 md:my-6`,
]);

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
