import React from "react";
import styled from "styled-components";
import { priceFomatter } from "utils";

interface IPriceProps {
  price: number;
  change: string;
}

const PriceBlock = ({ price, change }: IPriceProps) => {
  return <Price change={change}>{priceFomatter(price)}</Price>;
};

export default PriceBlock;

const Price = styled.p<{ change: string }>`
  width: 25%;
  font-size: 12px;
  text-align: right;
  color: ${({ change }) => (change === "RISE" ? "#c84a31" : change === "FALL" ? "#1261c4" : "#333")};
  font-weight: 700;
`;
