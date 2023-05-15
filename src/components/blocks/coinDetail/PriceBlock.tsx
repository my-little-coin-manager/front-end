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
      <p>KRW</p>
    </Container>
  );
};

export default PriceBlock;

const Container = styled.div<{ change: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem 0;
  color: ${({ change }) => (change === "RISE" ? "red" : change === "FALL" ? "blue" : "black")};
`;

const Price = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;
