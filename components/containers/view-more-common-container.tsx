import tw, { styled, css } from "twin.macro";
import { Button } from "../buttons";
import { IconLoading } from "../../styles/icons";
import { CaptionText } from "../../styles/typography";

export interface ViewMoreCommonContainerProps {
  titleBoard?: React.ReactNode;
  extension?: React.ReactNode;
  children?: React.ReactNode;
  cols?: number;
  mdCols?: number;
  gap?: number;
  lgGap?: number;
  isShowLoadMore?: boolean;
  onLoadMoreClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ViewMoreCommonContainer: React.FC<ViewMoreCommonContainerProps> = ({
  titleBoard,
  extension,
  children,
  cols = 3,
  mdCols = 6,
  gap = 2,
  lgGap = 6,
  isShowLoadMore = true,
  onLoadMoreClick,
}) => {
  return (
    <Container>
      {titleBoard && <TitleBoardContainer>{titleBoard}</TitleBoardContainer>}

      {extension && <ExtensionContainer>{extension}</ExtensionContainer>}

      {children && (
        <ChlidrenContainer cols={cols} mdCols={mdCols} gap={gap} lgGap={lgGap}>
          {children}
        </ChlidrenContainer>
      )}

      {isShowLoadMore && (
        <LoadMoreContainer>
          <Button icon={<IconLoading />} onClick={onLoadMoreClick}>
            <CaptionText bold>加载更多</CaptionText>
          </Button>
        </LoadMoreContainer>
      )}
    </Container>
  );
};

export default ViewMoreCommonContainer;

const LoadMoreContainer = styled.div(() => [
  tw`flex justify-center w-full my-2 md:my-6`,
]);

const ChlidrenContainer = styled.div(
  ({
    cols,
    mdCols,
    gap,
    lgGap,
  }: {
    cols?: number;
    mdCols?: number;
    gap?: number;
    lgGap?: number;
  }) => [
    tw`grid lg:gap-6 pt-5 lg:pt-10 px-3 md:px-7`,
    css`
      grid-template-columns: repeat(${cols}, minmax(0, 1fr));
      gap: ${gap * 0.25}rem;

      @media (min-width: 768px) {
        grid-template-columns: repeat(${mdCols}, minmax(0, 1fr));
        gap: ${lgGap * 0.25}rem;
      }
    `,
  ]
);

const ExtensionContainer = styled.div(() => [tw`pt-5 lg:pt-10 px-3 md:px-7`]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => []);
