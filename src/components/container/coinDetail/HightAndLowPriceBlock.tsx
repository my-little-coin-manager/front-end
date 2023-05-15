import React from "react";
import styled from "styled-components";
import HightPriceBlock from "components/blocks/coinDetail/HightPriceBlock";
import LowPriceBlock from "components/blocks/coinDetail/LowPriceBlock";

interface IHightAndLowPriceBlockProps {
  hightPrice: number;
  lowPrice: number;
}

const HightAndLowPriceBlock = ({ hightPrice, lowPrice }: IHightAndLowPriceBlockProps) => {
  return (
    <HightAndLowPriceBlockContainer>
      <HightPriceBlock hightPrice={hightPrice} />
      <LowPriceBlock lowPrice={lowPrice} />
    </HightAndLowPriceBlockContainer>
  );
};

export default HightAndLowPriceBlock;

const HightAndLowPriceBlockContainer = styled.div`
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
