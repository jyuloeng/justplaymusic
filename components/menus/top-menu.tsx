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
  searchPlaceholder?: string;
  onMobileNavClick?: React.MouseEventHandler<HTMLElement>;
  onNicknameClick?: React.MouseEventHandler<HTMLElement>;
  onSearch?: (value: string) => void;
}

const imagePath =
  "https://p2.music.126.net/NP5ShmXQiOcqLe5xjrpjMA==/3297435383057591.jpg?param=512y512";

const TopMenu: React.FC<TopMenuProps> = ({
  menu,
  searchPlaceholder,
  onMobileNavClick,
  onNicknameClick,
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
                  backgroundColor={router.pathname === path ? "primary" : "default"}
                >
                  <MediumText bold>{name}</MediumText>
                </Button>
              </a>
            </Link>
          ))}
        </ButtonGrops>

        <SettingContainer>
          <Button
            icon={
              <AvatarContainer>
                <Avatar src={imagePath} />
              </AvatarContainer>
            }
            isShowHover={false}
            onClick={onNicknameClick}
          >
            <MediumText bold>送温暖的大红帽丶</MediumText>
          </Button>
          <Button icon={<IconSetting />} />
        </SettingContainer>
      </ScreenNavContainer>
    </Container>
  );
};

export default TopMenu;

const Container = styled.nav<TopMenuProps>(() => [
  tw`flex justify-between items-center w-full py-2 shadow-sm md:shadow-none`,
]);

const BaseNavContainer = tw.div`flex justify-between items-center w-full`;

const MobileNavContainer = styled(BaseNavContainer)(() => [tw`md:hidden px-2`]);

const ScreenNavContainer = styled(BaseNavContainer)(() => [tw`md:flex hidden`]);

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
      @media (max-width: 880px) {
        display: none;
      }
    }
  `,
  tw`flex items-center`,
]);

const ButtonGrops = styled.div(() => [
  css`
    & > button:not(:last-child) {
      margin-right: 8px;
    }
  `,
  tw`flex`,
]);

const SettingContainer = styled.div(() => [tw`flex items-center`]);

const AvatarContainer = styled.div(() => [
  tw`relative`,
  css`
    width: 40px;
    height: 40px;
  `,
]);
