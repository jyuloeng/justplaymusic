import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import { scrollbarHiddenStyles } from "../../pages";

export interface PlaylistsLoadingContainerProps {
  rows?: number;
  cols?: number;
  isOverflow?: boolean;
  isNeedMarginX?: boolean;
}

const PlaylistsLoadingContainer: React.FC<PlaylistsLoadingContainerProps> = ({
  rows = 2,
  cols = 5,
  isOverflow = true,
  isNeedMarginX = true,
}) => {
  const [arr] = useState(new Array(rows * cols).fill(""));

  return (
    <Wrapper isNeedMarginX={isNeedMarginX}>
      <Container cols={cols} isOverflow={isOverflow}>
        {arr.map((item, index) => (
          <PlaylistItem key={index}>
            <CoverContainer>
              <Cover
                width={0}
                height={0}
                layout="responsive"
                src="/images/cover-placeholder.webp"
              />
            </CoverContainer>
            <Title />
            <Caption />
          </PlaylistItem>
        ))}
      </Container>
    </Wrapper>
  );
};

export default PlaylistsLoadingContainer;

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

const PlaylistItem = styled.div(() => [tw`animate-pulse`]);

const Container = styled.div<PlaylistsLoadingContainerProps>(
  ({ cols, isOverflow }) => [
    isOverflow ? tw`grid-cols-10` : tw`grid-cols-3`,
    tw`grid 
        gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 
        gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12
        md:w-full pr-3 lg:pr-0`,
    isOverflow &&
      css`
        width: 1280px;
        grid-template-rows: auto;
      `,
    css`
      @media (min-width: 768px) {
        grid-template-columns: repeat(${cols}, minmax(0, 1fr));
      }
    `,
  ]
);

const Wrapper = styled.div<PlaylistsLoadingContainerProps>(
  ({ isNeedMarginX }) => [
    scrollbarHiddenStyles,
    tw`pl-3 lg:pl-0 overflow-x-scroll lg:overflow-visible`,
    isNeedMarginX && tw`lg:mx-7`,
  ]
);
