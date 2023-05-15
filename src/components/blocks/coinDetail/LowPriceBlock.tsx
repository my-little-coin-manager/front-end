import React from "react";
import styled from "styled-components";
import { priceFomatter } from "utils/formatNumber";

interface ILowPriceBlockProps {
  lowPrice: number;
}

const LowPriceBlock = ({ lowPrice }: ILowPriceBlockProps) => {
  return (
    <LowPriceBlockContainer>
      <PriceType>저가</PriceType>
      <span>
        <PriceValue>{priceFomatter(lowPrice)}</PriceValue>
        <Unit>KRW</Unit>
      </span>
    </LowPriceBlockContainer>
  );
};

export default LowPriceBlock;

const LowPriceBlockContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & span {
    display: flex;
  }
`;

const PriceType = styled.p``;

const PriceValue = styled.p`
  margin: 0 0.3rem 0 0;
`;

const Unit = styled.p``;
