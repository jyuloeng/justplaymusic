import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../components/boards";
import { MiniAvatarCard, AvatarCard } from "../../components/cards";
import { ViewMoreCommonContainer } from "../../components/containers";
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

const areaList = [
  {
    key: -1,
    name: "全部",
  },
  {
    key: 7,
    name: "华语",
  },
  {
    key: 96,
    name: "欧美",
  },
  {
    key: 8,
    name: "日本",
  },
  {
    key: 16,
    name: "韩国",
  },
  {
    key: 0,
    name: "其他",
  },
];

const typeList = [
  {
    key: -1,
    name: "全部",
  },
  {
    key: 1,
    name: "男歌手",
  },
  {
    key: 2,
    name: "男歌手",
  },
  {
    key: 3,
    name: "乐队",
  },
];

const initialList = [
  { key: -1, name: "热门" },
  ...generateLowerChar(),
  { key: 0, name: "#" },
];

interface ArtistListSearchKey {
  area?: number;
  type?: number;
  initial?: string;
}

const ArtistList: React.FC<ArtistList> = () => {
  const router = useRouter();

  const [searchKey, setSearchKey] = useState<ArtistListSearchKey>({
    area: areaList[0].key,
    type: typeList[0].key,
    initial: initialList[0].key,
  });

  const handleAreaTabClick = (key: string | number) => {
    setSearchKey({
      ...searchKey,
      area: key as number,
    });

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

  const { data: searchArtistsRes } = useArtistList({ ...searchKey });

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={
          <TitleBoard title="歌手" info="你还是那么喜欢听ta的歌呢~" />
        }
        header={
          <>
            <TabsMenuContainer>
              <TabsMenu
                title="地区"
                titleIcon={<IconGlobal />}
                tabList={areaList}
                activeKey={searchKey.area}
                onTabClick={(key) => handleAreaTabClick(key)}
              />
            </TabsMenuContainer>

            <TabsMenuContainer>
              <TabsMenu
                title="分类"
                titleIcon={<IconStyle />}
                tabList={typeList}
                activeKey={searchKey.type}
                onTabClick={(key) => handleTypeTabClick(key)}
              />
            </TabsMenuContainer>

            <InitialTabsMenuContainer>
              <TabsMenu
                title="筛选"
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
        footer={
          <>
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

            <MobileArtistsContainer>
              {searchArtistsRes?.artists?.map((artist) => (
                <MiniAvatarCard
                  key={artist.id}
                  coverPath={artist.picUrl + "?param=256y256"}
                  caption={artist.name}
                  buttonIcon={<IconHeartThread />}
                  buttonText={"关注"}
                />
              ))}
            </MobileArtistsContainer>
          </>
        }
      ></ViewMoreCommonContainer>
    </Container>
  );
};

export default ArtistList;

const MobileArtistsContainer = styled.div(() => [tw`block md:hidden`]);

const ArtistsContainer = styled.div(() => [
  tw`hidden md:grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-6`,
]);

const TabsMenuContainer = styled.div(() => [tw`mb-2 md:mb-6`]);

const InitialTabsMenuContainer = styled(TabsMenuContainer)(
  () => tw`hidden md:block`
);

const Container = styled.div(() => []);
