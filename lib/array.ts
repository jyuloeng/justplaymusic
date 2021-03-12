export const getRandomArrayElements = (arr: any[], count: number) => {
  const len = arr.length;
  if (len === 0) return arr;

  const arrClone = JSON.parse(JSON.stringify(arr)); //  后面写了深克隆的函数再补回来
  if (count >= len) return arrClone;

  const newArr = [];
  for (let i = 0; i < count; i++) {
    const arrCloneLen = arrClone.length;
    const randomIndex = Math.floor(Math.random() * arrCloneLen);
    newArr.push(arrClone[randomIndex]);
    arrClone.splice(randomIndex, 1);
  }
  return newArr;
};

export const getSpecifiedArrayElements = (arr: any[], count: number) => {
  const len = arr.length;
  if (len === 0) return arr;

  const arrClone = JSON.parse(JSON.stringify(arr)); //  后面写了深克隆的函数再补回来
  if (count >= len) return arrClone;

  return arrClone.splice(0, count);
};
