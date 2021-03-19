import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { PlaylistIntroCard, PlaylistItemCard } from "../../components/cards";
import { usePlaylistDetail } from "../../hooks";
import { LoadingContainer } from "../../components/containers";

export interface PlaylistIdProps {}

const PlaylistId: React.FC<PlaylistIdProps> = () => {
  const { query } = useRouter();
  const [songLimit, setSongLimit] = useState(30);

  const { playlistInfo, playlistSongs, isLoading } = usePlaylistDetail({
    id: query.id as string,
    limit: songLimit,
  });

  return (
    <Container>
      <PlaylistInfo>
        {isLoading ? (
          <LoadingContainer></LoadingContainer>
        ) : (
          playlistInfo && (
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
          )
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
              albumId={song.al.id}
              duration={song.dt}
              isLike={false}
            />
          ))}
      </PlaylistSongs>

      <div onClick={() => setSongLimit((value) => value + 30)}>加载更多</div>
    </Container>
  );
};

export default PlaylistId;

const PlaylistSongs = styled.div(() => [tw`pb-5 lg:p-10`]);

const PlaylistInfo = styled.div(() => [tw`p-5 md:px-0 md:py-5  lg:p-10`]);

const Container = styled.div(() => [tw``]);
