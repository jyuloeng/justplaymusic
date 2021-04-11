import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Avatar from "../../components/commons/avatar";
import {
  MediaCard,
  ArtistCard,
  PlaylistItemCard,
  PlayCountCard,
  AvatarCard,
} from "../../components/cards";
import { GlassButton, Button } from "../../components/buttons";
import { CaptionText, H3, IntroText, SmallText } from "../../styles/typography";
import { DarkModeTextColor } from "../../styles/colors";
import { IconHeart, IconPlay } from "../../styles/icons";
import { getSpecifiedArrayElements } from "../../lib/array";
import { getAuthCookie, isLogin } from "../../lib/auth";
import {
  useUserPlaylist,
  useUserProfile,
  useUserSublist,
  usePlaylistDetail,
} from "../../hooks";
import { toast } from "./../../lib/toast";
import { useAppDispatch, useAppSelector } from "./../../store";
import { selectUser, selectLikedList } from "../../store/slice/user.slice";
import {
  selectCurrentSong,
  selectSonglist,
  setCurrent,
  setCurrentSong,
} from "../../store/slice/song.slice";
import {
  ArtistsLoadingContainer,
  BaseSkeletonStyles,
  MVsLoadingContainer,
  PlaylistItemsLoadingContainer,
  PlaylistsLoadingContainer,
} from "../../components/containers";
import { ContextMenuPosition, MoreActionMenu } from "../../components/menus";
import { setAutoCacheSong } from "../../store/slice/settings.slice";

export interface ZoneProps {}
type commonLikedRes = {
  code?: number;
  count?: number;
  data?: any[];
  hasMore?: boolean;
  paidCount?: number;
};

