import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import { scrollbarHiddenStyles } from "../../pages";

export interface MVsLoadingContainerProps {
  rows?: number;
  cols?: number;
  mdCols?: number;
  isOverflow?: boolean;
  isNeedMarginX?: boolean;
}

const MVsLoadingContainer: React.FC<MVsLoadingContainerProps> = ({
  cols = 4,
  mdCols = 4,
  rows = 2,
  isOverflow = true,
  isNeedMarginX = true,
}) => {
  const [arr] = useState(new Array(mdCols * rows).fill(""));
  return (
    <Wrapper isNeedMarginX={isNeedMarginX}>
      <Container
        cols={cols}
        mdCols={mdCols}
        rows={rows}
        isOverflow={isOverflow}
      >
        {arr.map((item, index) => (
          <MV key={index}>
            <CoverContainer>
              <Cover
                width={232}
                height={130}
                layout="responsive"
                src="/images/cover-placeholder.webp"
              />
            </CoverContainer>
            <Title />
            <Caption />
          </MV>
        ))}
      </Container>
    </Wrapper>
  );
};

export default MVsLoadingContainer;

const Caption = styled.div(
  () => tw`w-12 h-3 md:h-4 mt-2 mb-12 bg-background rounded-md`
);

const Title = styled.div(
  () => tw`h-3 md:h-4 mt-2 bg-background rounded-md`,
  css`
    width: 64%;
  `
);

const Cover = styled(Image)(() => [tw`w-full bg-background rounded-lg`]);

const CoverContainer = styled.div(() => [tw`w-full bg-background rounded-lg`]);

const MV = styled.div(() => [tw`animate-pulse`]);

const Container = styled.div<MVsLoadingContainerProps>(
  ({ cols, mdCols, isOverflow }) => [
    tw`grid  
    gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 
    gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12
    pr-3 lg:pr-0`,
    mdCols === 1 && tw`gap-2 md:gap-1`,
    css`
      grid-template-columns: repeat(${cols}, minmax(0, 1fr));

      @media (min-width: 768px) {
        grid-template-columns: repeat(${mdCols}, minmax(0, 1fr));
      }
    `,
    isOverflow &&
      css`
        @media (max-width: 767px) {
          width: ${278.5 * cols}px;
        }
      `,
  ]
);

const Wrapper = styled.div<MVsLoadingContainerProps>(({ isNeedMarginX }) => [
  scrollbarHiddenStyles,
  tw`pl-3 lg:pl-0 overflow-x-scroll md:overflow-visible`,
  isNeedMarginX && tw`lg:mx-7`,
]);
