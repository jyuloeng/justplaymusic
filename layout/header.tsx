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
import { useAppDispatch, useAppSelector } from "../store";
import {
  selectUser,
  setLoginMode,
  setToken,
  setUser,
} from "../store/slice/user.slice";
import {
  IconGithub,
  IconSetting,
  IconSignIn,
  IconSignOut,
  IconZone,
} from "../styles/icons";
import {
  isLogin,
  removeLocalUser,
  setAuthCookie,
  setLocalUser,
} from "../lib/auth";
import { useMutateUserLogout } from "../hooks";

export interface HeaderProps {}

const islogin = isLogin();

const Header: React.FC<HeaderProps> = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mutateAsync: mutateAsyncLogout } = useMutateUserLogout();

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
          icon: <IconZone />,
          onClick: () => {
            setContextMenuVisible(false);
            router.push("/zone");
          },
        }
      : null,
    {
      key: islogin ? "logout" : "login",
      title: islogin ? "登出" : "登录",
      icon: islogin ? <IconSignOut /> : <IconSignIn />,
      onClick: () => {
        setContextMenuVisible(false);
        if (islogin) {
          mutateAsyncLogout({});
          dispatch(setUser(null));
          dispatch(setToken(""));
          dispatch(setLoginMode(""));
          removeLocalUser();
          setAuthCookie("");
          router.push("/");
        } else {
          router.push("/login");
        }
      },
    },
    {
      key: "github",
      title: "Github",
      icon: <IconGithub />,
      onClick: () => {
        setContextMenuVisible(false);
        const a = document.createElement("a");
        a.href = "https://github.com/oddii";
        a.target = "_blank";
        a.click();
      },
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
        menu={menu}
        open={slideMenuVisible}
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
  tw`fixed w-full lg:px-16 md:px-2 px-0 bg-neutral-light dark:bg-neutral-dark`,
  css`
    z-index: 999;
  `,
]);
