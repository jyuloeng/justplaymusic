import { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import TitleBoard from "../components/boards/title-board";
import CaptionBoard from "../components/boards/caption-board";
import {
  MediaCard,
  AvatarCard,
  PlaylistItemCard,
  MiniPlaylistItemCard,
  PlaylistItemCardProps,
} from "../components/cards";
import {
  MoreActionMenu,
  MoreActionMenuProps,
  PlaylistDrawerMenu,
  ContextMenuPosition,
} from "../components/menus";
import { getRandomArrayElements } from "../lib/array";
import "nprogress/nprogress.css";
import {
  usePersonalizedPlaylist,
  useTopArtists,
  usePersonalizedSong,
  usePersonalizedMV,
  useNewestAlbum,
  useRecommendSong,
  useMutateLikeSong,
} from "./../hooks";
import {
  MiniPlaylistItemsLoadingContainer,
  MVsLoadingContainer,
  PlaylistItemsLoadingContainer,
  PlaylistsLoadingContainer,
} from "../components/containers";
import { isLoginByAccount } from "../lib/auth";
import { useAppDispatch, useAppSelector } from "./../store/index";
import {
  selectCurrentSong,
  selectSonglist,
  setCurrent,
  setCurrentSong,
} from "./../store/slice/song.slice";
import { selectLikedList } from "../store/slice/user.slice";

const loginByAccount = isLoginByAccount();

const Home = () => {
  const { t } = useTranslation("home");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [playlistDrawerMenuOpen, setPlaylistDrawerMenuOpen] = useState(false);
  const [
    moreActionMenuPosition,
    setMoreActionMenuPostion,
  ] = useState<ContextMenuPosition>({ top: 0, left: 0 });
  const [moreActionMenuVisible, setMoreActionMenuVisible] = useState(false);
  const [displaySongs, setDisplaySongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const songlist = useAppSelector(selectSonglist);
  const currentSong = useAppSelector(selectCurrentSong);
  const likedList = useAppSelector(selectLikedList);

  const {
    personalizedPlaylist,
    setPersonalizedPlaylist,
    isLoading: isPersonalizedPlaylistLoading,
    error,
  } = usePersonalizedPlaylist({ limit: 10 });

  const {
    topArtists,
    setTopArtists,
    isLoading: isTopArtistsLoading,
  } = useTopArtists({
    limit: 50,
  });

  useEffect(() => {
    if (!isTopArtistsLoading) {
      setTopArtists((value) => getRandomArrayElements(value, 6));
    }
  }, [isTopArtistsLoading]);

  const {
    newestAlbums,
    setNewestAlbums,
    isLoading: isAlbumNewestLoding,
  } = useNewestAlbum();

  useEffect(() => {
    if (!isAlbumNewestLoding) {
      setNewestAlbums((value) => getRandomArrayElements(value, 10));
    }
  }, [isAlbumNewestLoding]);

  const {
    personalizedMV,
    setPersonalizedMV,
    isLoading: isPersonalizedMVLoading,
  } = usePersonalizedMV();

  useEffect(() => {
    if (!isPersonalizedMVLoading) {
      setPersonalizedMV((value) => getRandomArrayElements(value, 2));
    }
  }, [isPersonalizedMVLoading]);

  const {
    personalizedSongs,
    isLoading: isPersonalizedSongsLoading,
  } = usePersonalizedSong(10);

  const {
    recommendSongs,
    isLoading: isRecommendSongsLoading,
  } = useRecommendSong();

  useEffect(() => {
    if (recommendSongs?.length > 0) {
      setDisplaySongs(recommendSongs);
    } else if (personalizedSongs?.length > 0) {
      setDisplaySongs(personalizedSongs);
    }
  }, [personalizedSongs, recommendSongs, setDisplaySongs]);

  const { mutateAsync } = useMutateLikeSong({
    id: selectedSong?.id,
    like: likedList?.includes(selectedSong?.id),
  });

  const handleLikeSong = (song) => {
    setSelectedSong(song);
    const like = !likedList?.includes(song.id);
    mutateAsync({
      id: song.id,
      like,
    });
  };

  const handleOnDblClick = (song) => {
    const current = songlist.findIndex((item) => item.id === song.id);
    dispatch(setCurrent(current));
    dispatch(setCurrentSong(song));
  };

  const handleOnContextMenuClick = (
    e: React.MouseEvent<HTMLOrSVGElement>,
    song
  ) => {
    let { pageX, pageY } = e;

    if (document.body.clientWidth - pageX < 196) {
      pageX = pageX - 196;
    }
    setMoreActionMenuPostion({
      left: pageX,
      top: pageY,
    });
    setSelectedSong(song);
    setMoreActionMenuVisible(true);
  };

  return (
    <>
      <Container>
        <TitleBoardContainer>
          <TitleBoard title="For you" info="三月八日，星期一" />
        </TitleBoardContainer>

        <CaptionBoardContainer>
          <CaptionBoard
            caption={t("recommended-playlists")}
            moreText={t("more")}
            onMoreClick={() => router.push("/playlist")}
          />
        </CaptionBoardContainer>

        {isPersonalizedPlaylistLoading ? (
          <PlaylistsLoadingContainer />
        ) : (
          <PlaylistWrapper>
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
          </PlaylistWrapper>
        )}

        <FlexModalContainer>
          <RecommendMvWrapper>
            <CaptionBoardContainer tw="lg:mx-0">
              <CaptionBoard caption={t("recommended-videos")} moreText={""} />
            </CaptionBoardContainer>

            {isPersonalizedMVLoading ? (
              <MVsLoadingContainer
                cols={2}
                mdCols={1}
                rows={2}
                isNeedMarginX={false}
              />
            ) : (
              <RecommendMvsWrapper>
                <RecommendMvContainer>
                  {personalizedMV?.map((mv) => (
                    <MediaCard
                      key={mv.id}
                      href={`/mv/${mv.id}`}
                      cardType="mv"
                      coverPath={mv.picUrl + "?param=464y260"}
                      title={mv.name}
                      caption={mv.artistName}
                      playCount={mv.playCount}
                      onTitleClick={() => router.push(`/mv/${mv.id}`)}
                      onCaptionClick={() =>
                        router.push(`/artist/${mv.artistId}`)
                      }
                    />
                  ))}
                </RecommendMvContainer>
              </RecommendMvsWrapper>
            )}
          </RecommendMvWrapper>

          <RecommendSongsWrapper>
            <CaptionBoardContainer>
              <CaptionBoard
                caption={loginByAccount ? "每日推荐" : t("new-songs")}
                moreText={loginByAccount && t("more")}
                onMoreClick={() => {
                  loginByAccount && setPlaylistDrawerMenuOpen(true);
                }}
              />
            </CaptionBoardContainer>

            <RecommendSongs>
              {isPersonalizedSongsLoading ||
              isRecommendSongsLoading ||
              !displaySongs ? (
                <PlaylistItemsLoadingContainer />
              ) : (
                displaySongs?.map((song, index) => (
                  <PlaylistItemCard
                    key={song.id}
                    title={song?.reason}
                    itemType={
                      song.playable
                        ? currentSong?.id === song.id
                          ? "active"
                          : "default"
                        : "disabled"
                    }
                    coverPath={
                      (song?.picUrl || song?.al?.picUrl) + "?param=100y100"
                    }
                    index={index + 1}
                    name={song.name}
                    artists={song?.song?.artists || song?.ar}
                    album={song?.song?.album?.name || song?.al?.name}
                    albumId={song?.song?.album?.id || song?.al?.id}
                    duration={song?.song?.duration || song?.dt}
                    isLike={likedList?.includes(song.id)}
                    onLikeClick={() => handleLikeSong(song)}
                    onDblClick={() => handleOnDblClick(song)}
                    onContextMenuClick={(e) =>
                      handleOnContextMenuClick(e, song)
                    }
                  />
                ))
              )}
            </RecommendSongs>

            <MobileRecommendSongsContainer>
              {isPersonalizedSongsLoading ||
              isRecommendSongsLoading ||
              !displaySongs ? (
                <MiniPlaylistItemsLoadingContainer />
              ) : (
                <MobileRecommendSongs>
                  {displaySongs?.map((song, index) => (
                    <MiniPlaylistItemCard
                      key={song.id}
                      itemType={
                        index === 0
                          ? "active"
                          : index === 3
                          ? "disabled"
                          : "default"
                      }
                      coverPath={
                        (song?.picUrl || song?.al?.picUrl) + "?param=100y100"
                      }
                      name={song.name}
                      artists={song?.song?.artists || song?.ar}
                      // onDblClick={(e, id) => console.log(e, id)}
                      // onContextMenuClick={handleContextMenuClick}
                    />
                  ))}
                </MobileRecommendSongs>
              )}
            </MobileRecommendSongsContainer>
          </RecommendSongsWrapper>
        </FlexModalContainer>

        <CaptionBoardContainer>
          <CaptionBoard caption={t("hot-artists")} />
        </CaptionBoardContainer>

        <ArtistsWrapper>
          <ArtistsConntainer>
            {topArtists?.map((artist) => (
              <AvatarCard
                key={artist.id}
                id={artist.id}
                src={artist.picUrl + "?param=512y512"}
                caption={artist.name}
              />
            ))}
          </ArtistsConntainer>
        </ArtistsWrapper>

        <CaptionBoardContainer>
          <CaptionBoard
            caption={t("new-albums")}
            moreText={t("more")}
            onMoreClick={() => router.push("/album/new")}
          />
        </CaptionBoardContainer>

        {isPersonalizedMVLoading ? (
          <PlaylistsLoadingContainer />
        ) : (
          <PlaylistWrapper>
            <PlaylistContainer>
              {newestAlbums?.map((album) => (
                <MediaCard
                  key={album.id}
                  href={`/album/${album.id}`}
                  cardType="album"
                  coverPath={album.picUrl + "?param=512y512"}
                  title={album.name}
                  caption={album.artist.name}
                  isShowPlayCount={false}
                  onTitleClick={() => router.push(`/album/${album.id}`)}
                  onCaptionClick={() =>
                    router.push(`/artist/${album.artist.id}`)
                  }
                />
              ))}
            </PlaylistContainer>
          </PlaylistWrapper>
        )}
      </Container>

      <PlaylistDrawerMenu
        open={playlistDrawerMenuOpen}
        onClose={() => setPlaylistDrawerMenuOpen(false)}
        activeSong={currentSong}
        // isPlaylistSongsLoading={isPlaylistSongsLoading}
        playlistSongs={displaySongs}
        likedList={likedList}
        // onLoadMore={() => handleLoadMore()}
        onLikeClick={(id) => handleLikeSong(id)}
      />

      {selectedSong?.id && (
        <MoreActionMenu
          visible={moreActionMenuVisible}
          onClose={() => setMoreActionMenuVisible(false)}
          song={selectedSong}
          position={moreActionMenuPosition}
        />
      )}
    </>
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
  tw`grid grid-cols-4 gap-2 md:w-full ml-3 pr-3 md:hidden overflow-hidden`,
  css`
    width: 800px;
    max-height: 148px;
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
  tw`grid grid-cols-10 md:grid-cols-5 
  gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 
  gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12
  md:w-full pr-3 lg:pr-0`,
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

const Container = styled.div(() => tw`pb-4 md:pb-12`);
