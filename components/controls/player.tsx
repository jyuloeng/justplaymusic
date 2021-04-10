import { useState, useRef, useEffect } from "react";
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
  selectSonglistInfo,
  setSonglist,
} from "../../store/slice/song.slice";
import { useSongDetail, usePlaylistDetail } from "../../hooks";
import { formatDuration, formatAudioCurrentTime } from "../../lib/format";
import { tuple } from "../../lib/type";
import {
  IconHeartThread,
  IconShuffle,
  IconLyric,
  IconRepeat,
  IconPrev,
  IconNext,
  IconPlay,
  IconPause,
  IconMusicList,
} from "../../styles/icons";
import { CaptionText, SmallText } from "../../styles/typography";
import { toast } from "../../lib/toast";

const PlayStatusTypes = tuple("play", "pause");
type PlayStatusType = typeof PlayStatusTypes[number];

export interface PlayerProps {}

const baseIconSize = {
  width: 20,
  height: 20,
};

const Player: React.FC<PlayerProps> = ({}) => {
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement>(null);

  const songlistInfo = useAppSelector(selectSonglistInfo);
  const songlist = useAppSelector(selectSonglist);
  const currentSong = useAppSelector(selectCurrentSong);
  const current = useAppSelector(selectCurrent);
  const shuffledPlayQuene = useAppSelector(selectShuffledPlayQuene);
  const shuffledPlayCurrent = useAppSelector(selectShuffledCurrent);
  const playMode = useAppSelector(selectPlayMode);
  const volume = useAppSelector(selectVolume);
  const volumeBeforeMute = useAppSelector(selectVolumeBeforeMute);
  const mute = useAppSelector(selectMute);

  const [songLimit, setSongLimit] = useState(30);
  const [canPlay, setCanPlay] = useState(false);
  const [playStatus, setPlayStatus] = useState<PlayStatusType>("pause");
  const [currentTime, setCurrentTime] = useState(0);
  const [volumeControlVisible, setVolumeControlVisible] = useState(false);
  const [playlistDrawerMenuOpen, setPlaylistDrawerMenuOpen] = useState(false);

  const { playlistSongs, isPlaylistSongsLoading } = usePlaylistDetail({
    id: songlistInfo.id as string,
    limit: songLimit,
  });

  useSongDetail(currentSong);

  const handleSetCurrentSong = (index?: number) => {
    setCanPlay(false);
    setPlayStatus("pause");
    dispatch(setCurrent(index));
    dispatch(setCurrentSong(songlist[index]));
  };

  const handleAudioEnd = () => {};

  const handlePlayStatusChange = () => {
    if (canPlay) {
      if (playStatus === "pause") {
        handlePlay();
      } else if (playStatus === "play") {
        handlePause();
      }
    }
  };

  const handlePlay = () => {
    setPlayStatus("play");
    audioRef.current.play().catch((err) => {
      console.log(err);
      setPlayStatus("pause");
    });
  };

  const handlePause = () => {
    setPlayStatus("pause");
    audioRef.current.pause();
  };

  const handlePrev = () => {
    let prevIndex;

    if (playMode === "repeat") {
      prevIndex = current - 1;

      if (prevIndex < 0) {
        prevIndex = songlist?.length - 1;
      }

      if (!songlist[prevIndex].playable) {
        toast(
          `${songlist[prevIndex].name}为${songlist[prevIndex].reason}，暂时无法播放`
        );
        prevIndex -= 1;
      }
    } else if (playMode === "shuffle") {
      let prevShuffledPlayCurrent = shuffledPlayCurrent - 1;
      prevIndex = shuffledPlayQuene[prevShuffledPlayCurrent];

      if (prevShuffledPlayCurrent < 0) {
        while (!songlist[prevIndex]?.playable) {
          prevIndex = Math.floor(Math.random() * songlist?.length);
        }

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

      if (!songlist[nextIndex].playable) {
        toast(
          `${songlist[nextIndex].name}为${songlist[nextIndex].reason}，暂时无法播放`
        );
        nextIndex += 1;
      }
    } else if (playMode === "shuffle") {
      let nextShuffledPlayCurrent = shuffledPlayCurrent + 1;
      nextIndex = shuffledPlayQuene[nextShuffledPlayCurrent];

      if (nextShuffledPlayCurrent > shuffledPlayQuene.length - 1) {
        while (!songlist[nextIndex]?.playable) {
          nextIndex = Math.floor(Math.random() * songlist?.length);
        }

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

  const handleOnTimeUpdate = (value?: number) => {
    if (value) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    audioRef.current.volume = volume;
  }, []);

  useEffect(() => {
    console.log(currentSong.url);
    if (canPlay) {
      if (currentSong.url) {
        handlePlay();
      }
    }
  }, [canPlay, currentSong.url]);

  useEffect(() => {
    if (currentTime >= ~~(currentSong?.dt / 1000)) {
      handleNext();
    }
  }, [currentTime, currentSong]);

  useEffect(() => {
    dispatch(setSonglist(playlistSongs));
  }, [playlistSongs.length]);

  return (
    <>
      <Container>
        <StyledAudio
          // controls
          src={currentSong?.url}
          preload="metadata"
          ref={audioRef}
          onTimeUpdate={() => handleOnTimeUpdate()}
          onCanPlay={() => setCanPlay(true)}
          // onEmptied={() => handleNext()}
        />

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

        <Slider
          max={currentSong?.dt / 1000}
          min={0}
          value={currentTime}
          step={0.1}
          onChange={handleOnTimeUpdate}
        />

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
              <Button
                icon={
                  playStatus === "pause" ? (
                    <IconPlay width={32} height={32} />
                  ) : (
                    <IconPause width={32} height={32} />
                  )
                }
                onClick={handlePlayStatusChange}
              />
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
                  step={0.01}
                  defaultValue={volume}
                  value={volume}
                  mute={mute}
                  onChange={handleVolumeChange}
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
                <SmallText bold>{songlistInfo.trackCount}</SmallText>
              </Button>
            </MobileSonglistButton>
          </Control>

          <MetaContainer>
            <Duration>
              <CaptionText>
                {formatAudioCurrentTime(currentTime)} /{" "}
                {formatDuration(currentSong.dt)}
              </CaptionText>
            </Duration>
            <Button icon={<IconLyric {...baseIconSize} />} />
            <Button
              icon={<IconMusicList {...baseIconSize} />}
              marginX={2}
              onClick={handleShowSonglist}
            >
              <SmallText bold>{songlistInfo.trackCount}</SmallText>
            </Button>
          </MetaContainer>
        </ControlContainer>
      </Container>

      <PlaylistDrawerMenu
        open={playlistDrawerMenuOpen}
        onClose={() => setPlaylistDrawerMenuOpen(false)}
        activeSong={currentSong}
        isPlaylistSongsLoading={isPlaylistSongsLoading}
        playlistSongs={songlist}
        onLoadMore={() => setSongLimit((value) => value + 30)}
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

const MobileSonglistButton = styled.div(() => [
  tw`absolute right-0 block md:hidden`,
]);

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

const PlayModeButton = styled.div(() => [tw`absolute md:relative left-0`]);

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

const MobileInfoContainer = styled(InfoContainer)(() => [
  tw`grid md:hidden gap-3`,
]);

const MobileControlContainer = styled.div(() => [
  tw`flex md:hidden justify-between px-3 py-1`,
]);

const StyledAudio = styled.audio(() => [tw``]);

const Container = styled.div(() => [tw``]);
