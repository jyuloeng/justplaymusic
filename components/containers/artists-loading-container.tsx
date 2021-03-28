import tw, { styled, css } from "twin.macro";
import { useState } from "react";
import Image from "next/image";
import { scrollbarHiddenStyles } from "../../pages";

export interface ArtistsLoadingContainerProps {
  rows?: number;
  cols?: number;
  isOverflow?: boolean;
  isHideUnderMd?: boolean;
  isNeedMarginX?: boolean;
}

const ArtistsLoadingContainer: React.FC<ArtistsLoadingContainerProps> = ({
  rows = 2,
  cols = 6,
  isOverflow = true,
  isHideUnderMd = false,
  isNeedMarginX = false,
}) => {
  const [arr] = useState(new Array(rows * 6).fill(""));

  return (
    <Wrapper isNeedMarginX={isNeedMarginX}>
      <Container
        cols={cols}
        isOverflow={isOverflow}
        isHideUnderMd={isHideUnderMd}
      >
        {arr.map((item, index) => (
          <Artist key={index}>
            <CoverContainer>
              <Cover
                width={0}
                height={0}
                layout="responsive"
                src="/images/cover-placeholder.webp"
              />
            </CoverContainer>
            <Caption />
          </Artist>
        ))}
      </Container>
    </Wrapper>
  );
};

export default ArtistsLoadingContainer;

const Caption = styled.div(
  () => tw`w-12 h-3 md:h-4 mt-2 mb-2 mx-auto bg-background rounded-md`
);

const Cover = styled(Image)(() => [tw`bg-background rounded-full`]);

const CoverContainer = styled.div(() => [tw`bg-background rounded-full`]);

const Artist = styled.div(() => [tw`animate-pulse`]);

const Container = styled.div<ArtistsLoadingContainerProps>(
  ({ cols, isOverflow, isHideUnderMd }) => [
    isHideUnderMd ? tw`hidden md:grid` : tw`grid`,
    css`
      @media (min-width: 768px) {
        grid-template-columns: repeat(${cols}, minmax(0, 1fr));
      }
    `,
    tw`
        gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 
        gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12
        md:w-full pr-3 lg:pr-0`,
    isOverflow &&
      css`
        width: 652px;
      `,
    !isOverflow && tw`grid-cols-3`,
  ]
);

const Wrapper = styled.div<ArtistsLoadingContainerProps>(
  ({ isNeedMarginX }) => [
    scrollbarHiddenStyles,
    tw`ml-0 pl-3 lg:pl-0 overflow-x-scroll lg:overflow-visible`,
    isNeedMarginX && tw`lg:mx-7`,
  ]
);
