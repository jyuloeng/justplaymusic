import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { Button } from "../buttons";
import { IconLoading } from "../../styles/icons";
import { CaptionText } from "../../styles/typography";

export interface ViewMoreCommonContainerProps {
  titleBoard?: React.ReactNode;
  header?: React.ReactNode;
  isNeedChildrenContainer?: boolean;
  cols?: number;
  mdCols?: number;
  gap?: number;
  lgGap?: number;
  footer?: React.ReactNode;
  isShowLoadMore?: boolean;
  onLoadMoreClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ViewMoreCommonContainer: React.FC<ViewMoreCommonContainerProps> = ({
  titleBoard,
  header,
  children,
  isNeedChildrenContainer = true,
  cols = 3,
  mdCols = 6,
  gap = 2,
  lgGap = 6,
  footer,
  isShowLoadMore = true,
  onLoadMoreClick,
}) => {
  const { t } = useTranslation("common");
  return (
    <Container>
      {titleBoard && <TitleBoardContainer>{titleBoard}</TitleBoardContainer>}

      {header && <HeaderContainer>{header}</HeaderContainer>}

      {isNeedChildrenContainer && children && (
        <ChlidrenContainer cols={cols} mdCols={mdCols} gap={gap} lgGap={lgGap}>
          {children}
        </ChlidrenContainer>
      )}

      {footer && <FooterContainer>{footer}</FooterContainer>}

      {isShowLoadMore && (
        <LoadMoreContainer>
          <Button icon={<IconLoading />} onClick={onLoadMoreClick}>
            <CaptionText bold>{t("load-more")}</CaptionText>
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

const FooterContainer = styled.div(() => [tw`pt-5 lg:pt-10 px-3 md:px-7`]);

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
    tw`grid pt-5 lg:pt-10 px-3 md:px-7`,
    css`
      grid-template-columns: repeat(${cols}, minmax(0, 1fr));
      gap: ${gap * 0.25}rem;

      @media (min-width: 768px) {
        grid-template-columns: repeat(${mdCols}, minmax(0, 1fr));
      }

      @media (min-width: 1024px) {
        gap: ${lgGap * 0.25}rem;
      }
    `,
  ]
);

const HeaderContainer = styled.div(() => [tw`pt-5 lg:pt-10 px-3 md:px-7`]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => []);
