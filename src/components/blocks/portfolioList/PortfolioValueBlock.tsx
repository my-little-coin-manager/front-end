import React from "react";
import styled from "styled-components";
import { checkedInteger } from "utils/formatNumber";

interface IPortfolioValueBlockProps {
  income: number;
  totalPrice: number;
  nowPrice: number;
  equitiesValue: number;
  averagePrice: number;
  profitRate: number;
  qty: number;
}

const PortfolioValueBlock = ({
  income,
  totalPrice,
  nowPrice,
  equitiesValue,
  averagePrice,
  profitRate,
  qty
}: IPortfolioValueBlockProps) => {
  return (
    <>
      <Profit profit={income}>{checkedInteger(profitRate)}%</Profit>
      <Profit profit={income}>{checkedInteger(income)}</Profit>
      <CoinStock>{checkedInteger(totalPrice)}</CoinStock>
      <CoinStock>{checkedInteger(nowPrice)}</CoinStock>
      <CoinStock>{checkedInteger(equitiesValue)}</CoinStock>
      <CoinStock>{checkedInteger(averagePrice)}</CoinStock>
      <Qty>{qty}</Qty>
    </>
  );
};

export default PortfolioValueBlock;

const CoinStock = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 8);
  color: #333;

  :first-child {
    justify-content: left;
  }
`;

const Profit = styled(CoinStock)<{ profit: number }>`
  color: ${({ profit }) => (profit > 0 ? "#c84a31" : profit < 0 ? "#1261c4" : "#333")};
  font-weight: 700;
`;

const Qty = styled(CoinStock)`
  font-weight: 700;
`;
