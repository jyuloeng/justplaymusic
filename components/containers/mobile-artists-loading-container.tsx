import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import Image from "next/image";

export interface MobileArtistsLoadingContainerProps {
  rows?: number;
}

const MobileArtistsLoadingContainer: React.FC<MobileArtistsLoadingContainerProps> = ({
  rows = 12,
}) => {
  const [arr] = useState(new Array(rows).fill(""));
  return (
    <Container>
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
          <Button />
        </Artist>
      ))}
    </Container>
  );
};

export default MobileArtistsLoadingContainer;

const Button = styled.div(() => [
  tw`justify-self-end w-12 h-5 bg-background rounded-md`,
]);

const Caption = styled.div(() => [tw`w-20 h-3 bg-background rounded-md`]);

const Cover = styled(Image)(() => [tw`rounded-full bg-background`]);

const CoverContainer = styled.div(() => [tw`rounded-full bg-background`]);

const Artist = styled.div(() => [
  tw`grid gap-x-3 items-center px-1 animate-pulse`,
  css`
    grid-template-columns: 12% auto auto;
  `,
]);

const Container = styled.div(() => [tw`grid md:hidden gap-2`]);
