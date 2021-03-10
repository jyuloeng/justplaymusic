import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import TitleBoard from "../components/boards/title-board";
import CaptionBoard from "../components/boards/caption-board";
import {
  MediaCard,
  AvatarCard,
  ArtistCard,
  PlaylistItemCard,
  PlaylistItemCardProps,
} from "../components/cards";
import { MoreActionMenu, MoreActionMenuProps } from "../components/menus";
import { Slider } from "../components/controls";

const coverPath =
  "https://p2.music.126.net/2Ctl_VC8ZzxIiitZQFyy3A==/109951163966538110.jpg?param=512y512";

const movieCoverPath =
  "https://p1.music.126.net/c6y8xjSlDESdDuiELIAh4A==/5888984278505748.jpg?param=464y260";

const avatarPath =
  "https://p2.music.126.net/k0-V3Zom2-va2KPr9yAmpQ==/109951165745417214.jpg?param=512y512";

const coverPath2 =
  "http://p2.music.126.net/06AEb-q2iWrhS4zg_b51yA==/2537672837122343.jpg?param=224y224";

const playlist: Omit<PlaylistItemCardProps, "index">[] = [
  {
    itemType: "default",
    coverPath:
      "https://p2.music.126.net/Yp9UQkKPDx7zZV6LogAAoA==/109951165682825214.jpg?param=224y224",
    name: '「FREE」"BREATHE" Anime Opening Type Bea',
    artists: ["Mocookie"],
    album: '「FREE」"BREATHE" Anime Opening Type Beat',
    duration: 123456,
    isLike: false,
    isShowDuration: false,
    isShowCover: false,
  },
  {
    itemType: "default",
    coverPath:
      "https://p2.music.126.net/EFa8vTDquiMpjs14bmV7jQ==/109951165667270306.jpg?param=224y224",
    name: " ''Unwind''-Dance Hall Type beat（Prod by 17＆AFB） ",
    artists: ["LRUI17", "AlcoholFreeBaby"],
    album: "''Unwind''-Dance Hall Type Beat",
    duration: 123456,
    isLike: false,
    isShowDuration: false,
    isShowCover: false,
  },
  {
    itemType: "default",
    coverPath:
      "https://p2.music.126.net/3fTliWFKVkrMdpIJwF-0mQ==/109951165671945704.jpg?param=224y224",
    name: " [FREE] WITOUT U ",
    artists: ["Jianastic.X", "GOAT MUSIC"],
    album: "[FREE] WITOUT U/GOAT CYPHER/ SOLO/",
    duration: 123456,
    isLike: false,
    isShowDuration: false,
    isShowCover: false,
  },
  {
    itemType: "default",
    coverPath:
      "https://p2.music.126.net/qfs4JBmh5B05kUV5XHINvA==/109951165660973993.jpg?param=224y224",
    name: "日暮途穷",
    artists: ["Lv9", "GOAT MUSIC"],
    album: "日暮途穷",
    duration: 123456,
    isLike: false,
    isShowDuration: false,
    isShowCover: false,
  },
  {
    itemType: "default",
    coverPath:
      "https://p2.music.126.net/fdv_FHmqJ7a1ZGBK5_zslQ==/109951164589169828.jpg?param=224y224",
    name:
      "會 不 會 有 那 麼 壹 刻 ， 妳 仰 望 夜 空 的 方 向 剛 好 和 我 壹 樣",
    artists: ["Vicious"],
    album:
      "會 不 會 有 那 麼 壹 刻 ， 妳 仰 望 夜 空 的 方 向 剛 好 和 我 壹 樣",
    duration: 123456,
    isLike: false,
    isShowDuration: false,
    isShowCover: false,
  },
];

const Home = () => {
  const [contextMenuInfo, setContextMenuInfo] = useState<MoreActionMenuProps>({
    visible: false,
    name: "",
    artists: [],
    coverPath: "",
    position: {
      left: 0,
      top: 0,
    },
  });
  const [percent, setPercent] = useState<number>(50);

  const handleOnContextMenuClick = (
    e: React.MouseEvent<HTMLDivElement>,
    item: PlaylistItemCardProps
  ) => {
    console.log(e, item);

    let { pageX, pageY } = e;
    const { name, artists, coverPath } = item;

    if (document.body.clientWidth - pageX < 196) {
      pageX = pageX - 196;
    }

    setContextMenuInfo({
      visible: true,
      name,
      artists,
      coverPath,
      position: {
        left: pageX,
        top: pageY,
      },
    });
  };

  return (
    <Container onClick={() => setContextMenuInfo({ visible: false })}>
      <TitleBoardContainer>
        <TitleBoard title="For you" info="三月八日，星期一" />
      </TitleBoardContainer>

      <CaptionBoard caption="推荐歌单" />

      <MediaCard
        cardType="album"
        coverPath={coverPath}
        title="减肥！跑步歌单（中文）减肥！跑步歌单（中文）"
        caption="根据你喜欢的单曲《爱你》推荐根据你喜欢的单曲《爱你》推荐根据你喜欢的单曲《爱你》推荐"
        playCount={860}
        isCanCaptionClick={false}
      />

      <br />

      <MediaCard
        cardType="movie"
        coverPath={movieCoverPath}
        title="干杯"
        caption="五月天"
        playCount={860}
      />

      <br />

      <AvatarCard src={avatarPath} caption="Alan Walker Alan Walker" />

      <br />

      <ArtistCard
        src={avatarPath}
        title="G.E.M. 邓紫棋"
        caption="邓紫棋"
        songs={410}
        albums={47}
        movies={82}
      />

      <br />

      <div tw="h-8 flex">
        <div tw="w-12"></div>
        <Slider
          min={0}
          max={100}
          onChange={(value) => console.log("onChange" + value)}
          onAfterChange={(value) => console.log("onAfterChange" + value)}
        />
        {/* <ProgressBar
          percent={percent}
          onChange={(newPercent) => setPercent(() => newPercent)}
        /> */}
      </div>

      {playlist.map((item, index) => (
        <PlaylistItemCard
          key={index}
          itemType={
            index === 0 ? "active" : index === 3 ? "disabled" : "default"
          }
          coverPath={item.coverPath}
          index={index + 1}
          name={item.name}
          artists={item.artists}
          album={item.album}
          duration={item.duration}
          isLike={false}
          onDblClick={(e, id) => console.log(e, id)}
          onContextMenuClick={handleOnContextMenuClick}
        />
      ))}

      {playlist.map((item, index) => (
        <PlaylistItemCard
          key={index}
          itemType={
            index === 0 ? "active" : index === 3 ? "disabled" : "default"
          }
          coverPath={item.coverPath}
          index={index + 1}
          name={item.name}
          artists={item.artists}
          album={item.album}
          duration={item.duration}
          isLike={false}
          isAlbum={true}
          isShowCover={false}
        />
      ))}

      <br />

      <MoreActionMenu
        coverPath={contextMenuInfo.coverPath}
        name={contextMenuInfo.name}
        artists={contextMenuInfo.artists}
        visible={contextMenuInfo.visible}
        position={contextMenuInfo.position}
      />
    </Container>
  );
};

export default Home;

const Container = styled.div``;

const TitleBoardContainer = tw.div`ml-10 mt-6`;
