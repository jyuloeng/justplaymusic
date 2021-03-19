import tw, { styled, css } from "twin.macro";
import Link from "next/link";
import { Avatar, AvatarProps } from "../commons";
import { GlassButton } from "../buttons";
import { IconPlay } from "../../styles/icons";
import { DarkModeTextColor } from "../../styles/colors";
import { CaptionText } from "../../styles/typography";

export interface AvatarCardProps extends AvatarProps {
  id: number;
  caption?: string;
  isShowButton?: boolean;
  isShowHover?: boolean;
  isShowShadow?: boolean;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  id,
  src,
  caption,
  isShowButton = true,
  isShowHover = true,
  isShowShadow = false,
}) => {
  return (
    <Container>
      <Link href={`/artist/${id}`}>
        <CoverContainer isShowHover={isShowHover} isShowShadow={isShowShadow}>
          <Cover>
            <Avatar src={src} />
          </Cover>

          {isShowButton && (
            <GlassButtonContainer>
              <GlassButton>
                <IconPlay fill={DarkModeTextColor} />
              </GlassButton>
            </GlassButtonContainer>
          )}
        </CoverContainer>
      </Link>

      {caption && (
        <Link href={`/artist/${id}`}>
          <CaptionContainer>
            <Caption>{caption}</Caption>
          </CaptionContainer>
        </Link>
      )}
    </Container>
  );
};

export default AvatarCard;

const GlassButtonContainer = styled.div(() => [
  tw`absolute w-full h-full top-0 left-0 flex justify-center items-center transition invisible`,
  css`
    transform: scale(1.02);
  `,
]);

const Cover = styled.div(() => [tw`relative rounded-full`, css``]);

const CoverContainer = styled.div(
  ({
    isShowHover,
    isShowShadow,
  }: {
    isShowHover: boolean;
    isShowShadow: boolean;
  }) => [
    tw`relative rounded-full transition`,
    isShowShadow && tw`shadow-xl`,
    isShowHover && [
      css`
        &:hover ${GlassButtonContainer} {
          ${tw`visible`}
        }

        &:hover {
          transform: scale(1.02);
        }
      `,
      tw`cursor-pointer hover:shadow-xl`,
    ],
  ]
);

const Container = styled.div(() => [tw``, css``]);

const BaseTextStyles = css`
  padding: 0 4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CaptionContainer = styled(CaptionText)(() => [
  BaseTextStyles,
  tw`mt-1 md:mt-2 px-1 text-center`,
]);

const Caption = styled(CaptionText)(() => [tw`hover:underline cursor-pointer`]);
