import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../commons/avatar";
import { Button } from "../buttons";
import { IconPlay, IconCollect } from "../../styles/icons";
import { PrimaryColor } from "../../styles/colors";
import {
  H3,
  MainText,
  InfoText,
  CaptionText,
  SmallText,
} from "../../styles/typography";
import { tuple } from "../../lib/type";
import { formatDate } from "../../lib/format";
import { BaseSkeletonStyles } from "../containers";

const PlaylistIntroTypes = tuple("playlist", "album");
type PlaylistIntroType = typeof PlaylistIntroTypes[number];

export interface PlaylistIntroCardProps {
  isLoading?: boolean;
  introType?: PlaylistIntroType;
  coverPath?: string;
  title?: string;
  alias?: string;
  artistId?: number;
  artist?: string;
  avatarPath?: string;
  publishTime?: number;
  songs?: number;
  description?: string;
  onDescriptionClick?: React.MouseEventHandler<HTMLDivElement>;
  onPlayAllClick?: React.MouseEventHandler<HTMLDivElement>;
  onCollectClick?: React.MouseEventHandler<HTMLDivElement>;
}

const PlaylistIntroCard: React.FC<PlaylistIntroCardProps> = ({
  isLoading,
  introType,
  coverPath,
  title,
  alias,
  artistId,
  artist,
  avatarPath,
  publishTime,
  songs,
  description,
  onDescriptionClick,
  onPlayAllClick,
  onCollectClick,
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <PlaylistIntroContainer>
        <CoverWrapper>
          <CoverContainer isLoading={isLoading}>
            <Cover
              src={isLoading ? "/images/cover-placeholder.webp" : coverPath}
              layout="responsive"
              width={0}
              height={0}
            />
          </CoverContainer>
        </CoverWrapper>

        <InfoContainer>
          <Info>
            <TitleContainer>
              {isLoading ? <LoadingTitle /> : <H3 bold>{title}</H3>}
              {isLoading && alias ? (
                <LoadingAlias />
              ) : (
                alias && <MainText bold>({alias})</MainText>
              )}
            </TitleContainer>

            <Details>
              {isLoading ? (
                <LoadingDetails />
              ) : (
                <>
                  <ArtistWrapper>
                    <ArtistContainer introType={introType}>
                      {avatarPath && (
                        <AvatarContainer>
                          <Avatar src={avatarPath} />
                        </AvatarContainer>
                      )}
                      {introType === "album" ? (
                        <Link href={`/artist/${artistId}`}>
                          <Artist introType={introType}>{artist}</Artist>
                        </Link>
                      ) : (
                        <Artist>{artist}</Artist>
                      )}
                    </ArtistContainer>

                    <PublishTime>
                      {formatDate(publishTime)}{" "}
                      {introType === "playlist" ? t("created") : t("published")}
                    </PublishTime>
                  </ArtistWrapper>

                  <Songs>
                    {t("songs-number")}
                    <span>{songs}</span>
                  </Songs>
                </>
              )}
            </Details>

            <DescriptionContainer>
              {isLoading ? (
                <LoadingDescription />
              ) : (
                <Description onClick={onDescriptionClick}>
                  {description}
                </Description>
              )}
            </DescriptionContainer>
          </Info>

          <Buttons>
            <Button
              icon={<IconPlay fill={PrimaryColor} />}
              btnType={isLoading ? "disabled" : "primary"}
              isShowBackground={true}
              backgroundColor="primary"
              onClick={onPlayAllClick}
            >
              <CaptionText bold>{t("play-all")}</CaptionText>
            </Button>
            <Button
              btnType={isLoading ? "disabled" : "default"}
              icon={<IconCollect />}
              isShowBackground={true}
              onClick={onCollectClick}
            >
              <CaptionText bold>{t("collect")}</CaptionText>
            </Button>
          </Buttons>
        </InfoContainer>
      </PlaylistIntroContainer>

      <MobileButtons>
        <Button
          icon={<IconPlay fill={PrimaryColor} />}
          btnType={isLoading ? "disabled" : "primary"}
          isShowBackground={true}
          backgroundColor="primary"
        >
          <CaptionText bold>{t("play-all")}</CaptionText>
        </Button>
        <Button
          btnType={isLoading ? "disabled" : "default"}
          icon={<IconCollect />}
          isShowBackground={true}
        >
          <CaptionText bold>{t("collect")}</CaptionText>
        </Button>
      </MobileButtons>
    </>
  );
};

