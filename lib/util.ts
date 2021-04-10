import Router from "next/router";
import { isLoginByAccount, getLocalUser } from "./auth";

export const generateLowerChar = () => {
  const arr = [];
  for (let i = 97; i < 123; i++) {
    arr.push({
      key: String.fromCharCode(i),
      name: String.fromCharCode(i).toUpperCase(),
    });
  }
  return arr;
};

export const setLanguageByUtil = async (locale) => {
  return await Router.push(Router.pathname, Router.asPath, {
    locale,
  });
};

export const clearSpace = (str: string) => {
  return str.replace(/\s/g, "");
};

export const isTrackPlayable = (track) => {
  let result = {
    playable: true,
    reason: "",
  };

  if (isLoginByAccount() && track?.privilege?.cs) {
    return result;
  }

  if (track.fee === 1 || track.privilege?.fee === 1) {
    if (isLoginByAccount() && getLocalUser().user.vipType === 11) {
      result.playable = true;
    } else {
      result.playable = false;
      result.reason = "会员专属";
    }
  } else if (track.fee === 4 || track.privilege?.fee === 4) {
    result.playable = false;
    result.reason = "付费专辑";
  } else if (
    track.noCopyrightRcmd !== null &&
    track.noCopyrightRcmd !== undefined
  ) {
    result.playable = false;
    result.reason = "无版权";
  } else if (isLoginByAccount() && track.privilege?.st < 0) {
    result.playable = false;
    result.reason = "已下架";
  }

  return result;
};
