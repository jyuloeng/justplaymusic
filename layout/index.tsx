import React, { ReactNode, useEffect, useRef } from "react";
import Head from "next/head";
import tw, { styled, css } from "twin.macro";
import Header from "./header";
import Footer from "./footer";
import { getAuthCookie, getLocalUser, setLocalUser } from "../lib/auth";
import { useAppSelector, useAppDispatch } from "../store";
import {
  setUser,
  setCookie,
  setLoginMode,
  setLikedList,
  selectUser,
  selectRefreshTimestamp,
} from "../store/slice/user.slice";
import { usePlaylistDetail, useUserPlaylist, useUserProfile } from "../hooks";

export interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "JustPlayMusic",
}) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const refreshTimestamp = useAppSelector(selectRefreshTimestamp);

  const { userProfile } = useUserProfile(getAuthCookie());

  const { userPlaylistRes } = useUserPlaylist({
    uid: user?.userId,
  });

  const { playlistInfo } = usePlaylistDetail({
    id: userPlaylistRes?.playlist[0]?.id,
    limit: 16,
    refreshTimestamp,
  });

  useEffect(() => {
    const localUser = getLocalUser();

    if (userProfile) {
      dispatch(setUser(userProfile));
      dispatch(setCookie(getAuthCookie()));
      dispatch(setLoginMode("account"));
      setLocalUser({
        user: userProfile,
        loginMode: "account",
      });
      console.log("account");
    } else if (localUser && !getAuthCookie()) {
      dispatch(setUser(localUser.user));
      dispatch(setLoginMode("search"));
      setLocalUser({ user: localUser.user, loginMode: "search" });
      console.log("search");
    } else {
      console.log("else");
    }
  }, [
    userProfile,
    dispatch,
    setUser,
    setCookie,
    setLoginMode,
    getAuthCookie,
    getLocalUser,
  ]);

  useEffect(() => {
    if (playlistInfo?.trackIds?.length > 0) {
      dispatch(setLikedList(playlistInfo?.trackIds?.map((item) => item.id)));
    }
  }, [playlistInfo]);

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div(() => [
  tw`bg-neutral-light dark:bg-neutral-dark`,
  css`
    font-family: "Ubuntu", system-ui, -apple-system, BlinkMacSystemFont,
      segoe ui, Helvetica, PingFang SC, Microsoft YaHei, sans-serif !important;

    --plyr-color-main: #f75684;
    --plyr-video-background: #fee2e2;
  `,
]);

const Container = styled.div(() => [
  tw`container mx-auto`,
  css`
    padding-top: 86px;
    padding-bottom: 72px;

    /* @media (max-width: 768px) {
      padding-top: 64px;
    } */
  `,
]);
