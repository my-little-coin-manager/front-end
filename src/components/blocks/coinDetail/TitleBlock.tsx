import React from "react";
import styled from "styled-components";
import { Market } from "types/types";

interface IDetailMarketTilteProps {
  select: string;
  focus: Market;
}

const TitleBlock = ({ select, focus }: IDetailMarketTilteProps) => {
  return (
    <Container>
      <MarketSymbol src={`https://static.upbit.com/logos/${select.split("-")[1]}.png`} />
      <span>
        <MarketName>{focus?.korean_name}</MarketName>
        <MarketCode>{focus?.market.split("-")[1]}</MarketCode>
      </span>
    </Container>
  );
};

export default React.memo(TitleBlock);

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  color: #333;

  & span {
    display: flex;
    align-items: flex-end;
  }
`;

const MarketSymbol = styled.img`
  max-width: 2.1rem;
  max-height: 2.1rem;
  margin: 0 0.5rem 0 0;
`;

const MarketName = styled.h2`
  font-size: 2.1rem;
  font-weight: 700;
  margin: 0 0.5rem 0 0;
`;

const MarketCode = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
`;
