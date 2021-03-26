import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { ContextMenu, ContextMenuProps, ContextMenuItem } from "./index";
import Image from "next/image";
import { InfoText, SmallText } from "../../styles/typography";

export interface MoreActionMenuProps extends ContextMenuProps {
  coverPath?: string;
  name?: string;
  artists?: any[];
}

const MoreActionMenu: React.FC<MoreActionMenuProps> = ({
  visible,
  position,
  onClose,
  coverPath,
  name,
  artists,
}) => {
  const { t } = useTranslation("common");
  const menu: ContextMenuItem[] = [
    {
      key: "play",
      title: t("play"),
      onClick: () => {},
    },
    {
      key: "next-play",
      title: t("next-play"),
      onClick: () => {},
    },
    {
      key: "add-to-queue",
      title: t("add-to-queue"),
      onClick: () => {},
    },
    {
      key: "collect-to-playlist",
      title: t("collect-to-playlist"),
      onClick: () => {},
    },
  ];

  return (
    <ContextMenu
      visible={visible}
      position={position}
      menu={menu}
      onClose={onClose}
    >
      {visible && (
        <>
          <InfoContainer>
            <Cover>
              <Image src={coverPath} layout="fill" />
            </Cover>
            <Info>
              <Name bold>{name}</Name>
              <Artists>
                {artists?.map((artist, index) => (
                  <ArtistContainer key={artist.id}>
                    <Artist>
                      <SmallText>{artist.name}</SmallText>
                    </Artist>
                    {index !== artists.length - 1 && (
                      <SmallText>,&nbsp;&nbsp;</SmallText>
                    )}
                  </ArtistContainer>
                ))}
              </Artists>
            </Info>
          </InfoContainer>
        </>
      )}
    </ContextMenu>
  );
};

export default MoreActionMenu;

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
  tw`flex flex-col justify-center`,
  css`
    max-width: 128px;
    min-width: 128px;
  `,
]);

const Cover = styled.div(() => [
  tw`relative w-12 h-12 rounded-lg overflow-hidden`,
]);

const InfoContainer = styled.div(() => [
  tw`grid gap-2`,
  css`
    grid-template-columns: 48px auto;
  `,
]);
