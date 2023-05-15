type FormatType = (value: number) => string;
type rateFormatter = (change: string, rate: number) => string | number;

const formatBase = new Intl.NumberFormat("ko");

export const compactFormatter: FormatType = (value) => {
  const formatter = Math.round(value / 1000000);
  return `${formatBase.format(formatter)}백만`;
};

export const priceFomatter: FormatType = (value) => {
  return formatBase.format(value);
};

export const rateFommater: rateFormatter = (change, rate) => {
  if (change === "RISE") {
    return `+${(rate * 100).toFixed(2)}`;
  }
  return (rate * 100).toFixed(2);
};
