import { useState, useRef } from "react";
import tw, { styled, css } from "twin.macro";
import Link from "next/link";
import Image from "next/image";
import { Slider, VolumeControl, VolumeIcon } from ".";
import { Button } from "../buttons";
import { PlaylistDrawerMenu } from "../menus";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectCurrent,
  selectCurrentSong,
  selectMute,
  selectPlayMode,
  selectShuffledPlayQuene,
  selectPlayStatus,
  selectSonglist,
  selectVolume,
  selectVolumeBeforeMute,
  setCurrent,
  setCurrentSong,
  setMute,
  setPlayMode,
  setShuffledPlayQuene,
  setVolume,
  setVolumeBeforeMute,
  selectShuffledCurrent,
  setShuffledCurrent,
} from "../../store/slice/song.slice";
import { useSongDetail } from "../../hooks";
import {
  IconHeartThread,
  IconShuffle,
  IconLyric,
  IconRepeat,
  IconPrev,
  IconNext,
  IconPlay,
  IconPause,
  IconSpeakerLarge,
  IconSpeakerLow,
  IconSpeakerMute,
  IconMusicList,
} from "../../styles/icons";
import { CaptionText, SmallText } from "../../styles/typography";

export interface PlayerProps {
  artists?: any[];
}

const baseIconSize = {
  width: 20,
  height: 20,
};

