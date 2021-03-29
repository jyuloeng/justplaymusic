import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import tw, { styled, css } from "twin.macro";
import Header from "./header";
import Footer from "./footer";
import { getAuthCookie, getLocalUser, setLocalUser } from "../lib/auth";
import { useAppSelector, useAppDispatch } from "../store";
import { setUser, setCookie, setLoginMode } from "../store/slice/user.slice";
import { useUserProfile } from "../hooks/user";

export interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "JustPlayMusic",
}) => {
  // useAppSelector()

  const dispatch = useAppDispatch();

  const { userProfile } = useUserProfile(getAuthCookie());

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
  `,
]);

const Container = styled.div(() => [
  tw`container mx-auto`,
  css`
    padding-top: 86px;

    /* @media (max-width: 768px) {
      padding-top: 64px;
    } */
  `,
]);