const Zone: React.FC<ZoneProps> = () => {
  const { t } = useTranslation("zone");
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const likedList = useAppSelector(selectLikedList);
  const songlist = useAppSelector(selectSonglist);
  const currentSong = useAppSelector(selectCurrentSong);

  // if (!isLogin()) {
  //   toast("请先登录");
  //   router.replace("/login");
  //   return null;
  // }

  const tabsMenu = [
    {
      key: "playlist",
      name: t("playlist"),
    },
    {
      key: "album",
      name: t("album"),
    },
    {
      key: "artist",
      name: t("artist"),
    },
    {
      key: "mv",
      name: t("mv"),
    },
  ];

  const [activeTabKey, setActiveTabKey] = useState(tabsMenu[0].key);

  const [moreActionMenuVisible, setMoreActionMenuVisible] = useState(false);
  const [
    moreActionMenuPosition,
    setMoreActionMenuPostion,
  ] = useState<ContextMenuPosition>({ top: 0, left: 0 });
  const [selectedSong, setSelectedSong] = useState(null);

  const { userProfile, isLoading: isUserProfileLoading } = useUserProfile(
    getAuthCookie()
  );

  const {
    likedAlbumsRes,
    likedArtistsRes,
    likedMvsRes,
    isLoading: isLikedChangeLoading,
  } = useUserSublist({
    key: activeTabKey !== "playlist" ? activeTabKey : "",
  });

  const { userPlaylistRes, isLoading: isPlaylistsLoading } = useUserPlaylist({
    uid: user?.userId,
  });

  const { playlistSongs, isLoading: isSongsLoading } = usePlaylistDetail({
    id: userPlaylistRes?.playlist[0]?.id,
    limit: 16,
  });

  const handleTabClick = (key) => {
    setActiveTabKey(key);
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
        {isUserProfileLoading && !userProfile ? (
          <Info>
            <AvatarContainer />
            <LoadingInfoTitle />
          </Info>
        ) : (
          <Info>
            <AvatarContainer>
              <Avatar src={userProfile?.avatarUrl + "?param=256y256"} />
            </AvatarContainer>
            <InfoText>
              <H3>{userProfile?.nickname}</H3>
              <IntroText bold>{t("user-zone")}</IntroText>
            </InfoText>
          </Info>
        )}

        <MobileInfo>
          <ArtistCard
            isLoading={isUserProfileLoading && !userProfile}
            id={userProfile?.id}
            src={userProfile?.avatarUrl + "?param=256y256"}
            title={userProfile?.nickname}
            isShowCollect={false}
          />
        </MobileInfo>

        <FavoriteMusicWrapper>
          {isSongsLoading || !playlistSongs[0] ? (
            <LoadingCover
              src={"/images/cover-placeholder.webp"}
              layout="responsive"
              width={280}
              height={210}
            />
          ) : (
            playlistSongs[0] && (
              <FavoriteMusicCoverContainer>
                <FavoriteMusicCover
                  src={playlistSongs[0].al.picUrl + "?param=560y420"}
                  layout="responsive"
                  width={280}
                  height={210}
                />

                <GlassButtonContainer>
                  <GlassButton>
                    <IconPlay fill={DarkModeTextColor} />
                  </GlassButton>
                </GlassButtonContainer>

                <GlassTitleContainer>
                  <IconHeart fill={DarkModeTextColor} />
                  <CaptionText bold>{t("my-favourite-music")}</CaptionText>
                </GlassTitleContainer>

                <PlayCountContainer>
                  <PlayCountCard count="860 thousand, 249 songs" />
                </PlayCountContainer>
              </FavoriteMusicCoverContainer>
            )
          )}

          <FavoriteMusicContainer>
            {isSongsLoading || !playlistSongs ? (
              <PlaylistItemsLoadingContainer />
            ) : (
              <FavoriteMusic>
                {playlistSongs?.map((song, index) => (
                  <PlaylistItemCard
                    key={song.id}
                    title={song.reason}
                    itemType={
                      song.playable
                        ? currentSong?.id === song.id
                          ? "active"
                          : "default"
                        : "disabled"
                    }
                    coverPath={song.al.picUrl + "?param=100y100"}
                    index={index + 1}
                    name={song.name}
                    artists={song.ar}
                    album={song.al.name}
                    albumId={song.al.id}
                    duration={song.dt}
                    isLike={likedList?.includes(song.id)}
                    onDblClick={() => handleOnDblClick(song)}
                    onContextMenuClick={(e) =>
                      handleOnContextMenuClick(e, song)
                    }
                  />
                ))}
              </FavoriteMusic>
            )}
          </FavoriteMusicContainer>
        </FavoriteMusicWrapper>

        <MobileFavoriteMusicWrapper>
          {isSongsLoading || !playlistSongs[0] ? (
            <>
              <MobileFavoriteMuiscLoadingCover
                src={"/images/cover-placeholder.webp"}
                layout="responsive"
                width={60}
                height={60}
              />
              <MobileFavoriteMuiscLoadingTitleContianer>
                <MobileFavoriteMuiscLoadingTitle />
                <MobileFavoriteMuiscLoadingCaption />
              </MobileFavoriteMuiscLoadingTitleContianer>
              <MobileFavoriteMuiscLoadingCount />
            </>
          ) : (
            <>
              <MobileFavoriteMusicCoverContainer>
                <MobileFavoriteMusicCover
                  src={playlistSongs[0].al.picUrl + "?param=100y100"}
                  layout="responsive"
                  width={60}
                  height={60}
                />

                <MobileFavoriteMusicIconContainer>
                  <IconHeart fill={DarkModeTextColor} />
                </MobileFavoriteMusicIconContainer>
              </MobileFavoriteMusicCoverContainer>
              <MobileFavoriteMusicInfo>
                <InfoText>{t("my-favourite-music")}</InfoText>
                <SmallText>{t("songs-count", { count: 249 })}</SmallText>
              </MobileFavoriteMusicInfo>

              <MobileFavoriteMusicCount>
                <PlayCountCard count="860 thousand" cardType="solid" />
              </MobileFavoriteMusicCount>
            </>
          )}
        </MobileFavoriteMusicWrapper>

        <CaptionBoardContainer>
          {tabsMenu.map((tab) => (
            <Button
              key={tab.key}
              btnType={activeTabKey === tab.key ? "primary" : "default"}
              onClick={() => handleTabClick(tab.key)}
            >
              <CaptionText bold>{tab.name}</CaptionText>
            </Button>
          ))}
        </CaptionBoardContainer>

        {activeTabKey === "playlist" &&
          (isPlaylistsLoading ? (
            <PlaylistsLoadingContainer isOverflow={false} />
          ) : (
            <PlaylistContainer>
              {userPlaylistRes?.playlist?.map((playlist, index) => {
                return (
                  index !== 0 && (
                    <MediaCard
                      key={playlist.id}
                      href={`/playlist/${playlist.id}`}
                      cardType="album"
                      coverPath={playlist.coverImgUrl + "?param=512y512"}
                      title={playlist.name}
                      caption={playlist.description}
                      playCount={playlist.playCount}
                      isCanCaptionClick={false}
                    />
                  )
                );
              })}
            </PlaylistContainer>
          ))}

        {activeTabKey === "album" &&
          (isLikedChangeLoading ? (
            <PlaylistsLoadingContainer isOverflow={false} />
          ) : (
            <PlaylistContainer>
              {likedAlbumsRes?.data?.map((album) => {
                return (
                  <MediaCard
                    key={album.id}
                    href={`/album/${album.id}`}
                    cardType="album"
                    coverPath={album.picUrl + "?param=512y512"}
                    title={album.name}
                    caption={album.artists[0].name}
                    isCanCaptionClick={false}
                    isShowPlayCount={false}
                  />
                );
              })}
            </PlaylistContainer>
          ))}

        {activeTabKey === "artist" &&
          (isLikedChangeLoading ? (
            <ArtistsLoadingContainer
              rows={2}
              isOverflow={false}
              cols={5}
              isNeedMarginX
            />
          ) : (
            <ArtistsConntainer>
              {likedArtistsRes?.data?.map((artist) => (
                <AvatarCard
                  key={artist.id}
                  id={artist.id}
                  src={artist.picUrl + "?param=512y512"}
                  caption={artist.name}
                />
              ))}
            </ArtistsConntainer>
          ))}

        {activeTabKey === "mv" &&
          (isLikedChangeLoading ? (
            <MVsLoadingContainer isOverflow={false} cols={2} mdCols={4} />
          ) : (
            <MvsContainer>
              {likedMvsRes?.data?.map((mv) => (
                <MediaCard
                  key={mv.id}
                  href={`/mv/${mv?.vid}`}
                  cardType="mv"
                  coverPath={mv.coverUrl + "?param=464y260"}
                  title={mv.title}
                  caption={mv.type === 0 ? mv.creator[0].userName : ""}
                  onTitleClick={() => router.push(`/mv/${mv?.vid}`)}
                  onCaptionClick={() =>
                    router.push(`/artist/${mv?.creator[0]?.userId}`)
                  }
                  playCount={mv.playTime}
                />
              ))}
            </MvsContainer>
          ))}
      </Container>

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

export default Zone;

const MvsContainer = styled.div(() => [
  tw`grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-6 mx-3 lg:mx-7`,
]);

const ArtistsConntainer = styled.div(() => [
  tw`grid grid-cols-3 md:grid-cols-5 gap-2 lg:gap-6 mx-3 lg:mx-7`,
]);

const PlaylistContainer = styled.div(() => [
  tw`grid grid-cols-3 md:grid-cols-5 gap-2 lg:gap-6 mx-3 lg:mx-7`,
]);

const FavoriteMusic = styled.div(() => []);

const FavoriteMusicContainer = styled.div(() => [
  css`
    max-height: 180px;
    overflow-y: scroll;

    @media (min-width: 1024px) {
      max-height: 240px;
    }

    @media (min-width: 1280px) {
      max-height: 300px;
    }

    @media (min-width: 1536px) {
      max-height: 360px;
    }
  `,
]);

const MobileFavoriteMusicCount = styled.div(() => [tw`justify-self-end pr-1`]);

const MobileFavoriteMusicInfo = styled.div(() => []);

const MobileFavoriteMusicIconContainer = styled.div(() => [
  tw`absolute top-0 left-0 w-full h-full flex justify-center items-center`,
]);

const MobileFavoriteMusicCover = styled(Image)(() => [tw`rounded-lg`]);

const MobileFavoriteMusicCoverContainer = styled.div(() => [tw`relative`]);

const MobileFavoriteMuiscLoadingCount = styled.div(() => [
  BaseSkeletonStyles,
  tw`w-20 h-5 justify-self-end pr-1 animate-pulse`,
]);

const MobileFavoriteMuiscLoadingCaption = styled.div(() => [
  BaseSkeletonStyles,
  tw`w-8 h-3`,
]);

const MobileFavoriteMuiscLoadingTitle = styled.div(() => [
  BaseSkeletonStyles,
  tw`w-20 h-5 mb-2`,
]);

const MobileFavoriteMuiscLoadingTitleContianer = styled.div(() => [
  tw`animate-pulse`,
]);

const MobileFavoriteMuiscLoadingCover = styled(Image)(() => [
  BaseSkeletonStyles,
  tw`animate-pulse`,
]);

const MobileFavoriteMusicWrapper = styled.div(() => [
  tw`grid gap-x-3 items-center md:hidden m-5 p-2 rounded-lg shadow-lg`,
  css`
    grid-template-columns: 19% auto auto;
  `,
]);

const PlayCountContainer = styled.div(() => [
  tw`absolute top-1 lg:top-2 right-1 lg:right-2`,
]);

const GlassTitleContainer = styled.div(() => [
  tw`absolute left-2 lg:left-4 bottom-2 lg:bottom-4 flex p-2 rounded-xl opacity-90`,
  css`
    background: rgba(56, 59, 101, 0.3);
    /* GlassBackground */

    backdrop-filter: blur(8px);
    /* Note: backdrop-filter has minimal browser support */
    & > span {
      ${tw`ml-2 text-dark-mode-text`}
    }
  `,
]);

const GlassButtonContainer = styled.div(() => [
  tw`absolute w-full h-full top-0 left-0 flex justify-center items-center invisible`,
]);

const FavoriteMusicCover = styled(Image)(() => [
  tw`rounded-md md:rounded-lg overflow-hidden transition`,
]);

const LoadingCover = styled(FavoriteMusicCover)(() => [
  BaseSkeletonStyles,
  tw``,
]);

const FavoriteMusicCoverContainer = styled.div(() => [
  tw`relative cursor-pointer hover:shadow-xl transition`,
  css`
    &:hover {
      transform: scale(1.02);
      ${GlassButtonContainer} {
        /* transform: scale(1.02); */
        ${tw`visible`}
      }
    }
  `,
]);

const FavoriteMusicWrapper = styled.div(() => [
  tw`hidden md:grid gap-2 lg:gap-6 items-center mx-3 lg:mx-7`,
  css`
    grid-template-columns: auto 67.34%;
  `,
]);

const InfoText = styled.span(() => [
  tw`flex items-baseline`,
  css`
    & span {
      ${tw`ml-2 opacity-50`}
    }
  `,
]);

const AvatarContainer = styled.div(() => [
  BaseSkeletonStyles,
  tw`w-12 h-12 mr-3 rounded-full`,
]);

const MobileInfo = styled.div(() => [tw`block md:hidden mt-4 mb-5`]);

const Info = styled.div(() => [
  tw`hidden md:flex mt-2 lg:mt-6 mx-3 lg:mx-7 mb-3 lg:mb-7`,
]);

const LoadingInfoTitle = styled.div(() => [
  BaseSkeletonStyles,
  tw`w-60 h-12 animate-pulse`,
]);

const CaptionBoardContainer = styled.div(() => [
  tw`flex items-center mt-2 lg:mt-7 mx-2 lg:mx-7 mb-3 lg:mb-6`,
]);

const Container = styled.div(() => [tw`pb-4 md:pb-12`]);
