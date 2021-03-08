import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import Link from "next/link";
import { PlayCountCard } from "./index";
import { GlassButton } from "../buttons";
import { CaptionText, SmallText } from "../../styles/typography";
import { IconPlay } from "../../styles/icons";
import { DarkModeTextColor } from "../../styles/colors";
import { tuple } from "../../lib/type";

const MediaCardTypes = tuple("album", "movie");
type MediaCardType = typeof MediaCardTypes[number];

export interface MediaCardProps {
  cardType: MediaCardType;
  coverPath: string;
  title: string;
  caption?: string;
  playCount: number;
  onTitleClick?: React.MouseEventHandler<HTMLElement>;
  isCanCaptionClick?: boolean;
  onCaptionClick?: React.MouseEventHandler<HTMLElement>;
}

const MediaCard: React.FC<MediaCardProps> = ({
  cardType,
  coverPath,
  title,
  caption,
  playCount,
  onTitleClick,
  isCanCaptionClick,
  onCaptionClick,
}) => {
  return (
    <Container cardType={cardType}>
      <Link href="/">
        <CoverContainer cardType={cardType}>
          <Cover>
            <Image src={coverPath} layout="fill" />
          </Cover>

          {cardType === "album" && (
            <GlassButtonContainer>
              <GlassButton>
                <IconPlay fill={DarkModeTextColor} />
              </GlassButton>
            </GlassButtonContainer>
          )}

          <PlayCountContainer>
            <PlayCountCard count={playCount} />
          </PlayCountContainer>
        </CoverContainer>
      </Link>

      <Info>
        <TitleContainer>
          <Title onClick={onTitleClick}>{title}</Title>
        </TitleContainer>
        <CaptionContainer>
          <Caption
            isCanCaptionClick={isCanCaptionClick}
            onClick={onCaptionClick}
          >
            {caption}
          </Caption>
        </CaptionContainer>
      </Info>
    </Container>
  );
};

export default MediaCard;

const Container = styled.div(({ cardType }: { cardType: MediaCardType }) => [
  tw`inline-block`,
  cardType === "movie"
    ? css`
        max-width: 232px;
      `
    : css`
        max-width: 174px;
      `,
]);

const CoverContainer = styled.a(({ cardType }: { cardType: MediaCardType }) => [
  tw`relative block md:rounded-xl rounded-lg hover:shadow-xl cursor-pointer`,
  cardType === "movie"
    ? css`
        width: 232px;
        height: 130px;
      `
    : css`
        width: 174px;
        height: 174px;
      `,
  css`
    &:hover {
      transform: scale(1.02);
    }
  `,
]);

const Cover = styled.div(() => [
  tw`relative w-full h-full md:rounded-xl rounded-lg overflow-hidden transition`,
]);

const GlassButtonContainer = styled.div(() => [
  tw`absolute w-full h-full top-0 left-0 flex justify-center items-center`,
]);

const PlayCountContainer = styled.div(() => [tw`absolute top-2 right-2`]);

const BaseTextStyles = css`
  padding: 0 4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleContainer = styled(CaptionText)(() => [BaseTextStyles]);

const CaptionContainer = styled(SmallText)(() => [BaseTextStyles]);

const Title = styled(CaptionText)(() => [tw`cursor-pointer hover:underline`]);

const Caption = styled(
  SmallText
)(({ isCanCaptionClick = true }: { isCanCaptionClick: boolean }) => [
  isCanCaptionClick && tw`cursor-pointer hover:underline`,
]);

const Info = styled.div(() => [tw`flex flex-col mt-2`]);
