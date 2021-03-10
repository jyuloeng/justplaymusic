import React, { useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import { InfoText, SmallText } from "../../styles/typography";

export interface PositionProps {
  top: number;
  left: number;
}

export interface MoreActionMenuProps {
  visible: boolean;
  position?: PositionProps;
  coverPath?: string;
  name?: string;
  artists?: string[];
}

const MoreActionMenu: React.FC<MoreActionMenuProps> = ({
  visible,
  position,
  coverPath,
  name,
  artists,
}) => {
  return (
    <Container visible={visible} position={position}>
      {visible && (
        <>
          <InfoContainer>
            <Cover>
              <Image src={coverPath} layout="fill" />
            </Cover>
            <Info>
              <Name bold>{name}</Name>
              <Artists>
                {artists.map((artist, index) => (
                  <ArtistContainer key={artist}>
                    <Artist>
                      <SmallText>{artist}</SmallText>
                    </Artist>
                    {index !== artists.length - 1 && (
                      <SmallText>,&nbsp;&nbsp;</SmallText>
                    )}
                  </ArtistContainer>
                ))}
              </Artists>
            </Info>
          </InfoContainer>

          <Controls>
            <ControlItem bold>播放</ControlItem>
            <ControlItem bold>下一首播放</ControlItem>
            <ControlItem bold>收藏到歌单</ControlItem>
            <ControlItem bold>移除歌曲</ControlItem>
          </Controls>
        </>
      )}
    </Container>
  );
};

export default MoreActionMenu;

const ControlItem = styled(InfoText)(() => [
  tw`block p-2 rounded cursor-pointer transition
    hover:text-primary2 hover:bg-primary-background`,
  css`
    &:active {
      transform: scale(0.96);
    }
  `,
]);

const Controls = styled.div(() => [tw`mt-2`]);

const Artist = styled(SmallText)(() => []);

const ArtistContainer = styled.span(() => []);

const Artists = styled.div(() => [
  css`
    line-height: 17px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
]);

const Name = styled(InfoText)(() => [
  tw`text-light-mode-text`,
  css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
]);

const Info = styled.div(() => [
  css`
    max-width: 128px;
  `,
]);

const Cover = styled.div(() => [
  tw`relative w-11 h-11 rounded-lg overflow-hidden`,
]);

const InfoContainer = styled.div(() => [
  tw`grid gap-2`,
  css`
    grid-template-columns: 44px auto;
  `,
]);

const Container = styled.div(
  ({ visible, position }: { visible: boolean; position: PositionProps }) => [
    tw`absolute flex-col p-2 bg-neutral-light rounded-lg shadow-xl`,
    visible ? tw`inline-flex` : "hidden",
    position &&
      css`
        top: ${position.top}px;
        left: ${position.left}px;
      `,
  ]
);
