import React from "react";
import styled from "styled-components";

interface AccTradePriceProps {
  price: number;
}

const AccTradePrice = ({ price }: AccTradePriceProps) => {
  return <TradePrice>{Math.round(price / 1000000).toLocaleString("ko-KR")}백만</TradePrice>;
};

const TradePrice = styled.td`
  color: #333;
  width: 25%;
  font-size: 12px;
  text-align: right;
`;

export default AccTradePrice;
