import React from "react";
import styled from "styled-components";
import { mathRoundFomatter } from "utils/formatNumber";

interface ITradeVoulumeBlockProps {
  tradePrice: number;
}

const TransactionValueBlock = ({ tradePrice }: ITradeVoulumeBlockProps) => {
  return (
    <TransactionValueBlockContainer>
      <PriceType>거래대금(24H)</PriceType>
      <span>
        <TradeVolumeValue>{mathRoundFomatter(tradePrice)}</TradeVolumeValue>
        <Unit>KRW</Unit>
      </span>
    </TransactionValueBlockContainer>
  );
};

export default TransactionValueBlock;

const TransactionValueBlockContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & span {
    display: flex;
  }
`;

const PriceType = styled.p``;

const TradeVolumeValue = styled.p`
  margin: 0 0.3rem 0 0;
`;

const Unit = styled.p``;
