import React from "react";
import styled from "styled-components";
import { priceFomatter } from "utils/formatNumber";
import { checkedChange } from "utils/coloredPrice";

interface ICompareProps {
  change: string;
  rate: number;
  changePrice: number;
}

const CompareBlock = ({ change, rate, changePrice }: ICompareProps) => {
  return (
    <CompareContainer change={change}>
      <p>{checkedChange(change, rate).toFixed(2)}%</p>
      <p>{priceFomatter(changePrice)}</p>
    </CompareContainer>
  );
};

export default CompareBlock;

const CompareContainer = styled.span<{ change: string }>`
  width: 25%;
  text-align: right;
  font-size: 12px;

  & p {
    color: ${({ change }) => (change === "RISE" ? "#c84a31" : change === "FALL" ? "#1261c4" : "#333")};
    margin: 0;
  }
`;
