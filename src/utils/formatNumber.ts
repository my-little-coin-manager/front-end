type FormatType = (value: number) => string;

const formatBase = new Intl.NumberFormat("ko");

export const compactFormatter: FormatType = (value) => {
  const formatter = Math.round(value / 1000000);
  return `${formatBase.format(formatter)}백만`;
};

export const priceFomatter: FormatType = (value) => {
  return formatBase.format(value);
};
