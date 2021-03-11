import { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import TitleBoard from "../components/boards/title-board";
import CaptionBoard from "../components/boards/caption-board";
import {
  MediaCard,
  AvatarCard,
  ArtistCard,
  PlaylistItemCard,
  MiniPlaylistItemCard,
  PlaylistItemCardProps,
} from "../components/cards";
import { MoreActionMenu, MoreActionMenuProps } from "../components/menus";
import { Slider } from "../components/controls";
import { getRandomArrayElements } from "../lib/array";

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
  const [personalizedPlaylist, setPersonalizedPlaylist] = useState([]);
  const [personalizedArtists, setPersonalizedArtists] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);

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

  const handleMorePlaylistClick = () => {};

  const handleMoreHotArtistClick = () => {};

  const handleMoreNewAlbumClick = () => {};

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/personalized?limit=10&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => setPersonalizedPlaylist(data.result));
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api//top/artists?cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) =>
        setPersonalizedArtists(getRandomArrayElements(data.artists, 5))
      );
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/album/new?area=EA&limit=10&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => setNewAlbums(data.albums));
  }, []);

  return (
    <Container onClick={() => setContextMenuInfo({ visible: false })}>
      <TitleBoardContainer>
        <TitleBoard title="For you" info="三月八日，星期一" />
      </TitleBoardContainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="推荐歌单"
          onMoreClick={handleMorePlaylistClick}
        />
      </CaptionBoardContainer>

      <PlaylistConntainer>
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
      </PlaylistConntainer>

      <FlexModalContainer>
        <RecommendMovieContainer>
          <CaptionBoardContainer>
            <CaptionBoard
              caption="推荐视频"
              onMoreClick={handleMoreHotArtistClick}
            />
          </CaptionBoardContainer>

          <RecommendMovies>
            <MediaCard
              cardType="movie"
              coverPath={movieCoverPath}
              title="干杯"
              caption="五月天"
              playCount={860}
            />

            <MediaCard
              cardType="movie"
              coverPath={movieCoverPath}
              title="干杯"
              caption="五月天"
              playCount={860}
            />
          </RecommendMovies>
        </RecommendMovieContainer>

        <RecommendSongsContainer>
          <CaptionBoardContainer>
            <CaptionBoard
              caption="推荐歌曲"
              onMoreClick={handleMoreHotArtistClick}
            />
          </CaptionBoardContainer>

          <RecommendSongs>
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
          </RecommendSongs>

          <MobileRecommendSongs>
            {playlist.map((item, index) => (
              <MiniPlaylistItemCard
                key={index}
                itemType={
                  index === 0 ? "active" : index === 3 ? "disabled" : "default"
                }
                coverPath={item.coverPath}
                name={item.name}
                artists={item.artists}
                onDblClick={(e, id) => console.log(e, id)}
                onContextMenuClick={handleOnContextMenuClick}
              />
            ))}
          </MobileRecommendSongs>
        </RecommendSongsContainer>
      </FlexModalContainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="热门歌手"
          onMoreClick={handleMoreHotArtistClick}
        />
      </CaptionBoardContainer>

      <PlaylistConntainer>
        {personalizedArtists?.map((artist) => (
          <AvatarCard
            key={artist.id}
            src={artist.picUrl + "?param=512y512"}
            caption={artist.name}
          />
        ))}
      </PlaylistConntainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="新碟上架"
          onMoreClick={handleMoreNewAlbumClick}
        />
      </CaptionBoardContainer>

      <PlaylistConntainer>
        {newAlbums?.map((album) => (
          <MediaCard
            key={album.id}
            cardType="album"
            coverPath={album.picUrl + "?param=512y512"}
            title={album.name}
            caption={album.artist.name}
            isShowPlayCount={false}
          />
        ))}
      </PlaylistConntainer>
    </Container>
  );
};

export default Home;

const MobileRecommendSongs = styled.div(() => [
  tw`grid grid-cols-2 gap-2 ml-2 md:hidden`,
]);

const RecommendSongs = styled.div(() => [tw`hidden md:block`]);

const RecommendSongsContainer = styled.div(() => [tw`flex-1`]);

const RecommendMovies = styled.div(() => [tw`grid gap-1`]);

const RecommendMovieContainer = styled.div(() => [tw`flex-1`]);

const FlexModalContainer = styled.div(() => [
  tw`flex md:flex-row flex-col-reverse`,
]);

const PlaylistConntainer = styled.div(() => [
  tw`grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-6 mx-3 lg:mx-7`,
]);

const CaptionBoardContainer = styled.div(() => [
  tw`mt-2 md:mt-7 mx-2 md:mx-7 mb-3 md:mb-6`,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 md:mx-10 mt-4 md:mt-6`]);

const Container = styled.div``;
