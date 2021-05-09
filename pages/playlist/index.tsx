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
import { PlaylistsLoadingContainer } from "../../components/containers";
import { useTopPlaylist } from "../../hooks/playlist";

export interface PlaylistProps {}

const Playlist: React.FC<PlaylistProps> = () => {
  const { t } = useTranslation("playlist");

  const hotPlaylistMenu = [
    {
      cat: "推荐",
      name: t("recommended"),
    },
    // {
    //   cat: "精品",
    //   name: t("boutique"),
    // },
    {
      cat: "官方",
      name: t("official"),
    },
    {
      cat: "华语",
      name: t("chinese"),
    },
    {
      cat: "流行",
      name: t("popular"),
    },
    {
      cat: "摇滚",
      name: t("rock"),
    },
    {
      cat: "民谣",
      name: t("ballad"),
    },
    {
      cat: "电子",
      name: t("electronic"),
    },
  ];

  const router = useRouter();

  const [limit, setLimit] = useState(20);
  const [searchCat, setSearchCat] = useState("全部");
  const [displayPlaylist, setDisplayPlaylist] = useState([]);

  const handleMorePlaylistClick = () => {
    setLimit((value) => (value += 20));
  };

  const handleCatTabClick = (cat: string) => {
    setSearchCat(cat);
    setLimit(20);

    router.push(
      {
        pathname: "/playlist",
        query: {
          cat: searchCat,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const {
    personalizedPlaylist,
    setPersonalizedPlaylist,
    isLoading: isPersonalPlaylistLoading,
    error,
  } = usePersonalizedPlaylist({ limit });

  const { playlists, isLoading: isTopPlaylistLoading } = useTopPlaylist({
    limit,
    cat: searchCat,
  });

  useEffect(() => {
    if (searchCat !== "推荐" && playlists) {
      setDisplayPlaylist(playlists);
    } else if (searchCat === "推荐" && personalizedPlaylist) {
      setDisplayPlaylist(personalizedPlaylist);
    }
  }, [searchCat, personalizedPlaylist, playlists, setDisplayPlaylist]);

  return (
    <Container>
      <>
        <TitleBoardContainer>
          <TitleBoard title={t("title")} info={t("subtitle")} />
        </TitleBoardContainer>

        <CaptionBoardContainer>
          <Button isShowHover={false} onClick={() => handleCatTabClick("全部")}>
            <MainText bold>{t("all")}</MainText>
          </Button>
          <Buttons>
            {hotPlaylistMenu.map((menu) => (
              <Button
                key={menu.name}
                onClick={() => handleCatTabClick(menu.cat)}
              >
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
          {displayPlaylist?.map((playlist) => (
            <MediaCard
              key={playlist.id}
              href={`/playlist/${playlist.id}`}
              cardType="album"
              coverPath={
                (playlist.picUrl || playlist.coverImgUrl) + "?param=512y512"
              }
              title={playlist.name}
              caption={playlist.copywriter || playlist.description}
              playCount={playlist.playCount}
              isCanCaptionClick={false}
              onTitleClick={() => router.push(`/playlist/${playlist.id}`)}
            />
          ))}
        </PlaylistContainer>

        {(isPersonalPlaylistLoading || isTopPlaylistLoading) && (
          <PlaylistsLoadingContainer rows={4} isOverflow={false} />
        )}

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
  tw`grid grid-cols-3 md:grid-cols-5 
  gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 
  gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12
  mx-3 lg:mx-7 mb-2 md:mb-3 lg:mb-4 xl:mb-6`,
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
