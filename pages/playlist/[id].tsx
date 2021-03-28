import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { PlaylistIntroCard, PlaylistItemCard } from "../../components/cards";
import { usePlaylistDetail } from "../../hooks";
import {
  LoadingContainer,
  PlaylistItemsLoadingContainer,
} from "../../components/containers";
import { Modal } from "../../components/controls";
import { InfoText, MediumText } from "../../styles/typography";

export interface PlaylistIdProps {}

const PlaylistId: React.FC<PlaylistIdProps> = () => {
  const { query } = useRouter();
  const [songLimit, setSongLimit] = useState(30);
  const [visivle, setVisible] = useState(false);

  const {
    playlistInfo,
    playlistSongs,
    isLoading: isPlaylistInfoLoading,
    isPlaylistSongsLoading,
  } = usePlaylistDetail({
    id: query.id as string,
    limit: songLimit,
  });

  return (
    <>
      <Container>
        <PlaylistInfo>
          <PlaylistIntroCard
            isLoading={isPlaylistInfoLoading}
            introType="playlist"
            coverPath={
              playlistInfo
                ? playlistInfo.coverImgUrl + "?param=512y512"
                : "/images/cover-placeholder.webp"
            }
            title={playlistInfo?.name}
            artist={playlistInfo?.creator?.nickname}
            avatarPath={
              playlistInfo
                ? playlistInfo?.creator?.avatarUrl + "?param=128y128"
                : "/images/cover-placeholder.webp"
            }
            publishTime={playlistInfo?.createTime}
            songs={playlistInfo?.trackCount}
            description={playlistInfo?.description}
            onDescriptionClick={() => setVisible(true)}
          />
        </PlaylistInfo>

        <PlaylistSongs>
          {playlistSongs?.map((song, index) => (
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

          {(isPlaylistSongsLoading ||
            isPlaylistInfoLoading ||
            !playlistSongs) && <PlaylistItemsLoadingContainer />}
        </PlaylistSongs>

        <div onClick={() => setSongLimit((value) => value + 30)}>加载更多</div>
      </Container>

      {playlistInfo && (
        <Modal visible={visivle} onClose={() => setVisible(false)}>
          <ModalContentContainer>
            <ModalTitle bold>{playlistInfo?.name}</ModalTitle>
            <ModalDescription>{playlistInfo?.description}</ModalDescription>
          </ModalContentContainer>
        </Modal>
      )}
    </>
  );
};

export default PlaylistId;

const ModalDescription = styled(InfoText)(() => [tw`block mt-4`]);

const ModalTitle = styled(MediumText)(() => [tw``]);

const ModalContentContainer = styled.div(() => [tw``]);

const PlaylistSongs = styled.div(() => [tw`pb-5 lg:p-10`]);

const PlaylistInfo = styled.div(() => [tw`p-5 md:px-0 md:py-5  lg:p-10`]);

const Container = styled.div(() => [tw``]);
