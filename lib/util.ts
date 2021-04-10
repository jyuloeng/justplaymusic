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

// copy from https://github.com/sl1673495/vue-netease-music/blob/master/src/utils/lrcparse.js

export const lyricParser = (data) => {
  return {
    lyric: parseLyric(data?.lrc?.lyric || ""),
    tlyric: parseLyric(data?.tlyric?.lyric || ""),
  };
};

export const parseLyric = (lrc) => {
  const lyrics = lrc.split("\n");
  const lrcObj = [];
  for (let i = 0; i < lyrics.length; i++) {
    const lyric = decodeURIComponent(lyrics[i]);
    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
    const timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    const content = lyric.replace(timeReg, "");
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      const t = timeRegExpArr[k];
      const min = Number(String(t.match(/\[\d*/i)).slice(1));
      const sec = Number(String(t.match(/:\d*/i)).slice(1));
      const ms = Number(t.match(/\d*\]/i)[0].slice(0, 2)) / 100;
      const time = min * 60 + sec + ms;
      if (content !== "") {
        lrcObj.push({ time: time, rawTime: timeRegExpArr[0], content });
      }
    }
  }
  return lrcObj;
};

export const lyricWithTranslation = ({ lyric, tlyric }) => {
  let ret = [];
  // 空内容的去除
  const lyricFiltered = lyric.filter(({ content }) => Boolean(content));
  // content统一转换数组形式
  if (lyricFiltered.length) {
    lyricFiltered.forEach((l) => {
      const { rawTime, time, content } = l;
      const lyricItem = { time, content, contents: [content] };
      const sameTimeTLyric = tlyric.find(
        ({ rawTime: tLyricRawTime }) => tLyricRawTime === rawTime
      );
      if (sameTimeTLyric) {
        const { content: tLyricContent } = sameTimeTLyric;
        if (content) {
          lyricItem.contents.push(tLyricContent);
        }
      }
      ret.push(lyricItem);
    });
  } else {
    ret = lyricFiltered.map(({ time, content }) => ({
      time,
      content,
      contents: [content],
    }));
  }
  return ret;
};
