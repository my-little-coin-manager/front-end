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

export const rateFomater: rateFormatter = (change, rate) => {
  if (change === "RISE") {
    return `+${(rate * 100).toFixed(2)}`;
  }
  return (rate * 100).toFixed(2);
};

export const mathRoundFomatter = (value: number) => {
  return formatBase.format(Math.round(value));
};

export const compareFomatter = (value: number, change: string) => {
  if (change === "RISE") {
    return `▲ ${formatBase.format(value)}`;
  } else if (change === "FALL") {
    return `▼ ${formatBase.format(value)}`;
  }
  return formatBase.format(value);
};
