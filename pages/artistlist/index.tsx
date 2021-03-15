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

export interface SearchKeywordArtistsProps {}

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

const SearchKeywordArtists: React.FC<SearchKeywordArtistsProps> = () => {
  const router = useRouter();

  const [searchArtistsRes, setSearchArtistsRes] = useState<{
    more?: boolean;
    code?: number;
    artists?: any[];
  }>(null);

  const [searchAreaKey, setSearchAreaKey] = useState<string | number>(
    areaList[0].key
  );
  const [searchTypeKey, setSearchTypeKey] = useState<string | number>(
    typeList[0].key
  );
  const [searchInitialKey, setSearchInitialKey] = useState<string | number>(
    initialList[0].key
  );

  const handleAreaTabClick = (key: string | number) => {
    setSearchAreaKey(key);
    router.push({
      pathname: "/artistlist",
      query: {
        area: key,
        type: searchTypeKey,
        initial: searchInitialKey,
      },
    });
  };

  const handleTypeTabClick = (key: string | number) => {
    setSearchTypeKey(key);
    router.push({
      pathname: "/artistlist",
      query: {
        area: searchAreaKey,
        type: key,
        initial: searchInitialKey,
      },
    });
  };

  const handleInitialTabClick = (key: string | number) => {
    setSearchInitialKey(key);
    router.push({
      pathname: "/artistlist",
      query: {
        area: searchAreaKey,
        type: searchTypeKey,
        initial: key,
      },
    });
  };

  useEffect(() => {
    fetch(
      `https://music.qier222.com/api/artist/list?type=2&area=96&initial=b&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3Bhttps://music.qier222.com/api/playlist/detail?id=19723756,3779629&timestamp=1615772549053&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchArtistsRes(data);
      });
  }, []);

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
                activeKey={searchAreaKey}
                onTabClick={(key) => handleAreaTabClick(key)}
              />
            </TabsMenuContainer>

            <TabsMenuContainer>
              <TabsMenu
                title="分类"
                titleIcon={<IconStyle />}
                tabList={typeList}
                activeKey={searchTypeKey}
                onTabClick={(key) => handleTypeTabClick(key)}
              />
            </TabsMenuContainer>

            <InitialTabsMenuContainer>
              <TabsMenu
                title="筛选"
                titleIcon={<IconLibrary />}
                tabList={initialList}
                activeKey={searchInitialKey}
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

export default SearchKeywordArtists;

const MobileArtistsContainer = styled.div(() => [tw`block md:hidden`]);

const ArtistsContainer = styled.div(() => [
  tw`hidden md:grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-6`,
]);

const TabsMenuContainer = styled.div(() => [tw`mb-2 md:mb-6`]);

const InitialTabsMenuContainer = styled(TabsMenuContainer)(
  () => tw`hidden md:block`
);

const Container = styled.div(() => []);
