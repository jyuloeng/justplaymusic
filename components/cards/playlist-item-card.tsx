import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import Link from "next/link";
import {
  IconPlay,
  IconHeart,
  IconHeartThread,
  IconRhythm,
  IconMoreVertical,
} from "../../styles/icons";
import { PrimaryColor } from "../../styles/colors";
import { CaptionText, InfoText, SmallText } from "../../styles/typography";
import { formatDuration } from "../../lib/format";
import { tuple } from "../../lib/type";

const PlaylistItemTypes = tuple("default", "active");
type PlaylistItemType = typeof PlaylistItemTypes[number];

export interface PlaylistItemCardProps {
  itemType: PlaylistItemType;
  index: number;
  coverPath: string;
  name: string;
  artists: string[];
  album: string;
  duration: number;
  isLike?: boolean;
  isShowDuration?: boolean;
  isShowCover?: boolean;
  isAlbum?: boolean;
}

const coverSize = {
  width: 20,
  height: 20,
};

const PlaylistItemCard: React.FC<PlaylistItemCardProps> = ({
  itemType,
  index,
  coverPath,
  name,
  artists,
  album,
  duration,
  isLike = false,
  isShowDuration = true,
  isShowCover = true,
  isAlbum = false,
}) => {
  return (
    <Container>
      <Status>
        {itemType === "active" ? (
          <IconRhythm {...coverSize} fill={PrimaryColor} />
        ) : (
          <>
            <IconPlayWrapper {...coverSize} fill={PrimaryColor} />
            <IndexText>{index}</IndexText>
          </>
        )}

        {isShowCover && (
          <Link href="/">
            <Cover>
              <Image src={coverPath} layout="fill" />
            </Cover>
          </Link>
        )}
      </Status>

      <Info isAlbum={isAlbum}>
        <Name bold>{name}</Name>
        {isAlbum && <SplitLine>-</SplitLine>}

        <Details>
          <Artists>
            {artists.map((artist, index) => (
              <ArtistContainer key={artist}>
                <Link href="/">
                  <Artist>
                    <SmallText>{artist}</SmallText>
                  </Artist>
                </Link>
                {index !== artists.length - 1 && (
                  <SmallText>,&nbsp;&nbsp;</SmallText>
                )}
              </ArtistContainer>
            ))}
          </Artists>
          {!isAlbum && <DetailsSplitLine>-</DetailsSplitLine>}
          {!isAlbum && (
            <Link href="/">
              <DetailsAlbum>
                <SmallText>{album}</SmallText>
              </DetailsAlbum>
            </Link>
          )}
        </Details>
      </Info>

      {!isAlbum && (
        <Link href="/">
          <Album>
            <InfoText>{album}</InfoText>
          </Album>
        </Link>
      )}

      <Controls>
        <More>
          <IconMoreVertical {...coverSize} />
        </More>
        <Like>
          {isLike ? (
            <IconHeart {...coverSize} fill={PrimaryColor} />
          ) : (
            <IconHeartThread {...coverSize} fill={PrimaryColor} />
          )}
        </Like>
        {isShowDuration && (
          <Duration>
            <CaptionText>{formatDuration(duration)}</CaptionText>
          </Duration>
        )}
      </Controls>
    </Container>
  );
};

export default PlaylistItemCard;

const baseControlsIconStyles = tw`cursor-pointer transform active:scale-90 transition`;

const Duration = styled.div(() => [tw`hidden md:inline-block`]);

const More = styled.div(() => [
  baseControlsIconStyles,
  tw`md:mr-3 md:invisible`,
]);

const Like = styled.div(() => [
  baseControlsIconStyles,
  tw`mr-3 invisible hidden md:inline-block`,
]);

const Controls = styled.div(() => [tw`flex items-center`]);

const Artist = styled.a(() => [
  tw`cursor-pointer hover:underline text-light-mode-text opacity-95`,
  css`
    line-height: 20px;
  `,
]);

const ArtistContainer = styled.span(() => []);

const Artists = styled.div(() => [
  css`
    line-height: 22px;
  `,
]);

const Album = styled.a(() => [
  tw`flex-1 md:inline-block hidden cursor-pointer hover:underline truncate`,
  css`
    line-height: 22px;
  `,
]);

const SplitLine = styled.span(() => [
  tw`mx-1 text-light-mode-text opacity-80 hidden md:inline-block`,
]);

const DetailsSplitLine = styled(SplitLine)(() => [tw`md:hidden inline-block`]);

const DetailsAlbum = styled(Album)(() => [tw`md:hidden inline-block truncate`]);

const Details = styled.div(() => [tw`flex items-center`]);

const Name = styled(CaptionText)(() => [tw`truncate`]);

const Info = styled.div(({ isAlbum }: { isAlbum: boolean }) => [
  tw`flex flex-col flex-1`,
  isAlbum && tw`md:flex-row`,
  !isAlbum && tw`md:ml-3`,
]);

const InfoContainer = styled.div(() => [tw`flex-1  flex items-center`]);

const IconPlayWrapper = styled(IconPlay)(() => [tw`hidden`]);

const IndexText = styled(InfoText)(() => []);

const Status = styled.div(() => [
  tw`grid gap-x-2 gap-4 items-center`,
  css`
    grid-template-columns: 20px auto;
  `,
]);

const Cover = styled.a(() => [
  tw`relative hidden w-10 h-10 rounded-lg overflow-hidden cursor-pointer`,
  tw`md:inline-block`,
]);

const Container = styled.div(() => [
  tw`flex justify-between items-center 
  py-1 md:py-2 pl-3 pr-3 md:pr-6 hover:bg-background rounded-lg transition`,
  css`
    &:hover ${IndexText} {
      ${tw`hidden`}
    }

    &:hover ${IconPlayWrapper} {
      ${tw`inline-block`}
    }

    &:hover ${More} {
      ${tw`visible`}
    }

    &:hover ${Like} {
      ${tw`md:visible`}
    }
  `,
]);
