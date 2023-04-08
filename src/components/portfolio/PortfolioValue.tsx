import React from "react";
import styled from "styled-components";

interface IProps {
  income: number;
  totalPrice: number;
  nowPrice: number;
  equitiesValue: number;
  averagePrice: number;
}

const PortfolioValue = ({ income, totalPrice, nowPrice, equitiesValue, averagePrice }: IProps) => {
  return (
    <>
      {Number.isInteger(averagePrice) ? (
        <>
          <Profit profit={income}>{income?.toLocaleString("ko-KR")}</Profit>
          <CoinStock>{totalPrice?.toLocaleString("ko-KR")}</CoinStock>
          <CoinStock>{nowPrice?.toLocaleString("ko-KR")}</CoinStock>
          <CoinStock>{equitiesValue?.toLocaleString("ko-KR")}</CoinStock>
          <CoinStock>{averagePrice?.toLocaleString("ko-KR")}</CoinStock>
        </>
      ) : (
        <>
          <Profit profit={income}>{income?.toFixed(3)}</Profit>
          <CoinStock>{totalPrice?.toFixed(3)}</CoinStock>
          <CoinStock>{nowPrice?.toFixed(3)}</CoinStock>
          <CoinStock>{equitiesValue?.toFixed(3)}</CoinStock>
          <CoinStock>{averagePrice?.toFixed(3)}</CoinStock>
        </>
      )}
    </>
  );
};

export default PortfolioValue;

const CoinStock = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 8);
  color: #333;

  :first-child {
    justify-content: left;
  }

  & img {
    width: 25px;
    height: 25px;
    margin: 0 0.5rem;
  }
`;

const Profit = styled(CoinStock)<{ profit: number }>`
  color: ${({ profit }) => (profit > 0 ? "#c84a31" : profit < 0 ? "#1261c4" : "#333")};
  font-weight: 700;
`;
