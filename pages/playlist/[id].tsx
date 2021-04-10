import React, { useState, useEffect, useRef } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import {
  selectCurrentSong,
  selectSonglist,
  setCurrent,
  setCurrentSong,
  setSonglist,
  setSonglistInfo,
} from "../../store/slice/song.slice";
import { PlaylistIntroCard, PlaylistItemCard } from "../../components/cards";
import { usePlaylistDetail } from "../../hooks";
import {
  LoadingContainer,
  PlaylistItemsLoadingContainer,
} from "../../components/containers";
import { isTrackPlayable } from "../../lib/util";
import { Modal } from "../../components/controls";
import { MoreActionMenu, ContextMenuPosition } from "../../components/menus";
import { InfoText, MediumText } from "../../styles/typography";
import { selectLikedList } from "../../store/slice/user.slice";

export interface PlaylistIdProps {}

const PlaylistId: React.FC<PlaylistIdProps> = () => {
  const { query } = useRouter();

  const dispatch = useAppDispatch();

  const containerRef = useRef<HTMLDivElement>(null);

  const songlist = useAppSelector(selectSonglist);
  const currentSong = useAppSelector(selectCurrentSong);
  const likedList = useAppSelector(selectLikedList);

  const [songLimit, setSongLimit] = useState(30);
  const [modalVisivle, setModalVisible] = useState(false);
  const [moreActionMenuVisible, setMoreActionMenuVisible] = useState(false);
  const [
    moreActionMenuPosition,
    setMoreActionMenuPostion,
  ] = useState<ContextMenuPosition>({ top: 0, left: 0 });
  const [selectedSong, setSelectedSong] = useState(null);

  const {
    playlistInfo,
    playlistSongs,
    isLoading: isPlaylistInfoLoading,
    isPlaylistSongsLoading,
  } = usePlaylistDetail({
    id: query.id as string,
    limit: songLimit,
  });

  const handlePlayAll = () => {
    if (playlistSongs.length > 0) {
      dispatch(setSonglistInfo(playlistInfo));
      dispatch(setSonglist(playlistSongs));
      dispatch(setCurrent(0));
      dispatch(setCurrentSong(playlistSongs[0]));
    }
  };

  const handleOnDblClick = (song) => {
    const current = songlist.findIndex((item) => item.id === song.id);
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

  const handleScroll = (e) => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

    if (scrollHeight - clientHeight > scrollTop + 28) {
    } else {
      setSongLimit((value) => value + 30);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(setSonglist(playlistSongs));
  }, [playlistSongs.length]);

  return (
    <>
      <Container ref={containerRef}>
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
            onDescriptionClick={() => setModalVisible(true)}
            onPlayAllClick={() => handlePlayAll()}
          />
        </PlaylistInfo>

        <PlaylistSongs>
          {playlistSongs?.map((song, index) => (
            <PlaylistItemCard
              key={song.id}
              itemType={
                song.playable
                  ? currentSong?.id === song.id
                    ? "active"
                    : "default"
                  : "disabled"
              }
              title={song.reason}
              coverPath={song.al.picUrl + "?param=100y100"}
              index={index + 1}
              name={song.name}
              artists={song.ar}
              album={song.al.name}
              albumId={song.al.id}
              duration={song.dt}
              isLike={likedList?.includes(song.id)}
              onDblClick={() => handleOnDblClick(song)}
              onContextMenuClick={(e) => handleOnContextMenuClick(e, song)}
            />
          ))}

          {(isPlaylistSongsLoading ||
            isPlaylistInfoLoading ||
            !playlistSongs) && <PlaylistItemsLoadingContainer />}
        </PlaylistSongs>

        {/* <div onClick={() => setSongLimit((value) => value + 30)}>加载更多</div> */}
      </Container>

      {playlistInfo && (
        <Modal visible={modalVisivle} onClose={() => setModalVisible(false)}>
          <ModalContentContainer>
            <ModalTitle bold>{playlistInfo?.name}</ModalTitle>
            <ModalDescription>{playlistInfo?.description}</ModalDescription>
          </ModalContentContainer>
        </Modal>
      )}

      {selectedSong?.id && (
        <MoreActionMenu
          visible={moreActionMenuVisible}
          onClose={() => setMoreActionMenuVisible(false)}
          song={selectedSong}
          position={moreActionMenuPosition}
        />
      )}
    </>
  );
};

export default PlaylistId;

const ModalDescription = styled(InfoText)(() => [tw`block mt-4`]);

const ModalTitle = styled(MediumText)(() => [tw``]);

const ModalContentContainer = styled.div(() => [tw``]);

const PlaylistSongs = styled.div(() => [tw`pb-5 lg:p-10`]);

const PlaylistInfo = styled.div(() => [tw`p-5 md:px-0 md:py-5 lg:p-10`]);

const Container = styled.div(() => [tw``]);
