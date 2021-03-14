import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { PlaylistIntroCard, PlaylistItemCard } from "../../components/cards";

export interface AlbumIdProps {}

const AlbumId: React.FC<AlbumIdProps> = () => {
  const { query, isReady } = useRouter();
  const [albumInfo, setAlbumInfo] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);

  useEffect(() => {
    if (isReady) {
      const { id } = query;
      fetch(
        `https://music.qier222.com/api/album?id=${id}&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
      )
        .then((res) => res.json())
        .then((data) => {
          const { album, songs } = data;
          setAlbumInfo(album);
          setAlbumSongs(songs);
        });
    }
  }, [isReady]);

  return (
    <Container>
      <AlbumIntro>
        {albumInfo && (
          <PlaylistIntroCard
            introType="album"
            coverPath={albumInfo.picUrl + "?param=512y512"}
            title={albumInfo.name}
            alias={albumInfo.alias[0]}
            artist={albumInfo.artist.name}
            songs={albumInfo.size}
            publishTime={albumInfo.publishTime}
            description={albumInfo.description}
          />
        )}
      </AlbumIntro>

      <AlbumSongs>
        {albumSongs?.map((song, index) => (
          <PlaylistItemCard
            key={song.id}
            itemType="default"
            index={index + 1}
            isAlbum={true}
            isShowCover={false}
            name={song.name}
            artists={song.ar}
            album={song.al.name}
            duration={song.dt}
          />
        ))}
      </AlbumSongs>
    </Container>
  );
};

export default AlbumId;

const AlbumSongs = styled.div(() => [tw`mt-11`]);

const AlbumIntro = styled.div(() => [tw``]);

const Container = styled.div(() => [tw`md:p-10`]);
