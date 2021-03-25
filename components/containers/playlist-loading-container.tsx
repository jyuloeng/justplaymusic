import Image from "next/image";
import tw, { styled, css } from "twin.macro";
import { scrollbarHiddenStyles } from "../../pages";

export interface PlaylistLoadingContainerProps {
  row?: number;
}

const PlaylistLoadingContainer: React.FC<PlaylistLoadingContainerProps> = ({
  row = 2,
}) => {
  const arr = new Array(row * 5).fill("");

  return (
    <Wrapper>
      <Container>
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

export default PlaylistLoadingContainer;

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

const Container = styled.div(() => [
  tw`grid grid-cols-10 md:grid-cols-5 gap-2 md:gap-3 lg:gap-4 xl:gap-6 md:w-full pr-3 lg:pr-0`,
  css`
    width: 1280px;
    grid-template-rows: auto;
  `,
]);

const Wrapper = styled.div(() => [
  scrollbarHiddenStyles,
  tw`pl-3 lg:pl-0 lg:mx-7 overflow-x-scroll lg:overflow-visible`,
]);