const Player: React.FC<PlayerProps> = ({ artists }) => {
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement>(null);

  const songlist = useAppSelector(selectSonglist);
  const currentSong = useAppSelector(selectCurrentSong);
  const current = useAppSelector(selectCurrent);
  const shuffledPlayQuene = useAppSelector(selectShuffledPlayQuene);
  const shuffledPlayCurrent = useAppSelector(selectShuffledCurrent);
  const playMode = useAppSelector(selectPlayMode);
  const playStatus = useAppSelector(selectPlayStatus);
  const volume = useAppSelector(selectVolume);
  const volumeBeforeMute = useAppSelector(selectVolumeBeforeMute);
  const mute = useAppSelector(selectMute);

  const [volumeControlVisible, setVolumeControlVisible] = useState(false);
  const [playlistDrawerMenuOpen, setPlaylistDrawerMenuOpen] = useState(false);

  useSongDetail(currentSong);

  const handleSetCurrentSong = (index?: number) => {
    dispatch(setCurrent(index));
    dispatch(setCurrentSong(songlist[index]));
  };

  const handleAudioEnd = () => {};

  const handlePlay = () => {};

  const handlePrev = () => {
    let prevIndex;

    if (playMode === "repeat") {
      prevIndex = current - 1;

      if (prevIndex < 0) {
        prevIndex = songlist?.length - 1;
      }
    } else if (playMode === "shuffle") {
      let prevShuffledPlayCurrent = shuffledPlayCurrent - 1;
      prevIndex = shuffledPlayQuene[prevShuffledPlayCurrent];

      if (prevShuffledPlayCurrent < 0) {
        prevIndex = Math.floor(Math.random() * songlist?.length);
        const newShuffledPlayQuene = [prevIndex, ...shuffledPlayQuene];
        prevShuffledPlayCurrent = 0;
        dispatch(setShuffledPlayQuene(newShuffledPlayQuene));
      }
      dispatch(setShuffledCurrent(prevShuffledPlayCurrent));
    }

    handleSetCurrentSong(prevIndex);
  };

  const handleNext = () => {
    let nextIndex;

    if (playMode === "repeat") {
      nextIndex = current + 1;

      if (nextIndex > songlist?.length - 1) {
        nextIndex = 0;
      }
    } else if (playMode === "shuffle") {
      let nextShuffledPlayCurrent = shuffledPlayCurrent + 1;
      nextIndex = shuffledPlayQuene[nextShuffledPlayCurrent];

      if (nextShuffledPlayCurrent > shuffledPlayQuene.length - 1) {
        nextIndex = Math.floor(Math.random() * songlist?.length);
        const newShuffledPlayQuene = [...shuffledPlayQuene, nextIndex];
        nextShuffledPlayCurrent = newShuffledPlayQuene.length - 1;
        dispatch(setShuffledPlayQuene(newShuffledPlayQuene));
      }
      dispatch(setShuffledCurrent(nextShuffledPlayCurrent));
    }

    handleSetCurrentSong(nextIndex);
  };

  const handleLyric = () => {};

  const handleShowVolumeControl = () => {
    setVolumeControlVisible((value) => !value);
  };

  const handleVolumeChange = (value?: number) => {
    dispatch(setVolume(value));
    audioRef.current.volume = value;
  };

  const handleVolumeMute = () => {
    const muteChangeAfter = !mute;

    dispatch(setMute(muteChangeAfter));
    muteChangeAfter && dispatch(setVolumeBeforeMute(volume));
    if (muteChangeAfter) {
      handleVolumeChange(0);
    } else {
      handleVolumeChange(volumeBeforeMute);
    }
  };

  const handleShowSonglist = () => {
    setPlaylistDrawerMenuOpen((value) => !value);
  };

  return (
    <>
      <Container>
        <StyledAudio controls src={currentSong?.url} ref={audioRef}>
          Your browser does not support the
          <code>audio</code> element.
        </StyledAudio>

        <MobileControlContainer>
          <MobileInfoContainer>
            <Cover
              width={44}
              height={44}
              layout="fixed"
              src={
                currentSong?.al?.picUrl
                  ? currentSong?.al?.picUrl + "?param=60y60"
                  : "/images/cover-placeholder.webp"
              }
            />
            <Info>
              <Name>{currentSong?.name}</Name>
              <Artists>
                {currentSong?.ar?.map((artist, index) => (
                  <ArtistContainer key={artist.id}>
                    <Link href={`/artist/${artist.id}`}>
                      <Artist>
                        <SmallText>{artist.name}</SmallText>
                      </Artist>
                    </Link>
                    {index !== currentSong?.ar?.length - 1 && (
                      <SmallText>,&nbsp;&nbsp;</SmallText>
                    )}
                  </ArtistContainer>
                ))}
              </Artists>
            </Info>
          </MobileInfoContainer>
          <Buttons>
            <Button icon={<IconHeartThread {...baseIconSize} />} />
            <Button icon={<IconLyric {...baseIconSize} />} />
          </Buttons>
        </MobileControlContainer>

        <Slider />

        <ControlContainer>
          <InfoContainer>
            <Cover
              width={44}
              height={44}
              layout="fixed"
              src={
                currentSong?.al?.picUrl
                  ? currentSong?.al?.picUrl + "?param=60y60"
                  : "/images/cover-placeholder.webp"
              }
            />
            <Info>
              <Name>{currentSong?.name}</Name>
              <Artists>
                {currentSong?.ar?.map((artist, index) => (
                  <ArtistContainer key={artist.id}>
                    <Link href={`/artist/${artist.id}`}>
                      <Artist>
                        <SmallText>{artist.name}</SmallText>
                      </Artist>
                    </Link>
                    {index !== currentSong?.ar?.length - 1 && (
                      <SmallText>,&nbsp;&nbsp;</SmallText>
                    )}
                  </ArtistContainer>
                ))}
              </Artists>
            </Info>
            <Button icon={<IconHeartThread {...baseIconSize} />} />
          </InfoContainer>

          <Control>
            <PlayModeButton>

            {playMode === "repeat" ? (
              <Button
                icon={<IconRepeat {...baseIconSize} />}
                onClick={() => dispatch(setPlayMode("shuffle"))}
              />
            ) : (
              <Button
                icon={<IconShuffle {...baseIconSize} />}
                onClick={() => dispatch(setPlayMode("repeat"))}
              />
            )}
            </PlayModeButton>
            <ControlButtons>
              <Button
                icon={<IconPrev {...baseIconSize} />}
                onClick={handlePrev}
              />
              <Button icon={<IconPlay width={32} height={32} />} />
              <Button
                icon={<IconNext {...baseIconSize} />}
                onClick={handleNext}
              />
            </ControlButtons>

            <VolumeControlWrapper>
              <VolumeControlContainer visible={volumeControlVisible}>
                <VolumeControl
                  min={0}
                  max={1.0}
                  step={0.1}
                  defaultValue={volume}
                  value={volume}
                  mute={mute}
                  onChange={(value) => handleVolumeChange(value)}
                  onIconClick={handleVolumeMute}
                />
              </VolumeControlContainer>
              <Button
                icon={<VolumeIcon value={volume} mute={mute} />}
                onClick={handleShowVolumeControl}
              />
            </VolumeControlWrapper>

            <MobileSonglistButton>
              <Button
                icon={<IconMusicList {...baseIconSize} />}
                marginX={2}
                onClick={handleShowSonglist}
              >
                <SmallText bold>{songlist.length}</SmallText>
              </Button>
            </MobileSonglistButton>
          </Control>

          <MetaContainer>
            <Duration>
              <CaptionText>03: 10 / 06: 02</CaptionText>
            </Duration>
            <Button icon={<IconLyric {...baseIconSize} />} />
            <Button
              icon={<IconMusicList {...baseIconSize} />}
              marginX={2}
              onClick={handleShowSonglist}
            >
              <SmallText bold>{songlist.length}</SmallText>
            </Button>
          </MetaContainer>
        </ControlContainer>
      </Container>

      <PlaylistDrawerMenu
        open={playlistDrawerMenuOpen}
        onClose={() => setPlaylistDrawerMenuOpen(false)}
        activeSong={currentSong}
        playlistSongs={songlist}
      />
    </>
  );
};

