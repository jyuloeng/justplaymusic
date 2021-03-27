import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { BaseSkeletonStyles } from "./index";

export interface PlaylistItemsLoadingContainerProps {
  rows?: number;
  isAlbum?: boolean;
}

const PlaylistItemsLoadingContainer: React.FC<PlaylistItemsLoadingContainerProps> = ({
  rows = 10,
  isAlbum = false,
}) => {
  const [arr] = useState(new Array(rows).fill(""));

  return (
    <Container>
      {arr.map((item, index) => (
        <Item key={index}>
          <InfoContainer>
            <CoverContianer>
              <Index />
              <Cover />
            </CoverContianer>
            <Info isAlbum={isAlbum}>
              <Title />
              <Caption />
            </Info>
          </InfoContainer>
          <Album />
          <Duration />
        </Item>
      ))}
    </Container>
  );
};

export default PlaylistItemsLoadingContainer;

const Duration = styled.div(() => [BaseSkeletonStyles, tw`w-4 md:w-10 h-5`]);

const Album = styled.div(() => [BaseSkeletonStyles, tw`w-20 h-5`]);

const Caption = styled.div(() => [BaseSkeletonStyles, tw`w-12 h-3`]);

const Title = styled.div(() => [BaseSkeletonStyles, tw`w-20 h-5 mb-2`]);

const Info = styled.div(({ isAlbum }: { isAlbum?: boolean }) => [
  tw`flex flex-col`,
  !isAlbum && tw`md:ml-3`,
]);

const Cover = styled.div(() => [
  BaseSkeletonStyles,
  tw`hidden md:block w-10 h-10`,
]);

const Index = styled.div(() => [BaseSkeletonStyles, tw`h-5`]);

const CoverContianer = styled.div(() => [
  tw`grid gap-2 items-center`,
  css`
    grid-template-columns: 20px auto;
  `,
]);

const InfoContainer = styled.div(() => [tw`flex`]);

const Item = styled.div(() => [
  tw`flex justify-between items-center py-2 pl-3 pr-3 md:pr-6 animate-pulse`,
]);

const Container = styled.div(() => [tw``]);
