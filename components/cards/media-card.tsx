import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import Link from "next/link";
import { PlayCountCard } from "./index";
import { GlassButton } from "../buttons";
import { CaptionText, SmallText } from "../../styles/typography";
import { IconPlay } from "../../styles/icons";
import { DarkModeTextColor } from "../../styles/colors";
import { tuple } from "../../lib/type";

const MediaCardTypes = tuple("album", "mv");
type MediaCardType = typeof MediaCardTypes[number];

export interface MediaCardProps {
  cardType?: MediaCardType;
  coverPath: string;
  title?: string;
  caption?: string;
  playCount?: number;
  isShowPlayCount?: boolean;
  onTitleClick?: React.MouseEventHandler<HTMLElement>;
  isCanCaptionClick?: boolean;
  onCaptionClick?: React.MouseEventHandler<HTMLElement>;
}

const MediaCard: React.FC<MediaCardProps> = ({
  cardType = "album",
  coverPath,
  title,
  caption,
  playCount,
  isShowPlayCount = true,
  onTitleClick,
  isCanCaptionClick,
  onCaptionClick,
}) => {
  return (
    <Container>
      <Link href="/">
        <CoverContainer>
          <Cover
            src={coverPath}
            layout="responsive"
            width={cardType === "mv" ? 232 : 0}
            height={cardType === "mv" ? 130 : 0}
          />

          {cardType === "album" && (
            <GlassButtonContainer>
              <GlassButton>
                <IconPlay fill={DarkModeTextColor} />
              </GlassButton>
            </GlassButtonContainer>
          )}

          {isShowPlayCount && (
            <PlayCountContainer>
              <PlayCountCard count={playCount} />
            </PlayCountContainer>
          )}
        </CoverContainer>
      </Link>

      {(title || caption) && (
        <Info>
          {title && (
            <TitleContainer>
              <Title onClick={onTitleClick}>{title}</Title>
            </TitleContainer>
          )}
          {caption && (
            <CaptionContainer>
              <Caption
                isCanCaptionClick={isCanCaptionClick}
                onClick={onCaptionClick}
              >
                {caption}
              </Caption>
            </CaptionContainer>
          )}
        </Info>
      )}
    </Container>
  );
};

export default MediaCard;

const Container = styled.div(() => []);

const GlassButtonContainer = styled.div(() => [
  tw`absolute w-full h-full top-0 left-0 flex justify-center items-center invisible`,
]);

const Cover = styled(Image)(() => [
  tw`md:rounded-xl rounded-lg overflow-hidden transition`,
]);

const CoverContainer = styled.a(() => [
  tw`relative block md:rounded-xl rounded-lg hover:shadow-xl cursor-pointer transition`,
  css`
    &:hover {
      transform: translateY(-6%);
      ${GlassButtonContainer} {
        ${tw`visible`}
      }
    }
  `,
]);

const PlayCountContainer = styled.div(() => [
  tw`absolute top-1 lg:top-2 right-1 lg:right-2`,
]);

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

const Info = styled.div(() => [tw`flex flex-col mt-1 md:mt-2`]);
