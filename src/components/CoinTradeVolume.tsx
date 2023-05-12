import React from "react";
import styled from "styled-components";

interface CoinTradePriceProps {
  price: number;
}

const CoinTradeVolume = ({ price }: CoinTradePriceProps) => {
  return <TradePrice>{Math.round(price / 1000000).toLocaleString("ko-KR")}백만</TradePrice>;
};

const TradePrice = styled.p`
  color: #333;
  width: 25%;
  font-size: 12px;
  text-align: right;
  margin-right: 5%;
`;

export default CoinTradeVolume;
