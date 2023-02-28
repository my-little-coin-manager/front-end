import React, { useMemo } from "react";
import styled from "styled-components";

const AccTradePrice = ({ price }: any) => {
  const priceTrade = useMemo(() => {
    return Math.round(price / 1000000).toLocaleString("ko-KR");
  }, [price]);

  return <TradePrice>{priceTrade}백만</TradePrice>;
};

const TradePrice = styled.td`
  color: #333;
  width: 25%;
  font-size: 12px;
  text-align: right;
`;

export default AccTradePrice;
