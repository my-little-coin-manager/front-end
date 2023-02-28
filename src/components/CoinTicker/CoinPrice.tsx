import React, { useMemo } from "react";
import styled from "styled-components";

const CoinPrice = ({ price, change }: any) => {
  const tradePrice = useMemo(() => {
    console.log("코인가격");
    return price;
  }, [price]);

  const tickerChange = useMemo(() => {
    return change;
  }, [change]);

  return <TickerPrice change={tickerChange}>{tradePrice.toLocaleString("ko-KR")}</TickerPrice>;
};

export default CoinPrice;

const TickerPrice = styled.td<{ change: string }>`
  width: 25%;
  font-size: 12px;
  color: ${({ change }) => (change === "RISE" ? "#c84a31" : change === "FALL" ? "#1261c4" : "#333")};
  text-align: right;
  font-weight: 700;
`;
