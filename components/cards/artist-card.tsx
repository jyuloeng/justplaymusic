import tw, { styled, css } from "twin.macro";
import { AvatarCard, AvatarCardProps } from "./index";
import { Button } from "../buttons";
import { IconCollect } from "../../styles/icons";
import { H2, MainText, MediumText, InfoText } from "../../styles/typography";

export interface ArtistCardProps extends AvatarCardProps {
  title: string;
  songs?: number;
  albums?: number;
  mvs?: number;
  isShowCollect?: boolean;
  onSongsClick?: React.MouseEventHandler<HTMLElement>;
  onAlbumsClick?: React.MouseEventHandler<HTMLElement>;
  onMvsClick?: React.MouseEventHandler<HTMLElement>;
  onCollectClick?: React.MouseEventHandler<HTMLElement>;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  id,
  src,
  title,
  caption,
  songs,
  albums,
  mvs,
  isShowCollect = true,
  onSongsClick,
  onAlbumsClick,
  onMvsClick,
  onCollectClick,
}) => {
  const displayDataList = [
    { text: "单曲数：", num: songs, onClick: onSongsClick },
    { text: "专辑数：", num: albums, onClick: onAlbumsClick },
    { text: "MV数：", num: mvs, onClick: onMvsClick },
  ];

  return (
    <Container>
      <AvatarContianer>
        <AvatarCard
          id={id}
          src={src}
          isShowButton={false}
          isShowHover={false}
          isShowShadow={true}
        />
      </AvatarContianer>

      <InfoContainer>
        <Info>
          <Title>{title}</Title>
          {caption && <Caption>{caption}</Caption>}
          {songs && albums && mvs && (
            <Data>
              {displayDataList.map((item) => (
                <DataItem key={item.text} onClick={item.onClick}>
                  <DataText>{item.text}</DataText>
                  <DataNum>{item.num}</DataNum>
                </DataItem>
              ))}
            </Data>
          )}
        </Info>

        {isShowCollect && (
          <Collect>
            <Button icon={<IconCollect />} isShowBackground={true}>
              <MediumText bold>收藏</MediumText>
            </Button>
          </Collect>
        )}
      </InfoContainer>
    </Container>
  );
};

export default ArtistCard;

const Collect = styled.div(() => []);

const DataText = styled(InfoText)(() => [tw`text-light-mode-text`]);

const DataNum = styled(InfoText)(() => [tw`text-light-mode-text opacity-60`]);

const DataItem = styled.div(() => [tw`cursor-pointer hover:underline`]);

const Data = styled.div(() => [
  tw`grid gap-x-3 mt-2 md:mt-4 mb-3 md:mb-5`,
  css`
    grid-template-columns: repeat(3, minmax(0, max-content));
  `,
]);

const Caption = styled(MainText)(() => [
  tw`inline-block text-light-mode-text opacity-90`,
]);

const Title = styled(H2)(() => [tw`mb-2 text-light-mode-text`]);

const Info = styled.div(() => [tw``]);

const InfoContainer = styled.div(() => [
  tw`flex flex-col items-center md:block mt-3 md:mt-0 md:ml-8 text-center md:text-left`,
]);

const AvatarContianer = styled.div(() => [
  css`
    width: 100px;
    height: 100px;

    @media (min-width: 768px) {
      width: 200px;
      height: 200px;
    }
  `,
]);

const Container = styled.div(() => [
  tw`flex flex-col md:flex-row items-center`,
]);
