export const formatDuration = (duration: number) => {
  if (duration < 0) duration = -duration;

  let tempMinute = Math.floor(duration / 60000) % 60;
  let tempSecond = Math.floor(duration / 1000) % 60;

  let hour = Math.floor(duration / 3600000) % 24;
  let minute = tempMinute > 9 ? tempMinute : "0" + tempMinute;
  let second = tempSecond > 9 ? tempSecond : "0" + tempSecond;

  let str = `${minute}: ${second}`;
  hour > 0 && (str += `${hour}: `);
  return str;
};

export const formatDate = (timestamp: number) => {
  if (timestamp < 0) timestamp = -timestamp;
  const d = new Date(timestamp);
  let date =
    d.getDate().toString().length < 2 ? "0" + d.getDate() : d.getDate();
  let month =
    (d.getMonth() + 1).toString().length < 2
      ? "0" + (d.getMonth() + 1)
      : d.getMonth() + 1;
  let year = d.getFullYear();

  return `${year}/${month}/${date}`;
};

export const formatAudioCurrentTime = (currentTime: number) => {
  if (currentTime < 0) currentTime = -currentTime;

  let tempMinute = Math.floor(currentTime / 60);
  let tempSecond = Math.floor(currentTime) % 60;

  let hour = Math.floor(currentTime / 60 / 60);
  let minute = tempMinute > 9 ? tempMinute : "0" + tempMinute;
  let second = tempSecond > 9 ? tempSecond : "0" + tempSecond;

  let str = `${minute}: ${second}`;
  hour > 0 && (str += `${hour}: `);
  return str;
};
