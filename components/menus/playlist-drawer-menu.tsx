import tw, { styled, css } from "twin.macro";
import RcDrawer from "rc-drawer";
import { IDrawerProps } from "rc-drawer/lib/IDrawerPropTypes";
import { PlaylistItemCard } from "../cards";
import { CaptionBoard } from "../boards";
import { IconBottomArrow } from "../../styles/icons";

export interface PlaylistDrawerMenuProps extends IDrawerProps {
  activeSong?: any;
  playlistSongs?: any[];
}

const PlaylistDrawerMenu: React.FC<PlaylistDrawerMenuProps> = ({
  activeSong,
  playlistSongs,
  open,
  onClose,
}) => {
  return (
    <RcDrawer
      open={open}
      onClose={onClose}
      level={null}
      handler={false}
      placement="bottom"
      height={600}
    >
      <Container>
        {activeSong && (
          <>
            <CaptionBoardContainer>
              <CaptionBoard
                caption={"正在播放"}
                moreText={<IconBottomArrow />}
                onMoreClick={onClose}
              />
            </CaptionBoardContainer>
            <PlaylistItemCard
              itemType="active"
              coverPath={
                (activeSong?.picUrl || activeSong?.al?.picUrl) +
                "?param=100y100"
              }
              name={activeSong.name}
              artists={activeSong?.song?.artists || activeSong?.ar}
              album={activeSong?.song?.album?.name || activeSong?.al?.name}
              albumId={activeSong?.song?.album?.id || activeSong?.al?.id}
              duration={activeSong?.song?.duration || activeSong?.dt}
              isLike={false}
              onDblClick={(e, id) => console.log(e, id)}
              // onContextMenuClick={handleOnContextMenuClick}
            />
          </>
        )}

        <CaptionBoardContainer>
          <CaptionBoard
            caption={"即将播放"}
            moreText={!activeSong && <IconBottomArrow />}
            onMoreClick={onClose}
          />
        </CaptionBoardContainer>

        <PlaylistSongs>
          {playlistSongs?.map((song, index) => (
            <PlaylistItemCard
              key={song.id}
              itemType={
                index === 0 ? "active" : index === 3 ? "disabled" : "default"
              }
              coverPath={(song?.picUrl || song?.al?.picUrl) + "?param=100y100"}
              index={index + 1}
              name={song.name}
              artists={song?.song?.artists || song?.ar}
              album={song?.song?.album?.name || song?.al?.name}
              albumId={song?.song?.album?.id || song?.al?.id}
              duration={song?.song?.duration || song?.dt}
              isLike={false}
              onDblClick={(e, id) => console.log(e, id)}
              // onContextMenuClick={handleOnContextMenuClick}
            />
          ))}
        </PlaylistSongs>
      </Container>
    </RcDrawer>
  );
};

export default PlaylistDrawerMenu;

const PlaylistSongs = styled.div(() => [tw``]);

const CaptionBoardContainer = styled.div(() => [
  tw`mt-2 lg:mt-5 mx-0 mb-2 lg:mb-4`,
]);

const Container = styled.div(() => [tw`container mx-auto py-1 md:py-6`]);
