import React from "react";
import styled from "styled-components";
import { compactFormatter } from "utils";

interface ITradeVoulumeProps {
  tradePrice: number;
}

const TradeVolumeBlock = ({ tradePrice }: ITradeVoulumeProps) => {
  return <TreadeVolume>{compactFormatter(tradePrice)}</TreadeVolume>;
};

export default TradeVolumeBlock;

const TreadeVolume = styled.p`
  color: #333;
  width: 25%;
  font-size: 12px;
  text-align: right;
  margin-right: 5%;
`;
