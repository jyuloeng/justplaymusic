import React from "react";
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

const PlaylistItemTypes = tuple("default", "active", "disabled");
export type PlaylistItemType = typeof PlaylistItemTypes[number];

export interface PlaylistItemCardProps {
  itemType: PlaylistItemType;
  title?: string;
  index?: number;
  coverPath?: string;
  coverSize?: { width: number; height: number };
  name: string;
  artists: any[];
  album: string;
  albumId: number;
  duration: number;
  isLike?: boolean;
  isShowDuration?: boolean;
  isShowCover?: boolean;
  isAlbum?: boolean;
  onLikeClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDblClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenuClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PlaylistItemCard: React.FC<PlaylistItemCardProps> = ({
  itemType,
  title,
  index,
  coverPath,
  coverSize = {
    width: 20,
    height: 20,
  },
  name,
  artists,
  album,
  albumId,
  duration,
  isLike = false,
  isShowDuration = true,
  isShowCover = true,
  isAlbum = false,
  onLikeClick,
  onDblClick,
  onContextMenuClick,
}) => {
  const handleOnDblClick = (e: React.MouseEvent<HTMLEmbedElement>) => {
    e.preventDefault();
    if (itemType !== "disabled" && onDblClick) {
      onDblClick(e);
    }
  };

  const handleOnContextMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (itemType !== "disabled" && onContextMenuClick) {
      onContextMenuClick(e);
    }
  };

  return (
    <Container
      itemType={itemType}
      isAlbum={isAlbum}
      onContextMenu={handleOnContextMenuClick}
      onDoubleClick={handleOnDblClick}
      title={title}
    >
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
          <Link href={`/album/${albumId}`}>
            <Cover>
              <Image src={coverPath} layout="fill" />
            </Cover>
          </Link>
        )}
      </Status>

      <Info isAlbum={isAlbum} itemType={itemType}>
        <Name bold>{name}</Name>
        {isAlbum && <SplitLine>-</SplitLine>}

        <Details itemType={itemType}>
          <Artists itemType={itemType}>
            {artists.map((artist, index) => (
              <ArtistContainer key={artist.id}>
                <Link href={`/artist/${artist.id}`}>
                  <Artist>
                    <SmallText>{artist.name}</SmallText>
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
            <Link href={`/album/${albumId}`}>
              <DetailsAlbum>
                <SmallText>{album}</SmallText>
              </DetailsAlbum>
            </Link>
          )}
        </Details>
      </Info>

      {!isAlbum && (
        <AlbumContainer itemType={itemType}>
          <Link href={`/album/${albumId}`}>
            <Album>
              <InfoText>{album}</InfoText>
            </Album>
          </Link>
        </AlbumContainer>
      )}

      <Controls>
        <More onClick={handleOnContextMenuClick}>
          <IconMoreVertical {...coverSize} />
        </More>
        <Like onClick={onLikeClick}>
          {isLike ? (
            <IconHeart {...coverSize} fill={PrimaryColor} />
          ) : (
            <IconHeartThread {...coverSize} fill={PrimaryColor} />
          )}
        </Like>
        {isShowDuration && (
          <Duration itemType={itemType}>
            <CaptionText>{formatDuration(duration)}</CaptionText>
          </Duration>
        )}
      </Controls>
    </Container>
  );
};

export default PlaylistItemCard;

const baseControlsIconStyles = tw`cursor-pointer transform active:scale-75 transition`;

const Duration = styled.div(({ itemType }: { itemType: PlaylistItemType }) => [
  tw`hidden md:inline-block`,
  itemType === "active" ? tw`text-primary2` : tw`text-light-mode-text`,
]);

const More = styled.div(() => [
  baseControlsIconStyles,
  tw`block md:hidden md:mr-3 md:invisible`,
]);

const Like = styled.div(() => [
  baseControlsIconStyles,
  tw`mr-3 invisible hidden md:inline-block`,
]);

const Controls = styled.div(() => [tw`flex items-center`]);

const Artist = styled.a(() => [
  tw`cursor-pointer hover:underline opacity-95`,
  css`
    line-height: 20px;
  `,
]);

const ArtistContainer = styled.span(() => []);

const Artists = styled.div(({ itemType }: { itemType: PlaylistItemType }) => [
  css`
    height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  itemType === "active" ? tw`text-primary2` : tw`text-light-mode-text`,
]);

const Album = styled.a(() => [
  tw`cursor-pointer hover:underline`,
  css`
    line-height: 22px;
  `,
]);

const AlbumContainer = styled.div(
  ({ itemType }: { itemType: PlaylistItemType }) => [
    tw`flex-1 md:inline-block hidden pr-2 truncate`,
    css`
      line-height: 22px;
    `,
    itemType === "active" ? tw`text-primary2` : tw`text-light-mode-text`,
  ]
);

const SplitLine = styled.span(() => [
  tw`mx-1 text-light-mode-text opacity-80 hidden md:inline-block`,
]);

const DetailsSplitLine = styled(SplitLine)(() => [
  tw`md:hidden inline-block text-primary2`,
]);

const DetailsAlbum = styled(Album)(() => [
  tw`md:hidden inline-block`,
  css`
    height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
]);

const Details = styled.div(({ itemType }: { itemType: PlaylistItemType }) => [
  tw`flex items-center`,
  itemType === "active" ? tw`text-primary2` : tw`text-light-mode-text`,
  css`
    line-height: 20px;
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

const Info = styled.div(
  ({ isAlbum, itemType }: { isAlbum: boolean; itemType: PlaylistItemType }) => [
    tw`flex flex-col flex-1 md:pl-1 pr-3 md:pr-2`,
    isAlbum && tw`md:flex-row items-start md:items-center`,
    !isAlbum && tw`md:ml-3`,
    itemType === "active" ? tw`text-primary2` : tw`text-light-mode-text`,
  ]
);

const IconPlayWrapper = styled(IconPlay)(() => [tw`hidden`]);

const IndexText = styled(InfoText)(() => [tw`text-center`]);

const Status = styled.div(() => [
  tw`grid gap-x-2 gap-4 items-center`,
  css`
    grid-template-columns: 12px auto;
    @media (min-width: 768px) {
      grid-template-columns: 20px auto;
    }
  `,
]);

const Cover = styled.a(() => [
  tw`relative hidden w-10 h-10 rounded-md overflow-hidden cursor-pointer`,
  tw`md:inline-block`,
]);

const Container = styled.div(
  ({ itemType, isAlbum }: { itemType: PlaylistItemType; isAlbum: boolean }) => [
    tw`flex justify-between items-center py-2 pl-3 pr-3 md:pr-6 rounded-lg transition`,
    isAlbum ? tw`md:py-3` : tw`md:py-2`,
    itemType !== "disabled" && [
      tw`hover:bg-background`,
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
    ],
    itemType === "disabled" && [
      tw`opacity-60`,
      css`
        filter: grayscale(100%);
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
      `,
    ],
  ]
);
