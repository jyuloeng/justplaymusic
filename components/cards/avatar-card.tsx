import tw, { styled, css } from "twin.macro";
import Link from "next/link";
import { Avatar, AvatarProps } from "../commons";
import { CaptionText } from "../../styles/typography";

export interface AvatarCardProps extends AvatarProps {
  id?: number;
  caption?: string;
  isShowHover?: boolean;
  isShowShadow?: boolean;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  id,
  src,
  caption,
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
        &:hover {
          transform: scale(1.04);
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
