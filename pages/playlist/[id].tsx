import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { PlaylistIntroCard, PlaylistItemCard } from "../../components/cards";

export interface PlaylistIdProps {}

const PlaylistId: React.FC<PlaylistIdProps> = () => {
  const { query, isReady } = useRouter();
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  useEffect(() => {
    if (isReady) {
      const { id } = query;
      fetch(
        `https://music.qier222.com/api/playlist/detail?id=${id}&timestamp=1615701213657&cookie=MUSIC_U%3Dac2ca8ce9ac4408d61fd56742d80bf7d560b058dc10be820f632b99b1162dfc933a649814e309366%3B`
      )
        .then((res) => res.json())
        .then((data) => {
          const { playlist } = data;
          setPlaylistInfo(playlist);

          const { trackIds } = playlist;
          const ids = trackIds?.map((item) => item.id);

          fetch(
            `https://music.qier222.com/api/song/detail?ids=${ids.join(",")}`
          )
            .then((res) => res.json())
            .then((songsData) => {
              const { songs } = songsData;
              setPlaylistSongs(songs);
            });
        });
    }
  }, [isReady]);

  return (
    <Container>
      <PlaylistInfo>
        {playlistInfo && (
          <PlaylistIntroCard
            introType="playlist"
            coverPath={playlistInfo.coverImgUrl + "?param=512y512"}
            title={playlistInfo.name}
            artist={playlistInfo.creator.nickname}
            avatarPath={playlistInfo.creator.avatarUrl + "?param=128y128"}
            publishTime={playlistInfo.createTime}
            songs={playlistInfo.trackCount}
            description={playlistInfo.description}
          />
        )}
      </PlaylistInfo>

      <PlaylistSongs>
        {playlistSongs &&
          playlistSongs?.map((song, index) => (
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
              duration={song.dt}
              isLike={false}
            />
          ))}
      </PlaylistSongs>
    </Container>
  );
};

export default PlaylistId;

const PlaylistSongs = styled.div(() => [tw`pb-5 lg:p-10`]);

const PlaylistInfo = styled.div(() => [tw`p-5 md:px-0 md:py-5  lg:p-10`]);

const Container = styled.div(() => [tw``]);
