import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { TitleBoard } from "../../components/boards";
import { MiniAvatarCard, AvatarCard } from "../../components/cards";
import {
  ViewMoreCommonContainer,
  ArtistsLoadingContainer,
  MobileArtistsLoadingContainer,
} from "../../components/containers";
import { TabsMenu } from "../../components/menus";
import {
  IconGlobal,
  IconHeartThread,
  IconLibrary,
  IconStyle,
} from "../../styles/icons";
import { generateLowerChar } from "../../lib/util";
import { useArtistList } from "../../hooks";

export interface ArtistList {}

interface ArtistListSearchKey {
  area?: number;
  type?: number;
  initial?: string;
}

const ArtistList: React.FC<ArtistList> = () => {
  const { t } = useTranslation("artist");

  const areaList = [
    {
      key: -1,
      name: t("all"),
    },
    {
      key: 7,
      name: t("chinese"),
    },
    {
      key: 96,
      name: t("occident"),
    },
    {
      key: 8,
      name: t("japanese"),
    },
    {
      key: 16,
      name: t("korea"),
    },
    {
      key: 0,
      name: t("other"),
    },
  ];

  const typeList = [
    {
      key: -1,
      name: t("all"),
    },
    {
      key: 1,
      name: t("male"),
    },
    {
      key: 2,
      name: t("female"),
    },
    {
      key: 3,
      name: t("band"),
    },
  ];

  const initialList = [
    { key: -1, name: "热门" },
    ...generateLowerChar(),
    { key: 0, name: "#" },
  ];

  const router = useRouter();

  const [limit, setLimit] = useState(20);
  const [searchKey, setSearchKey] = useState<ArtistListSearchKey>({
    area: areaList[0].key,
    type: typeList[0].key,
    initial: initialList[0].key,
  });

  const handleMorePlaylistClick = () => {
    setLimit((value) => (value += 20));
  };

  const handleAreaTabClick = (key: string | number) => {
    setSearchKey({
      ...searchKey,
      area: key as number,
    });
    setLimit(20);

    router.push(
      {
        pathname: "/artistlist",
        query: {
          ...searchKey,
          area: key,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleTypeTabClick = (key: string | number) => {
    setSearchKey({
      ...searchKey,
      type: key as number,
    });
    setLimit(20);

    router.push(
      {
        pathname: "/artistlist",
        query: {
          ...searchKey,
          type: key,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleInitialTabClick = (key: string | number) => {
    setSearchKey({
      ...searchKey,
      initial: key as string,
    });
    setLimit(20);

    router.push(
      {
        pathname: "/artistlist",
        query: {
          ...searchKey,
          initial: key,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const { data: searchArtistsRes, isLoading } = useArtistList({
    ...searchKey,
    limit,
  });

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={<TitleBoard title={t("title")} info={t("subtitle")} />}
        header={
          <>
            <TabsMenuContainer>
              <TabsMenu
                title={t("area")}
                titleIcon={<IconGlobal />}
                tabList={areaList}
                activeKey={searchKey.area}
                onTabClick={(key) => handleAreaTabClick(key)}
              />
            </TabsMenuContainer>

            <TabsMenuContainer>
              <TabsMenu
                title={t("type")}
                titleIcon={<IconStyle />}
                tabList={typeList}
                activeKey={searchKey.type}
                onTabClick={(key) => handleTypeTabClick(key)}
              />
            </TabsMenuContainer>

            <InitialTabsMenuContainer>
              <TabsMenu
                title={t("initial")}
                titleIcon={<IconLibrary />}
                tabList={initialList}
                activeKey={searchKey.initial}
                onTabClick={(key) => handleInitialTabClick(key)}
              />
            </InitialTabsMenuContainer>
          </>
        }
        isShowLoadMore={searchArtistsRes?.more}
        isNeedChildrenContainer={false}
        onLoadMoreClick={() => handleMorePlaylistClick()}
        footer={
          <>
            {isLoading ? (
              <ArtistsLoadingContainer rows={2} isHideUnderMd={true} />
            ) : (
              <ArtistsContainer>
                {searchArtistsRes?.artists?.map((artist) => (
                  <AvatarCard
                    key={artist.id}
                    id={artist.id}
                    src={artist.picUrl + "?param=512y512"}
                    caption={artist.name}
                  />
                ))}
              </ArtistsContainer>
            )}

            {isLoading ? (
              <MobileArtistsLoadingContainer />
            ) : (
              <MobileArtistsContainer>
                {searchArtistsRes?.artists?.map((artist) => (
                  <MiniAvatarCard
                    key={artist.id}
                    coverPath={artist.picUrl + "?param=256y256"}
                    caption={artist.name}
                    buttonIcon={<IconHeartThread />}
                    buttonText={t("focus")}
                  />
                ))}
              </MobileArtistsContainer>
            )}
          </>
        }
      ></ViewMoreCommonContainer>
    </Container>
  );
};

export default ArtistList;

const MobileArtistsContainer = styled.div(() => [tw`grid md:hidden gap-2`]);

const ArtistsContainer = styled.div(() => [
  tw`hidden md:grid grid-cols-3 md:grid-cols-6 
  gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 
  gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12`,
]);

const TabsMenuContainer = styled.div(() => [tw`mb-2 md:mb-6`]);

const InitialTabsMenuContainer = styled(TabsMenuContainer)(
  () => tw`hidden md:block`
);

const Container = styled.div(() => []);
