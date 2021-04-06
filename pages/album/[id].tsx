import React, { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { PlaylistIntroCard, PlaylistItemCard } from "../../components/cards";
import { PlaylistItemsLoadingContainer } from "../../components/containers";
import { Modal } from "../../components/controls";
import { InfoText, MediumText } from "../../styles/typography";
import { useAlbum } from "../../hooks";

export interface AlbumIdProps {}

const AlbumId: React.FC<AlbumIdProps> = () => {
  const { query } = useRouter();
  const [visivle, setVisible] = useState(false);

  const { albumInfo, albumSongs, isLoading, errorMsg } = useAlbum(
    query.id as string
  );

  return (
    <>
      <Container>
        <AlbumIntro>
          <PlaylistIntroCard
            isLoading={isLoading}
            introType="album"
            coverPath={
              albumInfo
                ? albumInfo?.picUrl + "?param=512y512"
                : "/images/cover-placeholder.webp"
            }
            title={albumInfo?.name}
            alias={albumInfo?.alias[0]}
            artistId={albumInfo?.artist?.id}
            artist={albumInfo?.artist?.name}
            songs={albumInfo?.size}
            publishTime={albumInfo?.publishTime}
            description={albumInfo?.description}
            onDescriptionClick={() => setVisible(true)}
          />
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
              albumId={song.al.id}
              duration={song.dt}
            />
          ))}
          {(isLoading || !albumSongs) && <PlaylistItemsLoadingContainer />}
        </AlbumSongs>
      </Container>

      {albumInfo && (
        <Modal visible={visivle} onClose={() => setVisible(false)}>
          <ModalContentContainer>
            <ModalTitle bold>{albumInfo?.name}</ModalTitle>
            <ModalDescription>{albumInfo?.description}</ModalDescription>
          </ModalContentContainer>
        </Modal>
      )}
    </>
  );
};

export default AlbumId;

const ModalDescription = styled(InfoText)(() => [tw`block mt-4`]);

const ModalTitle = styled(MediumText)(() => [tw``]);

const ModalContentContainer = styled.div(() => [tw``]);

const AlbumSongs = styled.div(() => [tw`mt-11`]);

const AlbumIntro = styled.div(() => [tw`p-5 md:px-0 md:py-5 lg:p-10`]);

const Container = styled.div(() => [tw`md:p-10`]);
