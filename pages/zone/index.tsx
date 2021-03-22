import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
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
import { CaptionBoard } from "../../components/boards";
import { GlassButton, Button } from "../../components/buttons";
import { CaptionText, H3, IntroText, SmallText } from "../../styles/typography";
import { DarkModeTextColor } from "../../styles/colors";
import { IconHeart, IconPlay } from "../../styles/icons";
import { getSpecifiedArrayElements } from "../../lib/array";
import { useUserPlaylist, useUserProfile } from "../../hooks";

export interface ZoneProps {}
type commonLikedRes = {
  code?: number;
  count?: number;
  data?: any[];
  hasMore?: boolean;
  paidCount?: number;
};

const cookie = `MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`;

const Zone: React.FC<ZoneProps> = () => {
  const { t } = useTranslation("zone");

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

  const [myFavoriteMusic, setMyFavoriteMusic] = useState([]);
  const [activeTab, setActiveTab] = useState(tabsMenu[0].key);

  const [likedAlbumsRes, setLikedAlbumsRes] = useState<commonLikedRes>(null);
  const [likedArtistsRes, setLikedArtistsRes] = useState<commonLikedRes>(null);
  const [likedMvsRes, setLikedMvsRes] = useState<commonLikedRes>(null);

  const handleTabClick = (key) => {
    setActiveTab(() => key);
    if (key === "playlist") return;

    fetch(
      `https://music.qier222.com/api/${key}/sublist?timestamp=1615620385018&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
    )
      .then((res) => res.json())
      .then((data) => {
        if (key === "album") {
          setLikedAlbumsRes(data);
        } else if (key === "artist") {
          setLikedArtistsRes(data);
        } else if (key === "mv") {
          setLikedMvsRes(data);
        }
      });
  };

  const { userProfile } = useUserProfile(cookie);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/playlist/detail?id=130220621&timestamp=1615605691245&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const myFavoriteMusicIds = [];
        getSpecifiedArrayElements(data.playlist.trackIds, 16).forEach((item) =>
          myFavoriteMusicIds.push(item.id)
        );

        fetch(
          `https://music.qier222.com/api/song/detail?ids=${myFavoriteMusicIds.join(
            ","
          )}&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
        )
          .then((res) => res.json())
          .then((data) => {
            const { songs } = data;
            setMyFavoriteMusic(songs);
          });
      });
  }, []);

  const { userPlaylistRes } = useUserPlaylist({
    uid: 107112048,
  });

  return (
    <Container>
      {userProfile && (
        <>
          <Info>
            <AvatarContainer>
              <Avatar src={userProfile?.avatarUrl + "?param=256y256"} />
            </AvatarContainer>
            <InfoText>
              <H3>{userProfile?.nickname}</H3>
              <IntroText bold>{t("user-zone")}</IntroText>
            </InfoText>
          </Info>

          <MobileInfo>
            <ArtistCard
              id={userProfile?.id}
              src={userProfile?.avatarUrl + "?param=256y256"}
              title={userProfile?.nickname}
              isShowCollect={false}
            />
          </MobileInfo>
        </>
      )}

      <FavoriteMusicWrapper>
        {myFavoriteMusic[0] && (
          <FavoriteMusicCoverContainer>
            <FavoriteMusicCover
              src={myFavoriteMusic[0].al.picUrl + "?param=560y420"}
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
        )}

        <FavoriteMusicContainer>
          <FavoriteMusic>
            {myFavoriteMusic?.map((song, index) => (
              <PlaylistItemCard
                key={song.id}
                itemType={
                  index === 0 ? "active" : index === 3 ? "disabled" : "default"
                }
                coverPath={song.al.picUrl + "?param=100y100"}
                index={index + 1}
                name={song.name}
                artists={song.ar}
                album={song.al.name}
                albumId={song.al.id}
                duration={song.dt}
                isLike={false}
                onDblClick={(e, id) => console.log(e, id)}
              />
            ))}
          </FavoriteMusic>
        </FavoriteMusicContainer>
      </FavoriteMusicWrapper>

      <MobileFavoriteMusicWrapper>
        {myFavoriteMusic[0] && (
          <MobileFavoriteMusicCoverContainer>
            <MobileFavoriteMusicCover
              src={myFavoriteMusic[0].al.picUrl + "?param=100y100"}
              layout="responsive"
              width={60}
              height={60}
            />

            <MobileFavoriteMusicIconContainer>
              <IconHeart fill={DarkModeTextColor} />
            </MobileFavoriteMusicIconContainer>
          </MobileFavoriteMusicCoverContainer>
        )}

        <MobileFavoriteMusicInfo>
          <InfoText>{t("my-favourite-music")}</InfoText>
          <SmallText>{t("songs-count", { count: 249 })}</SmallText>
        </MobileFavoriteMusicInfo>

        <MobileFavoriteMusicCount>
          <PlayCountCard count="860 thousand" cardType="solid" />
        </MobileFavoriteMusicCount>
      </MobileFavoriteMusicWrapper>

      <CaptionBoardContainer>
        {tabsMenu.map((tab) => (
          <Button
            key={tab.key}
            btnType={activeTab === tab.key ? "primary" : "default"}
            onClick={() => handleTabClick(tab.key)}
          >
            <CaptionText bold>{tab.name}</CaptionText>
          </Button>
        ))}
      </CaptionBoardContainer>

      {activeTab === "playlist" && (
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
      )}

      {activeTab === "album" && (
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
      )}

      {activeTab === "artist" && (
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
      )}

      {activeTab === "mv" && (
        <MvsContainer>
          {likedMvsRes?.data?.map((mv) => (
            <MediaCard
              key={mv.id}
              href={`/mv/${mv.id}`}
              cardType="mv"
              coverPath={mv.coverUrl + "?param=464y260"}
              title={mv.title}
              caption={mv.type === 0 ? mv.creator[0].userName : ""}
              playCount={mv.playTime}
            />
          ))}
        </MvsContainer>
      )}
    </Container>
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

const MobileFavoriteMusicWrapper = styled.div(() => [
  tw`grid gap-x-3 items-center md:hidden mx-5 p-2 rounded-lg shadow-lg`,
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
  tw`md:rounded-xl rounded-lg md:rounded-xl overflow-hidden transition`,
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

const AvatarContainer = styled.div(() => [tw`w-12 h-12 mr-3`]);

const MobileInfo = styled.div(() => [tw`block md:hidden mt-4 mb-5`]);

const Info = styled.div(() => [
  tw`hidden md:flex mt-2 lg:mt-6 mx-3 lg:mx-7 mb-3 lg:mb-7`,
]);

const CaptionBoardContainer = styled.div(() => [
  tw`flex items-center mt-2 lg:mt-7 mx-2 lg:mx-7 mb-3 lg:mb-6`,
]);

const Container = styled.div(() => []);
