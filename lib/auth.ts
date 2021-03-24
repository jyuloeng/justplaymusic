import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { MD5 } from "crypto-js";
import { useAppSelector } from "../store";
import { selectUser, selectLoginMode } from "../store/slice/user.slice";

export const AUTH_COOKIE_KEY = "MUSIC_U";

export const isLoginByAccount = () => {
  const user = useAppSelector(selectUser);
  const loginMode = useAppSelector(selectLoginMode);

  return Boolean(user && loginMode === "account" && getAuthCookie());
};

export const isLoginBySearch = () => {
  const user = useAppSelector(selectUser);
  const loginMode = useAppSelector(selectLoginMode);

  return Boolean(user && loginMode === "search");
};

export const isLogin = () => {
  return isLoginByAccount() || isLoginBySearch();
};

export const getAuthCookie = () => {
  return Cookies.get(AUTH_COOKIE_KEY);
};

export const setCookies = (cookieString: string) => {
  const cookies = cookieString.split(";;");
  cookies.forEach((cookie) => (document.cookie = cookie));
};

export const getMd5Password = (password: string) => {
  return MD5(password).toString();
};
