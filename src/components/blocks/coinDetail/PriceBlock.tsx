import React from "react";
import styled from "styled-components";
import { priceFomatter } from "utils/formatNumber";

interface IPriceBlockProps {
  price: number;
  change: string;
}

const PriceBlock = ({ price, change }: IPriceBlockProps) => {
  return (
    <Container change={change}>
      <Price>{priceFomatter(price)}</Price>
      <Unit>KRW</Unit>
    </Container>
  );
};

export default PriceBlock;

const Container = styled.div<{ change: string }>`
  display: flex;
  align-items: flex-end;
  color: ${({ change }) => (change === "RISE" ? "red" : change === "FALL" ? "blue" : "black")};
`;

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0.5rem 0 0;
`;

const Unit = styled.p`
  margin: 0 0 0.1rem 0;
`;
