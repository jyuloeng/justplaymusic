import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { PlaylistIntroCard, PlaylistItemCard } from "../../components/cards";
import { usePlaylistDetail } from "../../hooks";

export interface PlaylistIdProps {}

const PlaylistId: React.FC<PlaylistIdProps> = () => {
  const { query } = useRouter();

  const { playlistInfo, playlistSongs } = usePlaylistDetail(query.id as string);

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