export default Player;

const Duration = styled.div(() => [tw`mr-3`]);

const MetaContainer = styled.div(() => [
  tw`hidden md:grid justify-end items-center`,
  css`
    width: 300px;
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, max-content));
    }
  `,
]);

const ControlButtons = styled.div(() => [
  tw`grid gap-1 items-center`,
  css`
    grid-template-columns: repeat(3, minmax(0, max-content));
  `,
]);

const MobileSonglistButton = styled.div(() => [tw`absolute right-0 block md:hidden`]);

const VolumeControlContainer = styled.div(
  ({ visible }: { visible?: boolean }) => [
    tw`absolute`,
    visible ? tw`block` : tw`hidden`,
    css`
      top: -184px;
    `,
  ]
);

const VolumeControlWrapper = styled.div(() => [tw`relative hidden md:block`]);

const PlayModeButton = styled.div(() => [tw`absolute md:relative left-0`])

const Control = styled.div(() => [
  tw`flex md:grid gap-1 items-center
   w-full md:w-auto justify-center`,
  css`
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, max-content));
    }
  `,
]);

const InfoContainer = styled.div(() => [
  tw`hidden md:grid gap-1 items-center`,
  css`
    width: 300px;
    grid-template-columns: repeat(4, minmax(0, max-content));
  `,
]);

const ControlContainer = styled.div(() => [
  tw`flex md:justify-between items-center px-3 py-2 lg:px-16`,
]);

const Buttons = styled.div(() => [tw`grid grid-cols-2 gap-1 items-center`]);

const Artist = styled.a(() => [
  tw`cursor-pointer hover:underline opacity-95`,
  css`
    line-height: 20px;
  `,
]);

const ArtistContainer = styled.span(() => []);

const Artists = styled.div(() => [
  css`
    height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
]);

const Name = styled(CaptionText)(() => [
  css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
]);

const Info = styled.div(() => [tw`flex flex-col flex-1 md:pl-1 pr-3 md:pr-2`]);

const Cover = styled(Image)(() => [tw`w-11 h-11 rounded-md bg-background`]);

const MobileInfoContainer = styled(InfoContainer)(() => [tw`grid md:hidden gap-3`]);

const MobileControlContainer = styled.div(() => [
  tw`flex md:hidden justify-between px-3 py-1`,
]);

const StyledAudio = styled.audio(() => [tw`hidden`]);

const Container = styled.div(() => [tw``]);
