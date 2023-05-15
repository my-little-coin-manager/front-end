import React from "react";
import TransactionValueBlock from "components/blocks/coinDetail/TransactionValueBlock";
import TradeVolumeBlock from "components/blocks/coinDetail/TradeVolumeBlock";
import styled from "styled-components";

interface ITransactionAndVolumeSectionProps {
  tradeVolume: number;
  tradePrice: number;
  unit: string;
}

const TransactionAndVolumeSection = ({ tradeVolume, tradePrice, unit }: ITransactionAndVolumeSectionProps) => {
  return (
    <TransactionAndVolumeSectionContainer>
      <TradeVolumeBlock tradeVolume={tradeVolume} unit={unit} />
      <TransactionValueBlock tradePrice={tradePrice} />
    </TransactionAndVolumeSectionContainer>
  );
};

export default TransactionAndVolumeSection;

const TransactionAndVolumeSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 17rem;
  padding: 1rem 0 1rem 1rem;
  height: 3rem;
  color: #333;
  font-size: 0.9rem;
`;
