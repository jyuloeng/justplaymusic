import { useEffect, useState, useCallback } from "react";
import tw, { styled, css } from "twin.macro";
import RcDrawer from "rc-drawer";
import { IDrawerProps } from "rc-drawer/lib/IDrawerPropTypes";
import { PlaylistItemCard, PlaylistItemCardProps } from "../cards";
import { MoreActionMenu, ContextMenuPosition } from "../menus";
import { CaptionBoard } from "../boards";
import { PlaylistItemsLoadingContainer } from "../containers";
import { IconBottomArrow } from "../../styles/icons";
import { useAppDispatch } from "../../store";
import { setCurrent, setCurrentSong } from "../../store/slice/song.slice";

export interface PlaylistDrawerMenuProps extends IDrawerProps {
  activeSong?: any;
  playlistSongs?: any[];
  likedList?: any[];
  isPlaylistSongsLoading?: boolean;
  onLoadMore?: () => void;
  onLikeClick?: (id?: number | string) => void;
}

const PlaylistDrawerMenu: React.FC<PlaylistDrawerMenuProps> = ({
  activeSong,
  playlistSongs,
  likedList,
  isPlaylistSongsLoading,
  open,
  onClose,
  onLoadMore,
  onLikeClick,
}) => {
  const dispatch = useAppDispatch();

  const [moreActionMenuVisible, setMoreActionMenuVisible] = useState(false);
  const [
    moreActionMenuPosition,
    setMoreActionMenuPostion,
  ] = useState<ContextMenuPosition>({ top: 0, left: 0 });
  const [selectedSong, setSelectedSong] = useState(null);

  const handleOnDblClick = (song) => {
    const current = playlistSongs.findIndex((item) => item.id === song.id);
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
    pageY = pageY - 800;
    setMoreActionMenuPostion({
      left: pageX,
      top: pageY,
    });
    setSelectedSong(song);
    setMoreActionMenuVisible(true);
  };

  const handleScroll = useCallback(() => {
    const drawerContent = document.querySelector(
      ".playlist-drawer .drawer-content"
    );
    let timer = null;

    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (drawerContent) {
          const { scrollHeight, clientHeight, scrollTop } = drawerContent;

          if (scrollHeight - clientHeight > scrollTop + 56) {
          } else {
            onLoadMore && onLoadMore();
          }
        }
      }, 1600);
    };
  }, []);

  useEffect(() => {
    const drawerContent = document.querySelector(
      ".playlist-drawer .drawer-content"
    );

    drawerContent?.addEventListener("scroll", handleScroll);
    return () => {
      drawerContent?.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <RcDrawer
      open={open}
      onClose={onClose}
      level={null}
      handler={false}
      placement="bottom"
      height={740}
      className="playlist-drawer"
      onScroll={handleScroll}
    >
      <Container>
        <CaptionBoardContainer>
          <CaptionBoard
            caption={"播放列表"}
            moreText={<IconBottomArrow />}
            onMoreClick={onClose}
          />
        </CaptionBoardContainer>

        <PlaylistSongs>
          {playlistSongs?.map((song, index) => (
            <PlaylistItemCard
              key={song.id}
              itemType={
                song.playable
                  ? activeSong?.id === song.id
                    ? "active"
                    : "default"
                  : "disabled"
              }
              title={song.reason}
              coverPath={(song?.picUrl || song?.al?.picUrl) + "?param=100y100"}
              index={index + 1}
              name={song.name}
              artists={song?.song?.artists || song?.ar}
              album={song?.song?.album?.name || song?.al?.name}
              albumId={song?.song?.album?.id || song?.al?.id}
              duration={song?.song?.duration || song?.dt}
              isLike={likedList?.includes(song.id)}
              onLikeClick={() => onLikeClick(song.id)}
              onDblClick={() => handleOnDblClick(song)}
              onContextMenuClick={(e) => handleOnContextMenuClick(e, song)}
            />
          ))}

          {(isPlaylistSongsLoading || !playlistSongs) && (
            <PlaylistItemsLoadingContainer />
          )}
        </PlaylistSongs>
      </Container>

      {selectedSong?.id && (
        <MoreActionMenu
          visible={moreActionMenuVisible}
          onClose={() => setMoreActionMenuVisible(false)}
          song={selectedSong}
          position={moreActionMenuPosition}
        />
      )}
    </RcDrawer>
  );
};

export default PlaylistDrawerMenu;

const PlaylistSongs = styled.div(() => [tw``]);

const CaptionBoardContainer = styled.div(() => [
  tw`mt-2 lg:mt-5 mx-0 mb-2 lg:mb-4`,
]);

const Container = styled.div(() => [
  tw`relative container mx-auto py-1 pb-36 md:pb-24`,
]);
