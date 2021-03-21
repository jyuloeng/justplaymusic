import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { ViewMoreCommonContainer } from "../../components/containers";
import { TitleBoard } from "../../components/boards";
import { TabsMenu } from "../../components/menus";
import { MediaCard } from "../../components/cards";
import { useNewAlbum, AlbumNewArea } from "../../hooks";
import { IconGlobal } from "../../styles/icons";

export interface AlbumNewProps {}

const areaList: Array<{
  key: AlbumNewArea;
  name: string;
}> = [
  {
    key: "ALL",
    name: "全部",
  },
  {
    key: "ZH",
    name: "华语",
  },
  {
    key: "EA",
    name: "欧美",
  },
  {
    key: "JP",
    name: "日本",
  },
  {
    key: "KR",
    name: "韩国",
  },
];

const AlbumNew: React.FC<AlbumNewProps> = () => {
  const router = useRouter();

  const [newAlbumLimit, setNewAlbumLimit] = useState(30);
  const [searchKey, setSearchKey] = useState<AlbumNewArea>(areaList[0].key);

  const { total, newAlbums } = useNewAlbum({
    limit: newAlbumLimit,
    area: searchKey,
  });

  const handleAreaTabClick = (key: AlbumNewArea) => {
    setSearchKey(key);
    setNewAlbumLimit(30)

    router.push(
      {
        pathname: "/album/new",
        query: {
          area: key,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <Container>
      <ViewMoreCommonContainer
        titleBoard={
          <TitleBoard title="全部新碟" info="看看有没有什么你喜欢的新碟呢~" />
        }
        header={
          <TabsMenuContainer>
            <TabsMenu
              title="地区"
              titleIcon={<IconGlobal />}
              tabList={areaList}
              activeKey={searchKey}
              onTabClick={(key) => handleAreaTabClick(key as AlbumNewArea)}
            />
          </TabsMenuContainer>
        }
        isShowLoadMore={total > newAlbums?.length}
        onLoadMoreClick={() => setNewAlbumLimit((value) => value + 30)}
        mdCols={5}
      >
        {newAlbums?.map((album) => (
          <MediaCard
            key={album.id}
            href={`/album/${album.id}`}
            cardType="album"
            coverPath={album.picUrl + "?param=512y512"}
            title={album.name}
            caption={album.artist.name}
            isShowPlayCount={false}
            onTitleClick={() => router.push(`/album/${album.id}`)}
            onCaptionClick={() => router.push(`/artist/${album.artist.id}`)}
          />
        ))}
      </ViewMoreCommonContainer>
    </Container>
  );
};

export default AlbumNew;

const TabsMenuContainer = styled.div(() => [tw`mb-2 md:mb-6`]);

const InitialTabsMenuContainer = styled(TabsMenuContainer)(
  () => tw`hidden md:block`
);

const Container = styled.div(() => tw``);