export default PlaylistIntroCard;

const MobileButtons = styled.div(() => [
  tw`grid md:hidden gap-2 mt-5 justify-center`,
  css`
    grid-template-columns: repeat(2, minmax(0, max-content));
  `,
]);

const Buttons = styled.div(() => [
  tw`hidden md:inline-grid gap-2`,
  css`
    grid-template-columns: repeat(2, minmax(0, max-content));
  `,
]);

const Description = styled(SmallText)(() => [
  tw`cursor-pointer hover:underline`,
  css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 1024px) {
      -webkit-line-clamp: 3;
    }
  `,
]);

const DescriptionContainer = styled.div(() => [
  tw`md:mb-3 xl:mb-0 md:mt-2 lg:mt-5`,
]);

const Songs = styled(InfoText)(() => [
  css`
    & > span {
      ${tw`opacity-70`}
    }
  `,
]);

const PublishTime = styled(InfoText)(() => [tw`ml-0 md:ml-3 opacity-70`]);

const Artist = styled(CaptionText)(
  ({ introType }: { introType?: PlaylistIntroType }) => [
    introType === "album" && tw`cursor-pointer hover:underline`,
    css`
      @media (max-width: 767px) {
        max-width: 130px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `,
  ]
);

const AvatarContainer = styled.div(() => [tw`w-6 md:w-7`]);

const ArtistContainer = styled.div(
  ({ introType }: { introType?: PlaylistIntroType }) => [
    introType === "playlist" && tw`gap-1 md:gap-2`,
    tw`grid items-center`,
    css`
      grid-template-columns: repeat(2, minmax(0, max-content));
    `,
  ]
);

const ArtistWrapper = styled.div(() => [
  tw`grid grid-cols-1 gap-y-1 md:gap-y-0 md:items-center`,
  css`
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, max-content));
    }
  `,
]);

const Details = styled.div(() => [
  tw`grid gap-2 md:gap-10 items-end md:items-center mt-2 md:mt-3 mb-1 md:mb-2`,
  css`
    grid-template-columns: repeat(2, minmax(0, max-content));
  `,
]);

const LoadingDescription = styled.div(() => [
  BaseSkeletonStyles,
  tw`w-full h-5 animate-pulse`,
]);

const LoadingDetails = styled.div(() => [
  BaseSkeletonStyles,
  tw`w-24 md:w-52 h-4 md:h-7 animate-pulse`,
]);

const LoadingAlias = styled.div(() => [
  BaseSkeletonStyles,
  tw`w-10 md:w-20 h-4 md:h-7 animate-pulse`,
]);

const LoadingTitle = styled.div(() => [
  BaseSkeletonStyles,
  tw`w-20 md:w-44 h-7 md:h-12 mb-2 animate-pulse`,
]);

const TitleContainer = styled.div(() => [
  tw`text-light-mode-text`,
  css`
    & > span {
      ${tw`inline-block mt-1 opacity-70`}
    }
  `,
]);

const Info = styled.div(() => []);

const InfoContainer = styled.div(() => [tw`flex flex-col justify-around`]);

const Cover = styled(Image)(() => [
  BaseSkeletonStyles,
  tw`rounded-xl overflow-hidden`,
]);

const CoverContainer = styled.div(({ isLoading }: { isLoading?: boolean }) => [
  BaseSkeletonStyles,
  tw`rounded-xl overflow-hidden`,
  !isLoading && tw`shadow-2xl`,
  isLoading && tw`animate-pulse`,
]);

const CoverWrapper = styled.div(() => [tw``]);

const PlaylistIntroContainer = styled.div(() => [
  tw`grid gap-3 md:gap-10 xl:gap-12 items-center lg:items-stretch`,
  css`
    grid-template-columns: 38.2% auto;

    @media (min-width: 768px) {
      grid-template-columns: 28% auto;
    }

    @media (min-width: 1280px) {
      grid-template-columns: 22% auto;
    }
  `,
]);
