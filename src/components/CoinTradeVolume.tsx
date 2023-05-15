import React from "react";
import styled from "styled-components";

interface ICoinTradePriceProps {
  tradePrice: number;
  parents?: string;
}

const CoinTradeVolume = ({ tradePrice, parents }: ICoinTradePriceProps) => {
  return (
    <>
      {parents === "datail" ? (
        <TradePrice>{Math.round(tradePrice).toLocaleString("ko-KR")}KRW</TradePrice>
      ) : (
        <TradePrice>{Math.round(tradePrice / 1000000).toLocaleString("ko-KR")}백만</TradePrice>
      )}
    </>
  );
};

const TradePrice = styled.p`
  color: #333;
  width: 25%;
  font-size: 12px;
  text-align: right;
  margin-right: 5%;
`;

export default CoinTradeVolume;
