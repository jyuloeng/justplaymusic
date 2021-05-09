import React, { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { PlaylistIntroCard, PlaylistItemCard } from "../../components/cards";
import { PlaylistItemsLoadingContainer } from "../../components/containers";
import { Modal } from "../../components/controls";
import { InfoText, MediumText } from "../../styles/typography";
import { useAlbum, useMutateLikeSong } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectCurrentSong,
  selectSonglist,
  setCurrent,
  setCurrentSong,
  setSonglist,
  setSonglistInfo,
} from "../../store/slice/song.slice";
import { selectLikedList } from "../../store/slice/user.slice";
import { ContextMenuPosition } from "../../components/menus";

export interface AlbumIdProps {}

const AlbumId: React.FC<AlbumIdProps> = () => {
  const { query } = useRouter();

  const dispatch = useAppDispatch();

  const songlist = useAppSelector(selectSonglist);
  const currentSong = useAppSelector(selectCurrentSong);
  const likedList = useAppSelector(selectLikedList);

  const [modalVisivle, setModalVisible] = useState(false);
  const [moreActionMenuVisible, setMoreActionMenuVisible] = useState(false);
  const [
    moreActionMenuPosition,
    setMoreActionMenuPostion,
  ] = useState<ContextMenuPosition>({ top: 0, left: 0 });
  const [selectedSong, setSelectedSong] = useState(null);

  const { mutateAsync } = useMutateLikeSong({
    id: selectedSong?.id,
    like: likedList?.includes(selectedSong?.id),
  });

  const { albumInfo, albumSongs, isLoading, errorMsg } = useAlbum(
    query.id as string
  );

  const handlePlayAll = () => {
    if (albumSongs.length > 0) {
      dispatch(setSonglistInfo(albumInfo));
      dispatch(setSonglist(albumSongs));
      dispatch(setCurrent(0));
      dispatch(setCurrentSong(albumSongs[0]));
    }
  };

  const handleOnDblClick = (song) => {
    const current = albumSongs.findIndex((item) => item.id === song.id);
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

  const handleLikeSong = (song) => {
    setSelectedSong(song);
    const like = !likedList?.includes(song.id);
    mutateAsync({
      id: song.id,
      like,
    });
  };

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
            onDescriptionClick={() => setModalVisible(true)}
            onPlayAllClick={() => handlePlayAll()}
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
              onLikeClick={() => handleLikeSong(song)}
              onDblClick={() => handleOnDblClick(song)}
              onContextMenuClick={(e) => handleOnContextMenuClick(e, song)}
            />
          ))}
          {(isLoading || !albumSongs) && <PlaylistItemsLoadingContainer />}
        </AlbumSongs>
      </Container>

      {albumInfo && (
        <Modal visible={modalVisivle} onClose={() => setModalVisible(false)}>
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
