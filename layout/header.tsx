import React, { useState } from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { MenuItem, TopMenu, SlideMenu } from "../components/menus";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { t } = useTranslation("common");

  const menu: MenuItem[] = [
    {
      path: "/",
      name: t("recommened"),
    },
    {
      path: "/playlist",
      name: t("playlist"),
    },
    {
      path: "/ranking",
      name: t("leaderboard"),
    },
    {
      path: "/artistlist",
      name: t("artist"),
    },
  ];

  const router = useRouter();
  const [slideMenuVisible, setSlideMenuVisible] = useState<boolean>(false);

  const handleSearch = (value) => {
    router.push(`/search/${value}`);
  };

  return (
    <>
      <Container>
        <TopMenu
          menu={menu}
          searchPlaceholder={t("search")}
          onNicknameClick={() => router.push("/zone")}
          onMobileNavClick={() => setSlideMenuVisible((visible) => !visible)}
          onSearch={handleSearch}
        />
      </Container>

      <SlideMenu
        visible={slideMenuVisible}
        searchPlaceholder={t("search")}
        onClose={() => setSlideMenuVisible(false)}
        onSearch={handleSearch}
      />
    </>
  );
};

export default Header;

const Container = styled.header(() => [
  tw`fixed w-full xl:px-16 lg:px-4 md:px-0 bg-neutral-light dark:bg-neutral-dark`,
  css`
    z-index: 9999;
  `,
]);
