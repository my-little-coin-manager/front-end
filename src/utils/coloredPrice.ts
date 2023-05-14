type CheckedChange = (change: string, rate: number) => number;

export const checkedChange: CheckedChange = (change, rate) => {
  if (change === "RISE") {
    return +(rate * 100);
  }
  return rate * 100;
};
