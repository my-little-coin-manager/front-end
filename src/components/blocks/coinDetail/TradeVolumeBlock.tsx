import React from "react";
import styled from "styled-components";
import { mathRoundFomatter } from "utils/formatNumber";

interface ITradeVolumeBlockProps {
  tradeVolume: number;
  unit: string;
}

const TradeVolumeBlock = ({ tradeVolume, unit }: ITradeVolumeBlockProps) => {
  return (
    <TradeVolumeBlockContainer>
      <PriceType>거래량(24H)</PriceType>
      <span>
        <TradeVolumeValue>{mathRoundFomatter(tradeVolume)}</TradeVolumeValue>
        <Unit>{unit}</Unit>
      </span>
    </TradeVolumeBlockContainer>
  );
};

export default TradeVolumeBlock;

const TradeVolumeBlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin: 0 0 0.8rem 0; */

  & span {
    display: flex;
  }
`;

const PriceType = styled.p``;

const TradeVolumeValue = styled.p`
  margin: 0 0.3rem 0 0;
`;

const Unit = styled.p``;
