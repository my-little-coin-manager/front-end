import React from "react";
import styled from "styled-components";
import { compactFormatter } from "utils/formatNumber";

interface ITradeVoulumeProps {
  tradePrice: number;
}

const TransactionValueBlock = ({ tradePrice }: ITradeVoulumeProps) => {
  return <TransactionValueBlockContainer>{compactFormatter(tradePrice)}</TransactionValueBlockContainer>;
};

export default TransactionValueBlock;

const TransactionValueBlockContainer = styled.p`
  color: #333;
  width: 25%;
  font-size: 12px;
  text-align: right;
  margin-right: 5%;
`;
