import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { ContextMenu, ContextMenuProps, ContextMenuItem } from "./index";
import Image from "next/image";
import { InfoText, SmallText } from "../../styles/typography";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  setCurrentSong,
  setCurrent,
  selectSonglist,
  setSonglist,
  selectCurrent,
  selectPlayMode,
  selectShuffledPlayQuene,
  selectShuffledCurrent,
} from "../../store/slice/song.slice";

export interface MoreActionMenuProps extends ContextMenuProps {
  song?: any;
}

const MoreActionMenu: React.FC<MoreActionMenuProps> = ({
  visible,
  position,
  onClose,
  song,
}) => {
  const { t } = useTranslation("common");

  const dispatch = useAppDispatch();
  const songlist = useAppSelector(selectSonglist);
  const current = useAppSelector(selectCurrent);
  const playMode = useAppSelector(selectPlayMode);
  const shuffledPlayQuene = useAppSelector(selectShuffledPlayQuene);
  const shuffledCurrent = useAppSelector(selectShuffledCurrent);

  const handleAddSong = (index: number) => {
    const newSonglist = [...songlist].splice(index, 0, song);
    dispatch(setSonglist(newSonglist));
  };

  const menu: ContextMenuItem[] = [
    {
      key: "play",
      title: t("play"),
      onClick: () => {
        const current = songlist.findIndex((item) => item.id === song.id);
        if (current < 0) {
          handleAddSong(songlist.length);
          dispatch(setCurrent(songlist.length));
        } else {
          dispatch(setCurrent(current));
        }
        dispatch(setCurrentSong(song));
        onClose();
      },
    },
    {
      key: "next-play",
      title: t("next-play"),
      onClick: () => {
        const isInQueue = songlist.some((item) => item.id === song.id);
        if (isInQueue) {
          const selectedIndex = songlist.findIndex(
            (item) => item.id === song.id
          );
          const selectedSong = songlist[selectedIndex];

          let newSonglist = [...songlist];

          if (selectedIndex > current) {
            newSonglist.splice(selectedIndex, 1);
            newSonglist.splice(current + 1, 0, selectedSong);
          } else {
            newSonglist.splice(selectedIndex, 1);
            newSonglist.splice(current, 0, selectedSong);
            dispatch(setCurrent(current - 1));
          }

          dispatch(setSonglist(newSonglist));
        } else {
          handleAddSong(current + 1);
        }
        onClose();
      },
    },
    {
      key: "add-to-queue",
      title: t("add-to-queue"),
      onClick: () => {
        const current = songlist.findIndex((item) => item.id === song.id);
        current < 0 && handleAddSong(songlist.length);
        onClose();
      },
    },
    {
      key: "collect-to-playlist",
      title: t("collect-to-playlist"),
      onClick: () => {},
    },
  ];

  return (
    <ContextMenu
      visible={visible}
      position={position}
      menu={menu}
      onClose={onClose}
    >
      {visible && (
        <>
          <InfoContainer>
            <Cover>
              <Image src={song?.al?.picUrl + "?param=100y100"} layout="fill" />
            </Cover>
            <Info>
              <Name bold>{song?.name}</Name>
              <Artists>
                {song?.ar?.map((artist, index) => (
                  <ArtistContainer key={artist.id}>
                    <Artist>
                      <SmallText>{artist.name}</SmallText>
                    </Artist>
                    {index !== song?.ar?.length - 1 && (
                      <SmallText>,&nbsp;&nbsp;</SmallText>
                    )}
                  </ArtistContainer>
                ))}
              </Artists>
            </Info>
          </InfoContainer>
        </>
      )}
    </ContextMenu>
  );
};

export default MoreActionMenu;

const Artist = styled(SmallText)(() => []);

const ArtistContainer = styled.span(() => []);

const Artists = styled.div(() => [
  css`
    line-height: 17px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
]);

const Name = styled(InfoText)(() => [
  tw`text-light-mode-text`,
  css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
]);

const Info = styled.div(() => [
  tw`flex flex-col justify-center`,
  css`
    max-width: 128px;
    min-width: 128px;
  `,
]);

const Cover = styled.div(() => [
  tw`relative w-12 h-12 rounded-lg overflow-hidden`,
]);

const InfoContainer = styled.div(() => [
  tw`grid gap-2`,
  css`
    grid-template-columns: 48px auto;
  `,
]);
