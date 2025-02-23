export const formatLocalTime = (time: any) => {
  const date = new Date(time);
  return `${date.getDate()}/${
    Number(date.getMonth()) + 1
  }/${date.getFullYear()}`;
};
