import tw, { styled, css } from "twin.macro";
import { AvatarCard } from "./index";
import { Button } from "../buttons";
import { IconCollect } from "../../styles/icons";
import { H4, MainText, MediumText, InfoText } from "../../styles/typography";

export interface ArtistProps {
  src: string;
  title: string;
  caption?: string;
  songs: number;
  albums: number;
  movies: number;
  onSongsClick?: React.MouseEventHandler<HTMLElement>;
  onAlbumsClick?: React.MouseEventHandler<HTMLElement>;
  onMoviesClick?: React.MouseEventHandler<HTMLElement>;
  onCollectClick?: React.MouseEventHandler<HTMLElement>;
}

const ArtistCard: React.FC<ArtistProps> = ({
  src,
  title,
  caption,
  songs,
  albums,
  movies,
  onSongsClick,
  onAlbumsClick,
  onMoviesClick,
  onCollectClick,
}) => {
  const displayDataList = [
    { text: "单曲数：", num: songs, onClick: onSongsClick },
    { text: "专辑数：", num: albums, onClick: onAlbumsClick },
    { text: "MV数：", num: movies, onClick: onMoviesClick },
  ];

  return (
    <Container>
      <AvatarContianer>
        <AvatarCard
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
          <Data>
            {displayDataList.map((item) => (
              <DataItem key={item.text} onClick={item.onClick}>
                <DataText>{item.text}</DataText>
                <DataNum>{item.num}</DataNum>
              </DataItem>
            ))}
          </Data>
        </Info>

        <Collect>
          <Button icon={<IconCollect />} isShowBackground={true}>
            <MediumText bold>收藏</MediumText>
          </Button>
        </Collect>
      </InfoContainer>
    </Container>
  );
};

export default ArtistCard;

const Collect = styled.div(() => []);

const DataText = styled(InfoText)(() => [tw`text-light-mode-text`]);

const DataNum = styled(InfoText)(() => [tw`text-light-mode-text opacity-60`]);

const DataItem = styled.div(() => [tw`cursor-pointer hover:underline`]);

const Data = styled.div(() => [tw`grid grid-cols-3 gap-x-3 mb-4`]);

const Caption = styled(MainText)(() => [
  tw`inline-block mt-1 mb-3 text-light-mode-text`,
]);

const Title = styled(H4)(() => [tw`text-light-mode-text`]);

const Info = styled.div(() => []);

const InfoContainer = styled.div(() => [tw`ml-6`]);

const AvatarContianer = styled.div(() => []);

const Container = styled.div(() => [tw`flex`]);
