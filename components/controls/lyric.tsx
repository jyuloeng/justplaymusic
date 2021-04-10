import {} from "react";
import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import Link from "next/link";
import RcDrawer from "rc-drawer";
import { IDrawerProps } from "rc-drawer/lib/IDrawerPropTypes";
import { Button } from "../buttons";
import { IconBottomArrow } from "../../styles/icons";
import { IntroText, InfoText } from "./../../styles/typography/index";
import { useAppSelector } from "./../../store/index";
import { selectLyricsTranslation } from "./../../store/slice/settings.slice";
import { scrollbarHiddenStyles } from "../../pages";

export interface LyricProps extends IDrawerProps {
  currentSong?: any;
  currentTime?: number;
  lyricWithTranslation?: any[];
  onLyricClick?: (progress: number) => void;
}

const Lyric: React.FC<LyricProps> = ({
  open,
  onClose,
  currentSong,
  currentTime,
  lyricWithTranslation,
  onLyricClick,
}) => {
  const lyricsTranslation = useAppSelector(selectLyricsTranslation);

  const handleLyricClick = (line) => {
    onLyricClick && onLyricClick(line?.time);
  };

  return (
    <RcDrawer
      open={open}
      onClose={onClose}
      level={null}
      handler={false}
      placement="bottom"
      className="lyric-drawer"
    >
      <Container>
        <Control>
          <Button icon={<IconBottomArrow />} onClick={onClose} />
        </Control>

        <LyricWrapper>
          <CoverContainer>
            <Cover
              src={
                currentSong?.al?.picUrl
                  ? currentSong?.al?.picUrl + "?param=512y512"
                  : "/images/cover-placeholder.webp"
              }
              layout="responsive"
              width={0}
              height={0}
            />
          </CoverContainer>

          <LyricContainer>
            <Info>
              <Name bold>{currentSong?.name}</Name>
              <InfoItem>
                <InfoText>歌手：</InfoText>
                <Artists>
                  {currentSong?.ar?.map((artist, index) => (
                    <ArtistContainer key={artist.id}>
                      <Link href={`/artist/${artist.id}`}>
                        <Artist>
                          <InfoText>{artist.name}</InfoText>
                        </Artist>
                      </Link>
                      {index !== currentSong?.ar?.length - 1 && (
                        <InfoText>,&nbsp;&nbsp;</InfoText>
                      )}
                    </ArtistContainer>
                  ))}
                </Artists>
              </InfoItem>
              <InfoItem>
                <InfoText>专辑：</InfoText>
                <Link href={`/album/${currentSong?.al?.id}`}>
                  <Album>
                    <InfoText>{currentSong?.al?.name}</InfoText>{" "}
                  </Album>
                </Link>
              </InfoItem>
            </Info>

            <LyricInfo>
              {lyricWithTranslation?.map((line, index) => (
                <LyricContent
                  key={index}
                  onClick={() => handleLyricClick(line)}
                >
                  <LyricText>{line.contents[0]}</LyricText>
                  {lyricsTranslation && line?.contents[1] && (
                    <LyricTranslation>{line.contents[1]}</LyricTranslation>
                  )}
                </LyricContent>
              ))}
            </LyricInfo>
          </LyricContainer>
        </LyricWrapper>
      </Container>
    </RcDrawer>
  );
};

export default Lyric;

const LyricTranslation = styled.div(() => [tw`text-center`]);

const LyricText = styled.div(() => [tw`text-center`]);

const LyricContent = styled.div(() => [
  tw`p-2 mb-2 rounded-lg hover:bg-background cursor-pointer`,
]);

const LyricInfo = styled.div(() => [
  scrollbarHiddenStyles,
  tw`my-7 flex flex-col items-center`,
  css`
    max-height: 480px;
    overflow-y: scroll;
  `,
]);

const Artist = styled.a(() => [
  tw`flex cursor-pointer hover:underline opacity-95`,
  css`
    line-height: 20px;
  `,
]);

const Album = styled(Artist)(() => [tw``]);

const ArtistContainer = styled.span(() => []);

const Artists = styled.div(() => [
  css`
    height: 22px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  tw`text-light-mode-text`,
]);

const InfoItem = styled.div(() => [
  tw`flex items-center mt-2 text-light-mode-text opacity-95`,
]);

const Name = styled(IntroText)(() => [tw`text-center`]);

const Info = styled.div(() => [tw`flex flex-col items-center`]);

const LyricContainer = styled.div(() => [tw`md:ml-12 md:mr-24`]);

const Cover = styled(Image)(() => [tw`rounded-lg`]);

const CoverContainer = styled.div(() => [
  tw`hidden md:block ml-24 mr-12 shadow-2xl`,
]);

const LyricWrapper = styled.div(() => [
  tw`grid items-center`,
  css`
    @media (min-width: 768px) {
      grid-template-columns: 44% 56%;
    }
  `,
]);

const Control = styled.div(() => [tw``]);

const Container = styled.div(() => [
  tw`h-full grid px-3 py-3 lg:px-8 lg:py-8`,
  css`
    grid-template-rows: max-content;
  `,
]);
