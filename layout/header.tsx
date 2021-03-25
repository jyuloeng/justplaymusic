import React, { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import {
  MenuItem,
  TopMenu,
  SlideMenu,
  ContextMenu,
  ContextMenuItem,
  ContextMenuPosition,
} from "../components/menus";
import { useAppSelector } from "../store";
import { selectUser } from "../store/slice/user.slice";
import { IconGithub, IconSetting } from "../styles/icons";
import { isLogin } from "../lib/auth";

export interface HeaderProps {}

const islogin = isLogin();

const Header: React.FC<HeaderProps> = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

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

  const contextMenu: ContextMenuItem[] = [
    {
      key: "setting",
      title: "设置",
      icon: <IconSetting />,
      onClick: () => {
        setContextMenuVisible(false);
        router.push("/settings");
      },
    },
    islogin
      ? {
          key: "zone",
          title: "空间",
          icon: <IconSetting />,
          onClick: () => {
            setContextMenuVisible(false);
            router.push("/zone");
          },
        }
      : null,
    {
      key: islogin ? "logout" : "login",
      title: islogin ? "登出" : "登录",
      icon: <IconSetting />,
      onClick: () => console.log("login"),
    },
    {
      key: "github",
      title: "Github",
      icon: <IconGithub />,
      onClick: () => console.log("github"),
    },
  ];

  const user = useAppSelector(selectUser);

  const [slideMenuVisible, setSlideMenuVisible] = useState<boolean>(false);
  const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
  const [
    contextMenuPosition,
    setContextMenuPostion,
  ] = useState<ContextMenuPosition>({ top: 0, left: 0 });

  const handleSearch = (value) => {
    router.push(`/search/${value}`);
  };

  const handleShowContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    let { pageX, pageY } = e;

    if (document.body.clientWidth - pageX < 48) {
      pageX = pageX - 112;
    } else if (document.body.clientWidth - pageX < 138) {
      pageX = pageX - 69;
    }

    setContextMenuVisible(true);
    setContextMenuPostion({
      top: pageY,
      left: pageX,
    });
  };

  return (
    <>
      <Container>
        <TopMenu
          menu={menu}
          nickname={user?.nickname}
          userAvatarPath={user?.avatarUrl}
          searchPlaceholder={t("search")}
          onMobileNavClick={() => setSlideMenuVisible((visible) => !visible)}
          onAvatarClick={handleShowContextMenu}
          onSearch={handleSearch}
        />
      </Container>

      <SlideMenu
        visible={slideMenuVisible}
        searchPlaceholder={t("search")}
        onClose={() => setSlideMenuVisible(false)}
        onSearch={handleSearch}
      />

      <ContextMenu
        visible={contextMenuVisible}
        position={contextMenuPosition}
        menu={contextMenu}
        onClose={() => setContextMenuVisible(false)}
      />
    </>
  );
};

export default Header;

const Container = styled.header(() => [
  tw`fixed w-full xl:px-16 lg:px-4 md:px-0 bg-neutral-light dark:bg-neutral-dark`,
  css`
    z-index: 999;
  `,
]);
