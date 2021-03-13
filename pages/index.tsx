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
  const [personalizedMovie, setPersonalizedMovie] = useState([]);
  const [personalizedSongs, setPersonalizedSongs] = useState([]);

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
        setPersonalizedArtists(getRandomArrayElements(data.artists, 6))
      );
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/album/new?area=EA&limit=10&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => setNewAlbums(data.albums));
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/personalized/mv?offset=10&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) =>
        setPersonalizedMovie(getRandomArrayElements(data.result, 2))
      );
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/personalized/newsong?offset=10&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => setPersonalizedSongs(data.result));
  }, []);

  return (
    <Container onClick={() => setContextMenuInfo({ visible: false })}>
      <TitleBoardContainer>
        <TitleBoard title="For you" info="三月八日，星期一" />
      </TitleBoardContainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="推荐歌单"
          moreText="更多"
          onMoreClick={handleMorePlaylistClick}
        />
      </CaptionBoardContainer>

      <PlaylistWrapper>
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
      </PlaylistWrapper>

      <FlexModalContainer>
        <RecommendMovieWrapper>
          <CaptionBoardContainer tw="lg:mx-0">
            <CaptionBoard
              caption="推荐视频"
              moreText="更多"
              onMoreClick={handleMoreHotArtistClick}
            />
          </CaptionBoardContainer>

          <RecommendMoviesWrapper>
            <RecommendMoviesContainer>
              {personalizedMovie?.map((movie) => (
                <MediaCard
                  key={movie.id}
                  cardType="movie"
                  coverPath={movie.picUrl + "?param=464y260"}
                  title={movie.name}
                  caption={movie.artistName}
                  playCount={movie.playCount}
                />
              ))}
            </RecommendMoviesContainer>
          </RecommendMoviesWrapper>
        </RecommendMovieWrapper>

        <RecommendSongsWrapper>
          <CaptionBoardContainer>
            <CaptionBoard
              caption="推荐歌曲"
              moreText="更多"
              onMoreClick={handleMoreHotArtistClick}
            />
          </CaptionBoardContainer>

          <RecommendSongs>
            {personalizedSongs?.map((song, index) => (
              <PlaylistItemCard
                key={song.id}
                itemType={
                  index === 0 ? "active" : index === 3 ? "disabled" : "default"
                }
                coverPath={song.picUrl + "?param=100y100"}
                index={index + 1}
                name={song.name}
                artists={song.song.artists}
                album={song.song.album.name}
                duration={song.duration}
                isLike={false}
                onDblClick={(e, id) => console.log(e, id)}
                onContextMenuClick={handleOnContextMenuClick}
              />
            ))}
          </RecommendSongs>

          <MobileRecommendSongsContainer>
            <MobileRecommendSongs>
              {personalizedSongs?.map((song, index) => (
                <MiniPlaylistItemCard
                  key={song.id}
                  itemType={
                    index === 0
                      ? "active"
                      : index === 3
                      ? "disabled"
                      : "default"
                  }
                  coverPath={song.picUrl + "?param=100y100"}
                  name={song.name}
                  artists={song.song.artists}
                  onDblClick={(e, id) => console.log(e, id)}
                  onContextMenuClick={handleOnContextMenuClick}
                />
              ))}
            </MobileRecommendSongs>
          </MobileRecommendSongsContainer>
        </RecommendSongsWrapper>
      </FlexModalContainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="热门歌手"
          moreText="更多"
          onMoreClick={handleMoreHotArtistClick}
        />
      </CaptionBoardContainer>

      <ArtistsWrapper>
        <ArtistsConntainer>
          {personalizedArtists?.map((artist) => (
            <AvatarCard
              key={artist.id}
              src={artist.picUrl + "?param=512y512"}
              caption={artist.name}
            />
          ))}
        </ArtistsConntainer>
      </ArtistsWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="新碟上架"
          moreText="更多"
          onMoreClick={handleMoreNewAlbumClick}
        />
      </CaptionBoardContainer>

      <PlaylistWrapper>
        <PlaylistContainer>
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
        </PlaylistContainer>
      </PlaylistWrapper>
    </Container>
  );
};

export default Home;

export const scrollbarHiddenStyles = css`
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const MobileRecommendSongs = styled.div(() => [
  tw`grid grid-cols-4 gap-2 md:w-full ml-3 pr-3 md:hidden`,
  css`
    width: 800px;
  `,
]);

const RecommendSongs = styled.div(() => [
  tw`hidden md:block overflow-hidden`,
  css`
    @media (min-width: 768px) {
      max-height: 360px;
    }

    @media (min-width: 1024px) {
      max-height: 480px;
    }

    @media (min-width: 1280px) {
      max-height: 600px;
    }
  `,
]);

const RecommendSongsWrapper = styled.div(() => [tw`flex-1`]);

const RecommendMoviesContainer = styled.div(() => [
  tw`grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-1 pr-3 lg:pr-0`,
  css`
    @media (max-width: 767px) {
      width: 436px;
    }
  `,
]);

const RecommendMoviesWrapper = styled.div(() => [
  scrollbarHiddenStyles,
  tw`pl-3 lg:pl-0 overflow-x-scroll md:overflow-visible`,
]);

const RecommendMovieWrapper = styled.div(() => [tw`flex-1`]);

const MobileRecommendSongsContainer = styled.div(() => [
  scrollbarHiddenStyles,
  tw`overflow-x-scroll`,
]);

const FlexModalContainer = styled.div(() => [
  tw`flex flex-col-reverse md:grid md:gap-2 lg:gap-5 lg:gap-7 mx-0 lg:mx-7`,
  css`
    grid-template-columns: 30% 70%;
  `,
]);

const PlaylistContainer = styled.div(() => [
  tw`grid grid-cols-10 md:grid-cols-5 gap-2 lg:gap-6 md:w-full pr-3 lg:pr-0`,
  css`
    width: 1280px;
  `,
]);

const PlaylistWrapper = styled.div(() => [
  scrollbarHiddenStyles,
  tw`pl-3 lg:pl-0 lg:mx-7 overflow-x-scroll lg:overflow-visible`,
]);

const ArtistsConntainer = styled(PlaylistContainer)(() => [
  tw`grid-cols-6 md:grid-cols-6 pr-3 lg:pr-0`,
  css`
    width: 652px;
  `,
]);

const ArtistsWrapper = styled(PlaylistWrapper)(() => [tw`ml-0 pl-3 lg:pl-0`]);

const CaptionBoardContainer = styled.div(() => [
  tw`mt-2 lg:mt-7 mx-2 lg:mx-7 mb-3 lg:mb-6`,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div``;
