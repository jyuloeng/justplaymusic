import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { scrollbarHiddenStyles } from "../../pages";

export interface MiniPlaylistItemsLoadingContainerProps {
  rows?: number;
  cols?: number;
  isOverflow?: boolean;
}

const MiniPlaylistItemsLoadingContainer: React.FC<MiniPlaylistItemsLoadingContainerProps> = ({
  rows = 3,
  cols = 4,
  isOverflow = true,
}) => {
  const [arr] = useState(new Array(rows * cols).fill(""));

  return (
    <Wrapper>
      <Container cols={cols} isOverflow={isOverflow}>
        {arr.map((item, index) => (
          <Item key={index}>
            <Cover />
            <Info>
              <Title />
              <Caption />
            </Info>
          </Item>
        ))}
      </Container>
    </Wrapper>
  );
};

export default MiniPlaylistItemsLoadingContainer;

const Caption = styled.div(() => [tw`w-10 h-4 bg-background rounded-md`]);

const Title = styled.div(() => [tw`w-20 h-5 mb-2 bg-background rounded-md`]);

const Info = styled.div(() => [tw``]);

const Cover = styled.div(() => [tw`w-10 h-10 bg-background rounded-md`]);

const Item = styled.div(() => [
  tw`grid gap-2 items-center md:p-2 rounded-md animate-pulse`,
  css`
    grid-template-columns: repeat(2, minmax(40px, max-content));
  `,
]);

const Container = styled.div<MiniPlaylistItemsLoadingContainerProps>(
  ({ cols, isOverflow }) => [
    tw`grid grid-cols-4 gap-2 md:w-full ml-3 md:ml-0 pr-3 md:pr-0`,
    css`
      grid-template-columns: repeat(${cols}, minmax(0, 1fr));
    `,
    isOverflow &&
      css`
        width: 800px;
      `,
  ]
);

const Wrapper = styled.div(() => [
  scrollbarHiddenStyles,
  tw`lg:mx-5 overflow-x-scroll`,
]);
