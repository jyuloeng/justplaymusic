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
  const [personalizedMv, setPersonalizedMv] = useState([]);
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
        setPersonalizedMv(getRandomArrayElements(data.result, 2))
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
        <RecommendMvWrapper>
          <CaptionBoardContainer tw="lg:mx-0">
            <CaptionBoard
              caption="推荐视频"
              moreText="更多"
              onMoreClick={handleMoreHotArtistClick}
            />
          </CaptionBoardContainer>

          <RecommendMvsWrapper>
            <RecommendMvContainer>
              {personalizedMv?.map((mv) => (
                <MediaCard
                  key={mv.id}
                  cardType="mv"
                  coverPath={mv.picUrl + "?param=464y260"}
                  title={mv.name}
                  caption={mv.artistName}
                  playCount={mv.playCount}
                />
              ))}
            </RecommendMvContainer>
          </RecommendMvsWrapper>
        </RecommendMvWrapper>

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

const RecommendMvContainer = styled.div(() => [
  tw`grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-1 pr-3 lg:pr-0`,
  css`
    @media (max-width: 767px) {
      width: 436px;
    }
  `,
]);

const RecommendMvsWrapper = styled.div(() => [
  scrollbarHiddenStyles,
  tw`pl-3 lg:pl-0 overflow-x-scroll md:overflow-visible`,
]);

const RecommendMvWrapper = styled.div(() => [tw`flex-1`]);

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
