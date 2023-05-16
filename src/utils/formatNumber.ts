type FormatType = (value: number) => string;
type rateFormatter = (change: string, rate: number) => string | number;

const formatBase = new Intl.NumberFormat("ko");
const IntegerformatBase = new Intl.NumberFormat("ko", { maximumFractionDigits: 3 });

export const compactFormatter: FormatType = (value) => {
  const formatter = Math.round(value / 1000000);
  return `${formatBase.format(formatter)}백만`;
};

export const priceFomatter: FormatType = (value) => {
  return formatBase.format(value);
};

export const mathRoundFomatter = (value: number) => {
  return formatBase.format(Math.round(value));
};

export const rateFomater: rateFormatter = (change, rate) => {
  if (change === "RISE") {
    return `+${IntegerformatBase.format(rate * 100)}`;
  }
  return IntegerformatBase.format(rate * 100);
};

export const compareFomatter = (value: number, change: string) => {
  if (change === "RISE") {
    return `▲ ${formatBase.format(value)}`;
  } else if (change === "FALL") {
    return `▼ ${formatBase.format(value)}`;
  }
  return formatBase.format(value);
};

export const checkedInteger = (value: number) => {
  if (Number.isInteger(value)) {
    return formatBase.format(value);
  }

  return IntegerformatBase.format(value);
};
