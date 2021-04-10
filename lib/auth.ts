import Cookies from "js-cookie";
import { MD5 } from "crypto-js";

export const AUTH_COOKIE_KEY = "MUSIC_U";

export const isLoginByAccount = () => {
  const localUser = getLocalUser();

  return Boolean(
    localUser?.user && localUser?.loginMode === "account" && getAuthCookie()
  );
};

export const isLoginBySearch = () => {
  const localUser = getLocalUser();

  return Boolean(localUser?.user && localUser?.loginMode === "search");
};

export const isLogin = () => {
  return isLoginByAccount() || isLoginBySearch();
};

export const getAuthCookie = () => {
  return Cookies.get(AUTH_COOKIE_KEY) || "";
};

export const setCookies = (cookieString: string) => {
  const cookies = cookieString.split(";;");
  cookies.forEach((cookie) => (document.cookie = cookie));
};

export const getMd5Password = (password: string) => {
  return MD5(password).toString();
};

const localUserKey = "_u";
export const getLocalUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem(localUserKey));
  } catch (error) {
    return null;
  }
};

export const setLocalUser = (obj: object) => {
  window.localStorage.setItem(localUserKey, JSON.stringify(obj));
};

export const removeLocalUser = () => {
  window.localStorage.removeItem(localUserKey);
};
