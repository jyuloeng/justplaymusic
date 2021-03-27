import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { AvatarCard, AvatarCardProps } from "./index";
import { Button } from "../buttons";
import { IconCollect, IconHeartThread } from "../../styles/icons";
import { H2, MainText, MediumText, InfoText } from "../../styles/typography";

export interface ArtistCardProps extends AvatarCardProps {
  isLoading?: boolean;
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
  isLoading,
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
  const { t } = useTranslation("common");

  const displayDataList = [
    { text: t("songs-number"), num: songs, onClick: onSongsClick },
    { text: t("albums-number"), num: albums, onClick: onAlbumsClick },
    { text: t("mvs-number"), num: mvs, onClick: onMvsClick },
  ];

  return (
    <Container>
      <AvatarContianer>
        {isLoading ? (
          <Cover
            width={0}
            height={0}
            layout="responsive"
            src="/images/cover-placeholder.webp"
          />
        ) : (
          <AvatarCard
            id={id}
            src={src}
            isShowHover={false}
            isShowShadow={true}
          />
        )}
      </AvatarContianer>

      <InfoContainer>
        {isLoading ? (
          <LoadingInfo>
            <LoadingTitle />
            <LoadingCaption />
            <LoadingData />
          </LoadingInfo>
        ) : (
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
        )}

        <Collect>
          <Button
            btnType={isLoading ? "disabled" : "default"}
            icon={<IconHeartThread />}
            isShowBackground={true}
          >
            <MediumText bold>{t("focus")}</MediumText>
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

const LoadingData = styled.div(() => [
  tw`w-60 h-4 mt-3 md:mt-5 mb-4 md:mb-6 bg-background rounded-md`,
]);

const LoadingCaption = styled.div(() => [
  tw`w-24 h-6 bg-background rounded-md`,
]);

const LoadingTitle = styled.div(() => [
  tw`w-32 h-12 mb-2 bg-background rounded-md`,
]);

const LoadingInfo = styled.div(() => [
  tw`flex flex-col items-center md:items-start`,
]);

const InfoContainer = styled.div(() => [
  tw`flex flex-col items-center md:block mt-3 md:mt-0 md:ml-8 text-center md:text-left`,
]);

const Cover = styled(Image)(() => [tw`bg-background rounded-full`]);

const AvatarContianer = styled.div(() => [
  tw`bg-background rounded-full`,
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
