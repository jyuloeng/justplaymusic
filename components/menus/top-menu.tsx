import React from "react";
import tw, { styled, css } from "twin.macro";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuItem } from "./index";
import { Button } from "../buttons";
import Avatar from "../commons/avatar";
import SearchInput from "../commons/search-input";
import {
  IconLeftArrow,
  IconNavigation,
  IconRightArrow,
  IconSetting,
} from "../../styles/icons";
import { MediumText, CaptionText } from "../../styles/typography";

export interface TopMenuProps {
  menu?: MenuItem[];
  nickname?: string;
  userAvatarPath?: string;
  searchPlaceholder?: string;
  onMobileNavClick?: React.MouseEventHandler<HTMLElement>;
  onAvatarClick?: React.MouseEventHandler<HTMLElement>;
  onSearch?: (value: string) => void;
}

const defaultAvatar =
  "http://s4.music.126.net/style/web2/img/default/default_avatar.jpg";

const TopMenu: React.FC<TopMenuProps> = ({
  menu,
  nickname = "未登录游客",
  userAvatarPath = defaultAvatar,
  searchPlaceholder,
  onMobileNavClick,
  onAvatarClick,
  onSearch,
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoNext = () => {
    window.history.go(1);
  };

  return (
    <Container>
      <MobileNavContainer>
        <Button icon={<IconNavigation />} onClick={onMobileNavClick} />
        <MediumText bold>个性推荐</MediumText>
        <PlaceHolder />
      </MobileNavContainer>

      <ScreenNavContainer>
        <SearchContainer>
          <Button icon={<IconLeftArrow />} onClick={handleGoBack} />
          <Button icon={<IconRightArrow />} onClick={handleGoNext} />
          <SearchInput onSearch={onSearch} placeholder={searchPlaceholder} />
        </SearchContainer>

        <ButtonGrops>
          {menu?.map(({ path, name }) => (
            <Link href={path} key={path}>
              <a>
                <Button
                  btnType={router.pathname === path ? "primary" : "default"}
                  backgroundColor={
                    router.pathname === path ? "primary" : "default"
                  }
                >
                  <MediumText bold>{name}</MediumText>
                </Button>
              </a>
            </Link>
          ))}
        </ButtonGrops>

        <AvatarWrapper>
          <Button
            icon={
              <AvatarContainer>
                <Avatar src={userAvatarPath + "?param=60y60"} />
              </AvatarContainer>
            }
            isShowHover={false}
            onClick={onAvatarClick}
          >
            <Nickname bold>{nickname}</Nickname>
          </Button>
        </AvatarWrapper>
      </ScreenNavContainer>
    </Container>
  );
};

export default TopMenu;

const Nickname = styled(MediumText)(() => [
  tw`truncate`,
  css`
    max-width: 128px;
  `,
]);

const Container = styled.nav<TopMenuProps>(() => [
  tw`flex justify-between items-center w-full py-2 shadow-sm md:shadow-none`,
]);

const BaseNavContainer = tw.div`flex justify-between items-center w-full`;

const MobileNavContainer = styled(BaseNavContainer)(() => [tw`md:hidden px-2`]);

const ScreenNavContainer = styled(BaseNavContainer)(() => [tw`relative md:flex hidden h-16 justify-center`]);

const PlaceHolder = styled.div`
  width: 48px;
  height: 48px;
`;

const SearchContainer = styled.div(() => [
  css`
    & > *:not(:last-child) {
      margin-right: 8px;
    }

    & > :last-child {
      @media (max-width: 932px) {
        display: none;
      }
    }
  `,
  tw`flex items-center absolute left-0 top-2`,
]);

const ButtonGrops = styled.div(() => [
  css`
    & > button:not(:last-child) {
      margin-right: 8px;
    }
  `,
  tw`flex`,
]);

const AvatarContainer = styled.div(() => [
  tw`relative`,
  css`
    width: 40px;
    height: 40px;
  `,
]);

const AvatarWrapper = styled.div(() => [tw`absolute right-0 top-0`]);
