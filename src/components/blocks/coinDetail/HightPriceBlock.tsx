import React from "react";
import styled from "styled-components";
import { priceFomatter } from "utils/formatNumber";

interface IHightPriceBlockProps {
  hightPrice: number;
}

const HightPriceBlock = ({ hightPrice }: IHightPriceBlockProps) => {
  return (
    <HightPriceBlockContainer>
      <PriceType>고가</PriceType>
      <span>
        <PriceValue>{priceFomatter(hightPrice)}</PriceValue>
        <Unit>KRW</Unit>
      </span>
    </HightPriceBlockContainer>
  );
};

export default HightPriceBlock;

const HightPriceBlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin: 0 0 0.8rem 0; */

  & span {
    display: flex;
  }
`;

const PriceType = styled.p``;

const PriceValue = styled.p`
  margin: 0 0.3rem 0 0;
`;

const Unit = styled.p``;
