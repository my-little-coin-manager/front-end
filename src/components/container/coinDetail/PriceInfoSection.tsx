import React from "react";
import PriceBlock from "components/blocks/coinDetail/PriceBlock";
import CompareBlock from "components/blocks/coinDetail/CompareBlock";
import styled from "styled-components";

interface IPriceInfoSectionProps {
  price: number;
  change: string;
  rate: number;
  changePrice: number;
}

const PriceInfoSection = ({ price, change, rate, changePrice }: IPriceInfoSectionProps) => {
  return (
    <PriceInfoSectionContainer>
      <PriceBlock price={price} change={change} />
      <CompareBlock change={change} rate={rate} changePrice={changePrice} />
    </PriceInfoSectionContainer>
  );
};

export default PriceInfoSection;

const PriceInfoSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 16rem;
  padding: 1rem 1rem 1rem 0;
  height: 3.5rem;
`;
