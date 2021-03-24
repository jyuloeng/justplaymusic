import Router from "next/router";

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

export const setLanguage = async (locale) => {
  return await Router.push(Router.pathname, Router.asPath, {
    locale,
  });
};

export const clearSpace = (str: string) => {
  return str.replace(/\s/g, "");
};
