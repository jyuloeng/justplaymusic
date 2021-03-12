import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { ArtistCard, AvatarCard } from "../../components/cards";
import { CaptionBoard } from "../../components/boards";
import { MiniPlaylistItemCard, MediaCard } from "../../components/cards";
import { scrollbarHiddenStyles } from "../index";
import { getSpecifiedArrayElements } from "../../lib/array";

export interface ArtistProps {}

const coverPath =
  "https://p2.music.126.net/R5fsMgpLHC9mJbLLA6EKLA==/109951164561120345.jpg?param=512y512";

const Artist: React.FC<ArtistProps> = () => {
  const { query } = useRouter();

  const [artist, setArtist] = useState(null);
  const [hotSongs, setHotSongs] = useState([]);
  const [singleAlbums, setSingleAlbums] = useState([]);
  const [defaultalbums, setDefaultalbums] = useState([]);
  const [movies, setMovies] = useState([]);
  const [similarArtists, setSimilarArtists] = useState([]);
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

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/artists?id=7763&timestamp=1615530859019&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { artist: resArtist, hotSongs: resHotSongs } = data;
        setArtist(resArtist);
        setHotSongs(resHotSongs);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/artist/album?id=7763&limit=200&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { hotAlbums } = data;
        const sAlbums = [];
        const dAlbums = [];
        hotAlbums.forEach((item) => {
          if (item.type !== "专辑") {
            sAlbums.push(item);
          } else {
            dAlbums.push(item);
          }
        });

        setSingleAlbums(sAlbums);
        setDefaultalbums(dAlbums);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/artist/mv?id=7763&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { mvs } = data;
        setMovies(mvs);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://music.qier222.com/api/simi/artist?id=7763&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B"
    )
      .then((res) => res.json())
      .then((data) => {
        const { artists } = data;
        setSimilarArtists(artists);
      });
  }, []);

  return (
    <Container>
      <ArtistCardContainer>
        {artist && (
          <ArtistCard
            src={artist.picUrl + "?param=512y512"}
            title={artist.name}
            caption={artist.alias?.join(", ")}
            songs={artist.musicSize}
            albums={artist.albumSize}
            movies={artist.mvSize}
          />
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
              cardType="album"
              coverPath={album.picUrl + "?param=512y512"}
              title={album.name}
              caption={album.type + " - " + album.publishTime}
              isShowPlayCount={false}
              isCanCaptionClick={false}
            />
          ))}
        </PlaylistContainer>
      </PlaylistWrapper>

      <CaptionBoardContainer>
        <CaptionBoard
          caption="Moives"
          moreText="查看全部"
          onMoreClick={handleAllMoives}
        />
      </CaptionBoardContainer>

      <RecommendMoviesWrapper>
        <RecommendMoviesContainer>
          {getSpecifiedArrayElements(movies, 8)?.map((movie) => (
            <MediaCard
              key={movie.id}
              cardType="movie"
              coverPath={movie.imgurl16v9 + "?param=464y260"}
              title={movie.name}
              caption={movie.artistName}
              playCount={movie.playCount}
            />
          ))}
        </RecommendMoviesContainer>
      </RecommendMoviesWrapper>

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
            defaultalbums,
            isShowingMoreDefaultalbums ? defaultalbums.length : 10
          )?.map((album) => (
            <MediaCard
              key={album.id}
              cardType="album"
              coverPath={album.picUrl + "?param=512y512"}
              title={album.name}
              caption={album.type + " - " + album.publishTime}
              isShowPlayCount={false}
              isCanCaptionClick={false}
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
              src={artist.picUrl + "?param=512y512"}
              caption={artist.name}
            />
          ))}
        </ArtistsConntainer>
      </ArtistsWrapper>
    </Container>
  );
};

export default Artist;

const RecommendMoviesContainer = styled.div(() => [
  tw`grid grid-cols-5 md:grid-cols-4 gap-2 lg:gap-6 pr-3 lg:pr-0`,
  css`
    @media (max-width: 767px) {
      width: 1114px;
    }
  `,
]);

const RecommendMoviesWrapper = styled.div(() => [
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
