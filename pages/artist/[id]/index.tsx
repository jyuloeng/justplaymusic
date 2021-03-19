import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { Router, useRouter } from "next/router";
import { ArtistCard, AvatarCard } from "../../../components/cards";
import { CaptionBoard } from "../../../components/boards";
import { MiniPlaylistItemCard, MediaCard } from "../../../components/cards";
import { LoadingContainer } from "../../../components/containers";
import { scrollbarHiddenStyles } from "../../index";
import { getSpecifiedArrayElements } from "../../../lib/array";
import { formatDate } from "../../../lib/format";
import {
  useArtist,
  useArtistAlbum,
  useArtistMV,
  useSimiArtist,
} from "./../../../hooks/artist";

export interface ArtistIdProps {}

const ArtistId: React.FC<ArtistIdProps> = () => {
  const router = useRouter();

  const [isShowingMoreHotSons, setIsShowingMoreHotSons] = useState<boolean>(
    false
  );

  const [
    isShowingMoreSingleAlbums,
    setIsShowingMoreSingleAlbums,
  ] = useState<boolean>(false);

  const [
    isShowingMoreDefaultalbums,
    setIsShowingMoreDefaultalbums,
  ] = useState<boolean>(false);

  const [
    isShowingMoreSimilarArtists,
    setIsShowingMoreSimilarArtists,
  ] = useState<boolean>(false);

  const handleAllMoives = () => {};
  const handleOnContextMenuClick = () => {};

  const handleMoreHotSongs = () => {
    setIsShowingMoreHotSons((value) => !value);
  };

  const handleMoreSingleAlbums = () => {
    setIsShowingMoreSingleAlbums((value) => !value);
  };

  const handleMoreDefaultalbums = () => {
    setIsShowingMoreDefaultalbums((value) => !value);
  };

  const handleMoreMoreSimilarArtists = () => {
    setIsShowingMoreSimilarArtists((value) => !value);
  };

  const { artist, hotSongs, isLoading: isArtistLoading } = useArtist(
    router.query.id as string
  );

  const {
    singleAlbums,
    defaultAlbums,
    isLoading: isArtistAlbumLoading,
  } = useArtistAlbum({
    id: router.query.id as string,
    limit: 200,
  });

  const { mvs, isLoading: isMVLoading } = useArtistMV({
    id: router.query.id as string,
    limit: 8,
  });

  const { similarArtists, isLoading: isSimiArtistLoading } = useSimiArtist(
    router.query.id as string
  );

  return (
    <Container>
      <ArtistCardContainer>
        {isArtistLoading ? (
          <LoadingContainer></LoadingContainer>
        ) : (
          artist && (
            <ArtistCard
              id={artist.id}
              src={artist.picUrl + "?param=512y512"}
              title={artist.name}
              caption={artist.alias?.join(", ")}
              songs={artist.musicSize}
              albums={artist.albumSize}
              mvs={artist.mvSize}
            />
          )
        )}
      </ArtistCardContainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="热门歌曲"
          moreText={isShowingMoreHotSons ? "收起" : "更多"}
          onMoreClick={handleMoreHotSongs}
        />
      </CaptionBoardContainer>

      <HotSongsContainer>
        {isArtistLoading ? (
          <LoadingContainer></LoadingContainer>
        ) : (
          <HotSongs>
            {getSpecifiedArrayElements(
              hotSongs,
              isShowingMoreHotSons ? 24 : 12
            )?.map((song, index) => (
              <MiniPlaylistItemCard
                key={song.id}
                itemType={
                  index === 0 ? "active" : index === 3 ? "disabled" : "default"
                }
                coverPath={song.al.picUrl + "?param=100y100"}
                name={song.name}
                artists={song.ar}
                isShowHover={true}
                onDblClick={(e, id) => console.log(e, id)}
                onContextMenuClick={handleOnContextMenuClick}
              />
            ))}
          </HotSongs>
        )}
      </HotSongsContainer>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="EP与单曲"
          moreText={isShowingMoreSingleAlbums ? "收起" : "更多"}
          onMoreClick={handleMoreSingleAlbums}
        />
      </CaptionBoardContainer>

      <PlaylistWrapper>
        <PlaylistContainer>
          {getSpecifiedArrayElements(
            singleAlbums,
            isShowingMoreSingleAlbums ? singleAlbums.length : 10
          )?.map((album) => (
            <MediaCard
              key={album.id}
              href={`/album/${album.id}`}
              cardType="album"
              coverPath={album.picUrl + "?param=512y512"}
              title={album.name}
              caption={album.type + " - " + formatDate(album.publishTime)}
              isShowPlayCount={false}
              isCanCaptionClick={false}
              onTitleClick={() => router.push(`/album/${album.id}`)}
            />
          ))}
        </PlaylistContainer>
      </PlaylistWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="Music Video"
          moreText="查看全部"
          onMoreClick={handleAllMoives}
        />
      </CaptionBoardContainer>

      <RecommendMvsWrapper>
        <RecommendMvsContainer>
          {mvs?.map((mv) => (
            <MediaCard
              key={mv.id}
              href={`/mv/${mv.id}`}
              cardType="mv"
              coverPath={mv.imgurl16v9 + "?param=464y260"}
              title={mv.name}
              caption={mv.artistName}
              playCount={mv.playCount}
            />
          ))}
        </RecommendMvsContainer>
      </RecommendMvsWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="专辑"
          moreText={isShowingMoreDefaultalbums ? "收起" : "更多"}
          onMoreClick={handleMoreDefaultalbums}
        />
      </CaptionBoardContainer>

      <PlaylistWrapper>
        <PlaylistContainer>
          {getSpecifiedArrayElements(
            defaultAlbums,
            isShowingMoreDefaultalbums ? defaultAlbums.length : 10
          )?.map((album) => (
            <MediaCard
              key={album.id}
              href={`/album/${album.id}`}
              cardType="album"
              coverPath={album.picUrl + "?param=512y512"}
              title={album.name}
              caption={album.type + " - " + formatDate(album.publishTime)}
              isShowPlayCount={false}
              isCanCaptionClick={false}
              onTitleClick={() => router.push(`/album/${album.id}`)}
            />
          ))}
        </PlaylistContainer>
      </PlaylistWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="相似歌手"
          moreText={isShowingMoreSimilarArtists ? "收起" : "更多"}
          onMoreClick={handleMoreMoreSimilarArtists}
        />
      </CaptionBoardContainer>

      <ArtistsWrapper>
        <ArtistsConntainer>
          {getSpecifiedArrayElements(
            similarArtists,
            isShowingMoreSimilarArtists ? similarArtists.length : 12
          )?.map((artist) => (
            <AvatarCard
              key={artist.id}
              id={artist.id}
              src={artist.picUrl + "?param=512y512"}
              caption={artist.name}
            />
          ))}
        </ArtistsConntainer>
      </ArtistsWrapper>
    </Container>
  );
};

export default ArtistId;

const RecommendMvsContainer = styled.div(() => [
  tw`grid grid-cols-5 md:grid-cols-4 gap-2 lg:gap-6 pr-3 lg:pr-0`,
  css`
    @media (max-width: 767px) {
      width: 1114px;
    }
  `,
]);

const RecommendMvsWrapper = styled.div(() => [
  scrollbarHiddenStyles,
  tw`pl-3 lg:pl-0 lg:mx-7 overflow-x-scroll md:overflow-visible`,
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

const HotSongs = styled.div(() => [
  tw`grid grid-cols-4 gap-2 md:w-full ml-3 md:ml-0 pr-3 md:pr-0`,
  css`
    width: 800px;
  `,
]);

const HotSongsContainer = styled.div(() => [
  scrollbarHiddenStyles,
  tw`lg:mx-5 overflow-x-scroll`,
]);

const CaptionBoardContainer = styled.div(() => [
  tw`mt-2 lg:mt-7 mx-2 lg:mx-7 mb-3 lg:mb-6`,
]);

const ArtistCardContainer = styled.div(() => [tw`p-5 md:p-10`]);

const Container = styled.div(() => [tw``]);
