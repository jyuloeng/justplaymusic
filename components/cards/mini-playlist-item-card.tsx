import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import { PlaylistItemType } from "./index";
import { CaptionText, SmallText } from "../../styles/typography";

export interface MiniPlaylistItemCardProps {
  itemType?: PlaylistItemType;
  coverPath?: string;
  name?: string;
  artists?: string[];
  onDblClick?: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
  onContextMenuClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    item: Omit<MiniPlaylistItemCardProps, "duration">
  ) => void;
}

const MiniPlaylistItemCard: React.FC<MiniPlaylistItemCardProps> = ({
  itemType = "default",
  coverPath,
  name,
  artists,
  onDblClick,
  onContextMenuClick,
}) => {
  const handleDblClick = (e: React.MouseEvent<HTMLEmbedElement>) => {
    e.preventDefault();
    if (itemType !== "disabled" && onDblClick) {
      onDblClick(e, "1");
    }
  };

  const handleOnContextMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (itemType !== "disabled" && onContextMenuClick) {
      onContextMenuClick(e, {
        itemType,
        coverPath,
        name,
        artists,
      });
    }
  };

  return (
    <Container
      itemType={itemType}
      onContextMenu={handleOnContextMenuClick}
      onDoubleClick={handleDblClick}
    >
      <Cover>
        <Image src={coverPath} width={40} height={40} layout="fixed" />
      </Cover>
      <Info itemType={itemType}>
        <Name bold>{name}</Name>
        <Artists>
          {artists.map((artist, index) => (
            <ArtistContainer key={artist}>
              <Artist>
                <SmallText>{artist}</SmallText>
              </Artist>
              {index !== artists.length - 1 && (
                <SmallText>,&nbsp;&nbsp;</SmallText>
              )}
            </ArtistContainer>
          ))}
        </Artists>
      </Info>
    </Container>
  );
};

export default MiniPlaylistItemCard;

const Artist = styled.span(() => [
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

const Info = styled.div(({ itemType }: { itemType: PlaylistItemType }) => [
  itemType === "active" ? tw`text-primary2` : tw`text-light-mode-text`,
  tw`pr-3 md:pr-2`,
]);

const Cover = styled.div(() => [tw`w-10 h-10 rounded-lg overflow-hidden`]);

const Container = styled.div(({ itemType }: { itemType: PlaylistItemType }) => [
  tw`grid gap-2 items-center rounded-lg overflow-hidden`,
  css`
    grid-template-columns: repeat(2, minmax(40px, max-content));
  `,
  itemType !== "disabled" && tw`cursor-pointer`,
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
]);
