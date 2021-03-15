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
