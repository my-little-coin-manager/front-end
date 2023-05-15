import React from "react";
import styled from "styled-components";

interface PriceProps {
  price: number;
  change: string;
  parents?: string;
}

const CoinPrice = ({ price, change, parents }: PriceProps) => {
  return (
    <>
      {parents === "detail" ? (
        <DetailPrice change={change}>{price?.toLocaleString("ko-KR")}</DetailPrice>
      ) : (
        <TickerPrice change={change}>{price?.toLocaleString("ko-KR")}</TickerPrice>
      )}
    </>
  );
};

export default CoinPrice;

const TickerPrice = styled.p<{ change: string }>`
  width: 25%;
  font-size: 12px;
  text-align: right;
  color: ${({ change }) => (change === "RISE" ? "#c84a31" : change === "FALL" ? "#1261c4" : "#333")};
  font-weight: 700;
`;

const DetailPrice = styled.p<{ change: string }>`
  width: 13rem;
  font-size: 2rem;
  color: ${({ change }) => (change === "RISE" ? "red" : change === "FALL" ? "blue" : "black")};
  font-weight: 700;
  justify-content: space-between;
`;
