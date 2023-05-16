import React from "react";
import styled from "styled-components";
import HightPriceBlock from "components/blocks/coinDetail/HightPriceBlock";
import LowPriceBlock from "components/blocks/coinDetail/LowPriceBlock";

interface HightAndLowPriceSectionProps {
  hightPrice: number;
  lowPrice: number;
}

const HightAndLowPriceSection = ({ hightPrice, lowPrice }: HightAndLowPriceSectionProps) => {
  return (
    <HightAndLowPriceSectionContainer>
      <HightPriceBlock hightPrice={hightPrice} />
      <LowPriceBlock lowPrice={lowPrice} />
    </HightAndLowPriceSectionContainer>
  );
};

export default HightAndLowPriceSection;

const HightAndLowPriceSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 14rem;
  border-right: 1px solid #d9d9d9;
  justify-content: space-between;
  height: 3rem;
  color: #333;
  font-size: 0.9rem;
`;
