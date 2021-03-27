import tw, { styled, css } from "twin.macro";
import { useState } from "react";
import Image from "next/image";
import { scrollbarHiddenStyles } from "../../pages";

export interface ArtistsLoadingContainerProps {
  rows?: number;
  isOverflow?: boolean;
  isHideUnderMd?: boolean;
}

const ArtistsLoadingContainer: React.FC<ArtistsLoadingContainerProps> = ({
  rows = 2,
  isOverflow = true,
  isHideUnderMd = false,
}) => {
  const [arr] = useState(new Array(rows * 6).fill(""));

  return (
    <Wrapper>
      <Container isOverflow={isOverflow} isHideUnderMd={isHideUnderMd}>
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

const Container = styled.div(
  ({
    isOverflow,
    isHideUnderMd,
  }: {
    isOverflow: boolean;
    isHideUnderMd: boolean;
  }) => [
    isHideUnderMd ? tw`hidden md:grid` : tw`grid`,
    tw`grid-cols-6
        gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 
        gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12
        md:w-full pr-3 lg:pr-0`,
    isOverflow &&
      css`
        width: 652px;
      `,
  ]
);

const Wrapper = styled.div(() => [
  scrollbarHiddenStyles,
  tw`ml-0 pl-3 lg:pl-0 overflow-x-scroll lg:overflow-visible`,
]);
